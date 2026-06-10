import type { MarketForecastAssumptions } from "@/data/market-assumptions";

export type HistoricalMarketPoint = {
  year: number;
  pricePerSqmUsd: number;
};

export type MarketForecastPoint = {
  year: number;
  projectedPricePerSqmUsd: number;
};

function linearRegression(data: HistoricalMarketPoint[]) {
  const averageYear = data.reduce((sum, point) => sum + point.year, 0) / data.length;
  const averagePrice =
    data.reduce((sum, point) => sum + point.pricePerSqmUsd, 0) / data.length;
  const yearVariance = data.reduce(
    (sum, point) => sum + (point.year - averageYear) ** 2,
    0,
  );
  const covariance = data.reduce(
    (sum, point) =>
      sum + (point.year - averageYear) * (point.pricePerSqmUsd - averagePrice),
    0,
  );
  const slope = yearVariance === 0 ? 0 : covariance / yearVariance;

  return { averagePrice, slope };
}

/**
 * Indicative five-year forecast (USD base) blending the historical price trend with an
 * assumed inflation rate. Returns nominal USD price-per-sqm per future year.
 *
 * The historical regression slope gives a trend-implied annual growth; this is blended
 * with the assumed inflation rate and compounded year-over-year from the latest historical
 * price. Currency (FX) adjustment is intentionally applied at the display layer, not here,
 * so the USD series stays internally consistent.
 *
 * This is a scenario, not a guarantee. See data/market-assumptions.ts.
 */
export function generateMarketForecast(
  data: HistoricalMarketPoint[],
  yearsToForecast: number,
  assumptions: MarketForecastAssumptions,
): MarketForecastPoint[] {
  if (data.length < 2 || yearsToForecast <= 0) {
    return [];
  }

  const { averagePrice, slope } = linearRegression(data);
  const latestYear = Math.max(...data.map((point) => point.year));
  const latestPrice =
    data.find((point) => point.year === latestYear)?.pricePerSqmUsd ?? averagePrice;

  // Trend-implied annual growth as a fraction of the latest price, blended with the
  // assumed inflation rate to derive a single nominal annual growth rate.
  const trendImpliedGrowth = latestPrice === 0 ? 0 : slope / latestPrice;
  const blendedAnnualGrowth = (trendImpliedGrowth + assumptions.assumedAnnualInflationRate) / 2;

  return Array.from({ length: yearsToForecast }, (_, index) => {
    const yearOffset = index + 1;

    return {
      year: latestYear + yearOffset,
      projectedPricePerSqmUsd: Math.round(
        latestPrice * (1 + blendedAnnualGrowth) ** yearOffset,
      ),
    };
  });
}
