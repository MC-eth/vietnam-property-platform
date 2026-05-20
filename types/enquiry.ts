import type { Buyer, InvestmentGoal } from "./buyer";
import type { City } from "./property";

export type EnquiryStatus = "New" | "Qualified" | "Advisor assigned" | "Closed";

export type Enquiry = {
  id: string;
  buyer: Pick<Buyer, "fullName" | "email" | "phone" | "countryOfResidence">;
  budgetRange: string;
  targetCity: City | "Both cities";
  investmentGoal: InvestmentGoal;
  timelineToBuy: string;
  fundingSource: string;
  needsRentalManagement: boolean | null;
  message: string;
  status: EnquiryStatus;
  propertyId?: string;
};
