import agentsJson from "@/data/mock/agents.json";
import enquiriesJson from "@/data/mock/enquiries.json";
import propertiesJson from "@/data/mock/properties.json";
import usersJson from "@/data/mock/users.json";
import { withInvestmentScore } from "@/lib/investment-score";
import type { Agent, Enquiry, Property, UserProfile } from "@/types";

type PropertySeed = Omit<Property, "investmentScore">;

export function getMockProperties(): Property[] {
  return (propertiesJson as PropertySeed[]).map(withInvestmentScore);
}

export function getMockUsers(): UserProfile[] {
  return usersJson as UserProfile[];
}

export function getMockAgents(): Agent[] {
  return agentsJson as Agent[];
}

export function getMockEnquiries(): Enquiry[] {
  return enquiriesJson as Enquiry[];
}

