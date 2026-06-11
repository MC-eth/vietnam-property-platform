export type InvestorJourneyStage = {
  step: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
};

export const investorJourneyStages: InvestorJourneyStage[] = [
  {
    step: "01",
    icon: "DR",
    title: "Discover Districts & Residences",
    description:
      "Start with district intelligence, project positioning and curated residence options before comparing individual units.",
    details: [
      "District and project research",
      "Curated residence options",
    ],
  },
  {
    step: "02",
    icon: "CA",
    title: "Compare Units & Speak with an Advisor",
    description:
      "Shortlist residences side by side across price, size, location, rental assumptions and buyer suitability, then discuss your mandate with an advisor.",
    details: [
      "Residence and unit comparison",
      "Advisor discussion around buyer fit",
    ],
  },
  {
    step: "03",
    icon: "CP",
    title: "Coordinate Reservation, Legal & Payment Steps",
    description:
      "Before committing, buyers should complete unit-level checks, foreign-buyer eligibility review, legal document review and payment milestone planning.",
    details: [
      "Foreign-buyer eligibility review",
      "Legal and payment milestone coordination",
    ],
  },
  {
    step: "04",
    icon: "MO",
    title: "Handover & Managed Ownership",
    description:
      "After completion, the platform vision extends to furnishing, leasing preparation, rental updates, maintenance records and owner reporting.",
    details: [
      "Handover, furnishing and leasing preparation",
      "Owner reporting and document records",
    ],
  },
];
