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
