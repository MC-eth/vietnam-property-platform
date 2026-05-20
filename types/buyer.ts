import type { City } from "./property";

export type BuyerType =
  | "First-time overseas investor"
  | "Yield-focused investor"
  | "Capital growth investor"
  | "Future relocation buyer"
  | "Lifestyle buyer";

export type InvestmentGoal =
  | "Rental income"
  | "Capital growth"
  | "Remote ownership"
  | "Future relocation"
  | "Lifestyle";

export type Buyer = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  countryOfResidence: string;
  buyerType: BuyerType;
  targetCity: City | "Both cities";
  investmentGoal: InvestmentGoal;
  budgetRange: string;
};
