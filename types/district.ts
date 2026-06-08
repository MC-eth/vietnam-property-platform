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
  | "Operational"
  | "Announced"
  | "Approved Policy"
  | "Under Construction"
  | "Targeted"
  | "Planned"
  | "Planning Horizon"
  | "Indicative";

export type DistrictTimelineItem = {
  id?: string;
  year?: string;
  yearLabel?: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  status: DistrictTimelineStatus;
  statusZh?: string;
  phase?: "past" | "current" | "future";
  sourceLabel?: string;
  sourceDate?: string;
  sourceUrl?: string;
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
  bullets: Array<
    | string
    | {
        status: string;
        text: string;
      }
  >;
  icon: "building" | "bridge" | "users" | "waves" | "route" | "compass" | "train" | "trees" | "briefcase" | "network";
  whyItMatters?: string;
  visualType?: "transport" | "lifestyle" | "commercial" | "industry";
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
  exploreResidencesCtaLabel?: string;
  selectedResidencesTitle?: string;
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
