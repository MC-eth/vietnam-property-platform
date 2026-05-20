import type { InvestmentRating, RiskRating } from "@/types/property";

export function getAverageYield(estimatedYield: string) {
  const yields = estimatedYield
    .match(/\d+(\.\d+)?/g)
    ?.map(Number)
    .filter((value) => Number.isFinite(value));

  if (!yields || yields.length === 0) return 0;

  return yields.reduce((sum, value) => sum + value, 0) / yields.length;
}

export function getRiskRank(riskRating: RiskRating) {
  const ranks: Record<RiskRating, number> = {
    Low: 1,
    Medium: 2,
    "Medium-high": 3,
  };

  return ranks[riskRating];
}

export function getLiquidityRank(liquidity: InvestmentRating) {
  const ranks: Record<InvestmentRating, number> = {
    "Very high": 4,
    High: 3,
    Moderate: 2,
    Selective: 1,
  };

  return ranks[liquidity];
}

