export type PropertyStatus = "Completed" | "Under construction" | "Off-plan";
export type RiskRating = "Low" | "Medium" | "Medium-high";
export type VerifiedProjectLevel = "Verified" | "Enhanced due diligence" | "Pre-check";
export type City = "Ho Chi Minh City" | "Hanoi";
export type ForeignOwnershipStatus = "Eligible" | "Limited quota" | "Advisor review";
export type InvestmentRating = "Very high" | "High" | "Moderate" | "Selective";

export type InvestmentScore = {
  total: number;
  label: "Core" | "Strong" | "Selective" | "Speculative";
  factors: {
    rentalYield: number;
    rentalDemand: number;
    liquidity: number;
    developerQuality: number;
    foreignOwnership: number;
    completionStatus: number;
    riskRating: number;
  };
};

export type VerifiedProjectChecks = {
  foreignQuotaChecked: boolean;
  developerReviewed: boolean;
  legalReviewed: boolean;
  rentalDemandReviewed: boolean;
  riskLevelReviewed: boolean;
};

export type Property = {
  id: string;
  title: string;
  image: string;
  city: City;
  district: string;
  type: string;
  price: string;
  priceUsd: number;
  listedAt: string;
  estimatedYield: string;
  investmentScore: InvestmentScore;
  rentalDemand: InvestmentRating;
  liquidity: InvestmentRating;
  developerQuality: InvestmentRating;
  riskRating: RiskRating;
  bestFor: string;
  targetBuyerTypes: string[];
  keyRisks: string[];
  whyInvest: string[];
  foreignOwnership: ForeignOwnershipStatus;
  completionStatus: PropertyStatus;
  verifiedProject: {
    level: VerifiedProjectLevel;
    summary: string;
    checks: VerifiedProjectChecks;
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
