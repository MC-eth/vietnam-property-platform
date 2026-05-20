import type {
  ForeignOwnershipStatus,
  InvestmentRating,
  InvestmentScore,
  Property,
  PropertyStatus,
  RiskRating,
} from "@/types/property";

type ScoreInput = Pick<
  Property,
  | "estimatedYield"
  | "rentalDemand"
  | "liquidity"
  | "developerQuality"
  | "foreignOwnership"
  | "completionStatus"
  | "riskRating"
>;

const RATING_SCORE: Record<InvestmentRating, number> = {
  "Very high": 10,
  High: 8.5,
  Moderate: 6.8,
  Selective: 5.5,
};

const FOREIGN_OWNERSHIP_SCORE: Record<ForeignOwnershipStatus, number> = {
  Eligible: 10,
  "Limited quota": 7,
  "Advisor review": 5,
};

const COMPLETION_SCORE: Record<PropertyStatus, number> = {
  Completed: 10,
  "Under construction": 7,
  "Off-plan": 5,
};

const RISK_SCORE: Record<RiskRating, number> = {
  Low: 10,
  Medium: 7,
  "Medium-high": 5,
};

const FACTOR_WEIGHTS = {
  rentalYield: 0.18,
  rentalDemand: 0.18,
  liquidity: 0.16,
  developerQuality: 0.14,
  foreignOwnership: 0.12,
  completionStatus: 0.12,
  riskRating: 0.1,
};

export function calculateInvestmentScore(property: ScoreInput): InvestmentScore {
  const factors = {
    rentalYield: scoreRentalYield(property.estimatedYield),
    rentalDemand: RATING_SCORE[property.rentalDemand],
    liquidity: RATING_SCORE[property.liquidity],
    developerQuality: RATING_SCORE[property.developerQuality],
    foreignOwnership: FOREIGN_OWNERSHIP_SCORE[property.foreignOwnership],
    completionStatus: COMPLETION_SCORE[property.completionStatus],
    riskRating: RISK_SCORE[property.riskRating],
  };

  const total = roundToOneDecimal(
    factors.rentalYield * FACTOR_WEIGHTS.rentalYield +
      factors.rentalDemand * FACTOR_WEIGHTS.rentalDemand +
      factors.liquidity * FACTOR_WEIGHTS.liquidity +
      factors.developerQuality * FACTOR_WEIGHTS.developerQuality +
      factors.foreignOwnership * FACTOR_WEIGHTS.foreignOwnership +
      factors.completionStatus * FACTOR_WEIGHTS.completionStatus +
      factors.riskRating * FACTOR_WEIGHTS.riskRating,
  );

  return {
    total,
    label: getInvestmentScoreLabel(total),
    factors,
  };
}

export function withInvestmentScore<T extends ScoreInput>(
  property: T,
): T & { investmentScore: InvestmentScore } {
  return {
    ...property,
    investmentScore: calculateInvestmentScore(property),
  };
}

function scoreRentalYield(estimatedYield: string) {
  const yields = estimatedYield
    .match(/\d+(\.\d+)?/g)
    ?.map(Number)
    .filter((value) => Number.isFinite(value));

  const averageYield =
    yields && yields.length > 0
      ? yields.reduce((sum, value) => sum + value, 0) / yields.length
      : 0;

  if (averageYield >= 5.6) return 10;
  if (averageYield >= 5.2) return 9;
  if (averageYield >= 4.8) return 8;
  if (averageYield >= 4.4) return 7;
  return 6;
}

function getInvestmentScoreLabel(total: number): InvestmentScore["label"] {
  if (total >= 8.8) return "Core";
  if (total >= 7.6) return "Strong";
  if (total >= 6.4) return "Selective";
  return "Speculative";
}

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

