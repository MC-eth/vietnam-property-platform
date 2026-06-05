import type { InvestmentRating, PropertyStatus, RiskRating } from "@/types/property";

export const RISK_RATINGS: RiskRating[] = ["Low", "Medium", "Medium-high"];

export const INVESTMENT_RATINGS: InvestmentRating[] = [
  "Very high",
  "High",
  "Moderate",
  "Selective",
];

export const PROPERTY_STATUSES: PropertyStatus[] = [
  "New Builds",
  "Pre-Owned",
  "In Construction",
  "Planning",
];

export const FOREIGN_OWNERSHIP_STATUSES = [
  "Foreigner-eligible",
  "Quota review needed",
  "Advisor confirmation needed",
] as const;

export const VERIFIED_PROJECT_LEVELS = [
  "Verified",
  "Enhanced due diligence",
  "Pre-check",
] as const;

export const PROPERTY_SORT_OPTIONS = [
  { label: "Newest listed", value: "newest-listed" },
  { label: "Oldest listed", value: "oldest-listed" },
  { label: "Lowest price", value: "price-asc" },
  { label: "Highest price", value: "price-desc" },
] as const;
