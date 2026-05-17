export type PropertyStatus = "Completed" | "Under construction" | "Off-plan";
export type RiskRating = "Low" | "Medium" | "Medium-high";
export type VerifiedProjectLevel = "Verified" | "Enhanced due diligence" | "Pre-check";

export type Property = {
  id: string;
  title: string;
  city: "Ho Chi Minh City" | "Hanoi";
  district: string;
  type: string;
  price: string;
  priceUsd: number;
  estimatedYield: string;
  riskRating: RiskRating;
  bestFor: string;
  foreignOwnership: "Eligible" | "Limited quota" | "Advisor review";
  completionStatus: PropertyStatus;
  verifiedProject: {
    level: VerifiedProjectLevel;
    summary: string;
  };
  roiDefaults: {
    rentMonthlyUsd: number;
    serviceChargeMonthlyUsd: number;
    furnishingUsd: number;
  };
  paymentPlan: string[];
  estimatedRentalIncome: string;
  locationDetails: string;
  developer: {
    name: string;
    profile: string;
  };
  overview: string;
  investmentHighlights: string[];
  foreignBuyerNotes: string[];
};
