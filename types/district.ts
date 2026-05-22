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
  city: City;
  positioning: string;
  bestFor: string[];
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
