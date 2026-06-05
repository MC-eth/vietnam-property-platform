import type { City, InvestmentRating } from "./property";

export type BuyerFit =
  | "Rental income buyer"
  | "Capital appreciation buyer"
  | "Relocation buyer"
  | "Remote buyer"
  | "Family buyer"
  | "Lifestyle buyer";

export type DistrictInsight = {
  id: string;
  city: City;
  district: string;
  averageYield: string;
  liquidity: InvestmentRating;
  rentalDemand: InvestmentRating;
  buyerProfile: string;
  infrastructureOutlook: string;
  priceTrend: string;
  foreignBuyerPopularity: string;
};

export type DistrictMarket = {
  slug: string;
  name: string;
  displayName?: string;
  city: City;
  urbanZone?: string;
  urbanZoneDisplayName?: string;
  urbanZoneRole?: string;
  masterPlanContext?: string;
  planningHorizon?: string;
  sourceStatus?: string;
  sourceNote?: string;
  image: string;
  positioning: string;
  positioningTag: string;
  bestFor: string[];
  bestMatchedBuyer: string;
  investmentStyle: string;
  entryPriceLevel: "Premium" | "Upper-mid" | "Mid" | "Value-growth";
  lifestyleAppeal: "Very high" | "High" | "Moderate";
  recentProjects: string[];
  recentProjectActivity: "High" | "Moderate" | "Selective";
  snapshot: {
    averageGrossYieldRange: string;
    rentalDemand: InvestmentRating;
    liquidity: InvestmentRating;
    foreignBuyerPopularity: InvestmentRating;
    infrastructureOutlook: string;
    riskLevel: "Low" | "Medium" | "Medium-high";
  };
  investmentThesis: {
    tenantDemand: string;
    expatBusinessDemand: string;
    infrastructure: string;
    developerActivity: string;
    resaleLiquidity: string;
    foreignBuyerSuitability: string;
  };
  buyerFit: BuyerFit[];
  risks: string[];
  relatedPropertyDistricts: string[];
};

export type DistrictTimelineStatus =
  | "Completed"
  | "Announced"
  | "Under Construction"
  | "Planned"
  | "Indicative";

export type DistrictTimelineItem = {
  year: string;
  title: string;
  description: string;
  status: DistrictTimelineStatus;
  isFuture?: boolean;
};

export type DistrictFutureAdvantage = {
  title: string;
  description: string;
  icon?: "building" | "bridge" | "users" | "waves" | "route" | "compass" | "train" | "trees" | "briefcase" | "network";
  category?: string;
};

export type DistrictGrowthDriver = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: "building" | "bridge" | "users" | "waves" | "route" | "compass" | "train" | "trees" | "briefcase" | "network";
  statusNote?: string;
};

export type DistrictInsightPageData = {
  slug: string;
  aliases?: string[];
  displayName: string;
  city: City;
  districtContext: string;
  urbanZone: string;
  urbanZoneDisplayName: string;
  urbanZoneRole: string;
  masterPlanContext: string;
  masterPlanShortContext?: string;
  planningDisclaimer?: string;
  planningHorizon: string;
  sourceStatus: string;
  sourceNote: string;
  districtHeroVisualImage?: string;
  districtHeroVisualAlt?: string;
  districtHeroVisualCaption?: string;
  strategicDiagramImage?: string;
  infrastructureConceptImage?: string;
  lifestyleCommercialConceptImage?: string;
  conceptVisualImage?: string;
  conceptVisualAlt?: string;
  conceptVisualCaption?: string;
  conceptMapLabels?: {
    cbd: string;
    river: string;
    district: string;
    residences: string[];
    bridge: string;
    corridor: string;
  };
  shortPositioning: string;
  heroQuickFacts?: {
    label: string;
    value: string;
  }[];
  basicInfo: {
    positioning: string;
    suitableFor: string[];
    buyerProfiles: string[];
    districtRole: string;
    planningTheme: string;
    investorRelevance: string;
  };
  rentalDemand: InvestmentRating;
  selectedResidenceSlugs: string[];
  timeline: DistrictTimelineItem[];
  futureAdvantages: DistrictFutureAdvantage[];
  growthDrivers?: DistrictGrowthDriver[];
  ctaDistrictFilter: string;
};
