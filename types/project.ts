import type {
  City,
  ForeignOwnershipStatus,
  InvestmentRating,
  PropertyStatus,
  RiskRating,
  VerifiedProjectChecks,
  VerifiedProjectLevel,
} from "@/types/property";

export type ProjectUnit = {
  id: string;
  slug?: string;
  unitName?: string;
  unitType: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  priceUsd: number;
  estimatedMonthlyRentUsd: number;
  estimatedGrossYield: string;
  estimatedNetYield?: string;
  pricePerSqmUsd?: number;
  indicativeGrowth?: string;
  timeToCbdMinutes?: number;
  unitImage: string;
  unitImages?: string[];
  heroImage?: string;
  floorPlanImage?: string;
  floorPlan3DImage?: string;
  vrTourUrl?: string;
  shortDescription?: string;
  viewType?: string;
  orientation?: string;
  floorLevel?: string;
  unitHighlights?: string[];
  includedFeatures?: string[];
  floorRange: string;
  furnishingStatus: string;
  furnishingPackage?: string;
  availabilityStatus: string;
  paymentPlan: string;
  bestFor: string;
  notes: string;
  rentalStrategy?: string;
  foreignBuyerNote?: string;
  paymentNote?: string;
};

export type DueDiligenceStatus =
  | "Reviewed"
  | "Advisor Review"
  | "Pending Review"
  | "Indicative"
  | "Not Verified";

export type ProjectDueDiligenceItem = {
  label: string;
  status: DueDiligenceStatus;
};

export type ProjectInvestmentCaseItem = {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon?: string;
};

export type ProjectRiskConsideration = {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon?: string;
};

export type Project = {
  id: string;
  slug: string;
  projectName: string;
  city: City;
  district: string;
  developer: string;
  projectType: string;
  listedAt: string;
  completionStatus: PropertyStatus;
  completionYear: string;
  yearBuilt: string;
  description: string;
  investmentThesis: string;
  developerProfile: string;
  locationHighlights: string[];
  targetBuyerTypes: string[];
  foreignOwnershipStatus: ForeignOwnershipStatus;
  foreignQuotaNote: string;
  ownershipNote?: string;
  targetBuyerProfile?: string;
  rentalStrategy?: string;
  exitLiquidityNote?: string;
  averageYieldRange: string;
  pricePerSqmUsd?: number;
  indicativeGrowth?: string;
  timeToCbdMinutes?: number;
  availableUnitsCount?: number;
  investmentScore: number;
  riskRating: RiskRating;
  liquidity: InvestmentRating;
  rentalDemand: InvestmentRating;
  verifiedStatus: VerifiedProjectLevel;
  verifiedSummary: string;
  verifiedChecks: VerifiedProjectChecks;
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyLandmarks?: string[];
  dueDiligenceItems?: ProjectDueDiligenceItem[];
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  keyRisks: string[];
  investmentCase: ProjectInvestmentCaseItem[];
  riskConsiderations: ProjectRiskConsideration[];
  availableUnits: ProjectUnit[];
};

export type ProjectFilters = {
  city: City;
  district: string | "All";
  completionStatus: PropertyStatus | "All";
  ownership: ForeignOwnershipStatus | "All";
  budget: "All" | "under-200k" | "200k-400k" | "400k-plus";
};
