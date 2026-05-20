import type { InvestmentRating, PropertyStatus, RiskRating } from "@/types/property";

export const RISK_RATINGS: RiskRating[] = ["Low", "Medium", "Medium-high"];

export const INVESTMENT_RATINGS: InvestmentRating[] = [
  "Very high",
  "High",
  "Moderate",
  "Selective",
];

export const PROPERTY_STATUSES: PropertyStatus[] = [
  "Completed",
  "Under construction",
  "Off-plan",
];

export const FOREIGN_OWNERSHIP_STATUSES = [
  "Eligible",
  "Limited quota",
  "Advisor review",
] as const;

export const VERIFIED_PROJECT_LEVELS = [
  "Verified",
  "Enhanced due diligence",
  "Pre-check",
] as const;

export const MIN_INVESTMENT_SCORE_OPTIONS = [6, 7, 8, 9] as const;

export const PROPERTY_SORT_OPTIONS = [
  { label: "Highest investment score", value: "score-desc" },
  { label: "Highest yield", value: "yield-desc" },
  { label: "Lowest price", value: "price-asc" },
  { label: "Lowest risk", value: "risk-asc" },
  { label: "Best liquidity", value: "liquidity-desc" },
  { label: "Newest", value: "newest" },
] as const;
