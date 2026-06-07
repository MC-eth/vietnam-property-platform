export type VietnamThesisIcon =
  | "TrendingUp"
  | "Building2"
  | "Route"
  | "Globe2"
  | "ShieldCheck"
  | "Users";

export type VietnamThesisCard = {
  id: string;
  title: string;
  body: string;
  chip: string;
  icon: VietnamThesisIcon;
};

export const vietnamThesisCards: VietnamThesisCard[] = [
  {
    id: "economic-momentum",
    title: "Economic Momentum",
    body:
      "Vietnam continues to rank among Asia’s faster-growing economies, supported by manufacturing, domestic consumption and sustained investment activity.",
    chip: "2025 GDP Growth · 8.02%",
    icon: "TrendingUp",
  },
  {
    id: "urbanisation-scale",
    title: "Urbanisation at Scale",
    body:
      "Major cities continue to expand as businesses, professionals and higher-income households concentrate around established and emerging urban districts.",
    chip: "Expanding Urban Demand",
    icon: "Building2",
  },
  {
    id: "infrastructure-expansion",
    title: "Infrastructure-Led Expansion",
    body:
      "Metro systems, ring roads, airports and new urban centres are reshaping connectivity and supporting the next phase of city development.",
    chip: "Major Infrastructure Pipeline",
    icon: "Route",
  },
  {
    id: "global-business-capital",
    title: "Global Business & Capital",
    body:
      "Vietnam continues to attract international manufacturers, regional businesses and foreign capital, supporting demand for offices, housing and professional services.",
    chip: "2025 FDI Inflows · US$27.6B",
    icon: "Globe2",
  },
  {
    id: "overseas-buyer-access",
    title: "Overseas Buyer Access",
    body:
      "Eligible overseas buyers may acquire qualifying residential property, subject to legal restrictions, project eligibility and available foreign-buyer quota.",
    chip: "Eligible Residential Ownership",
    icon: "ShieldCheck",
  },
  {
    id: "rental-end-user-demand",
    title: "Rental & End-User Demand",
    body:
      "Professionals, international businesses, expatriates and local households contribute to demand across prime urban and lifestyle districts.",
    chip: "Diverse Urban Demand",
    icon: "Users",
  },
];
