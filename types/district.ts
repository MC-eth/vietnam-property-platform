import type { City, InvestmentRating } from "./property";

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
