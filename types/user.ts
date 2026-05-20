import type { BuyerType, InvestmentGoal } from "./buyer";
import type { CurrencyCode } from "./currency";
import type { City } from "./property";

export type UserRole = "buyer" | "advisor" | "agent" | "admin" | "owner";

export type UserProfile = {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string;
  countryOfResidence: string;
  preferredLanguage: "English" | "Traditional Chinese";
  preferredCurrency: CurrencyCode;
  buyerProfile: {
    buyerType: BuyerType;
    targetCity: City | "Both cities";
    investmentGoal: InvestmentGoal;
    budgetRange: string;
  } | null;
  savedPropertyIds: string[];
};

