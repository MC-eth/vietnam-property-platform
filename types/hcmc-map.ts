import type { InvestmentRating } from "@/types/property";

export type HcmcMapPosition = {
  x: number;
  y: number;
};

export type HcmcMapDistrict = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  districtNumber?: string;
  positioning: string;
  futureDevelopment: string;
  bestFor: string[];
  rentalDemand: InvestmentRating;
  liquidity: InvestmentRating;
  landmarks: string[];
  projectSlugs: string[];
  mapPosition: HcmcMapPosition;
  color: string;
  shapePath: string;
  watchpoint: string;
};

export type HcmcMapProject = {
  projectSlug: string;
  projectName: string;
  districtSlug: string;
  mapPosition: HcmcMapPosition;
  startingPriceUsd: number;
  availableUnitsCount: number;
  href: string;
  image: string;
};

export type HcmcMapLandmark = {
  id: string;
  name: string;
  type: "airport" | "market" | "tower" | "bridge" | "metro";
  mapPosition: HcmcMapPosition;
};

export type HcmcDistrictSummary = {
  name: string;
  positioningBadge: string;
  investmentPositioning: string;
  futureDevelopment: string;
  bestFor: string[];
  rentalDemand: {
    value: InvestmentRating;
    activeSegments: number;
  };
  growthOutlook: {
    value: string;
    activeSegments: number;
  };
  landmarks: Array<{
    icon: "bridge" | "river" | "train" | "cbd";
    label: string;
  }>;
  residenceSlugs: string[];
  districtInsightsHref: string;
};
