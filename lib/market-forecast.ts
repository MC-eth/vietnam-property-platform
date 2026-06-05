export type HistoricalMarketPoint = {
  year: number;
  pricePerSqmUsd: number;
};

export type MarketForecastPoint = {
  year: number;
  projectedPricePerSqmUsd: number;
};

export function generateLinearRegressionForecast(
  data: HistoricalMarketPoint[],
  yearsToForecast: number,
): MarketForecastPoint[] {
  if (data.length < 2 || yearsToForecast <= 0) {
    return [];
  }

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
  const intercept = averagePrice - slope * averageYear;
  const latestYear = Math.max(...data.map((point) => point.year));

  return Array.from({ length: yearsToForecast }, (_, index) => {
    const year = latestYear + index + 1;

    return {
      year,
      projectedPricePerSqmUsd: Math.round(slope * year + intercept),
    };
  });
}
