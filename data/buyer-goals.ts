import type { PropertyFilters } from "@/components/property-filter";

export type BuyerGoalSlug =
  | "rental-income"
  | "capital-growth"
  | "remote-ownership"
  | "future-relocation"
  | "lifestyle-investment";

export type BuyerGoal = {
  slug: BuyerGoalSlug;
  title: string;
  summary: string;
  recommendedDistricts: string[];
  filters: Partial<PropertyFilters>;
  whyItFits: string;
};

export const buyerGoals: BuyerGoal[] = [
  {
    slug: "rental-income",
    title: "Rental Income",
    summary: "Prioritize ready or near-ready assets with strong tenant demand and visible yields.",
    recommendedDistricts: ["Thu Thiem", "Tay Ho", "Nam Tu Liem"],
    filters: { rentalDemand: "High", minScore: 7 },
    whyItFits:
      "These properties emphasize rental demand, income visibility, and practical post-purchase management.",
  },
  {
    slug: "capital-growth",
    title: "Capital Growth",
    summary: "Focus on districts with infrastructure upgrades, scarcity, and long-term resale demand.",
    recommendedDistricts: ["Thu Thiem", "Ben Nghe", "Hoan Kiem"],
    filters: { minScore: 7 },
    whyItFits:
      "Recommendations lean toward scarce urban locations and districts with infrastructure-led upside.",
  },
  {
    slug: "remote-ownership",
    title: "Remote Ownership",
    summary: "Find lower-friction assets suited to overseas ownership and rental management.",
    recommendedDistricts: ["Thu Thiem", "Phu My Hung", "Tay Ho"],
    filters: { ownership: "Eligible", riskRating: "Low", minScore: 8 },
    whyItFits:
      "These matches favor eligible ownership, lower operational complexity, and rental management readiness.",
  },
  {
    slug: "future-relocation",
    title: "Future Relocation",
    summary: "Balance investment quality with lifestyle, schools, healthcare, and daily convenience.",
    recommendedDistricts: ["Phu My Hung", "Tay Ho", "Thu Thiem"],
    filters: { minScore: 7 },
    whyItFits:
      "Selected districts combine tenant demand today with liveability for future personal use.",
  },
  {
    slug: "lifestyle-investment",
    title: "Lifestyle Investment",
    summary: "Explore properties with lifestyle appeal, international amenities, and defensible demand.",
    recommendedDistricts: ["Tay Ho", "Phu My Hung", "Hoan Kiem"],
    filters: { minScore: 6 },
    whyItFits:
      "Recommendations balance personal enjoyment, district character, and international tenant appeal.",
  },
];

export function getBuyerGoalBySlug(slug?: string) {
  return buyerGoals.find((goal) => goal.slug === slug);
}

