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
    icon: "RS",
    title: "Research & Shortlist",
    description:
      "Explore districts, compare residences and understand which locations, price points and buyer profiles may fit your objectives.",
    details: [
      "District intelligence and residence shortlisting",
      "Buyer profile, budget and location fit",
    ],
  },
  {
    step: "02",
    icon: "CA",
    title: "Compare & Assess",
    description:
      "Review available units, pricing, rental assumptions and ownership considerations with clear, structured comparison tools.",
    details: [
      "Unit comparison and rental assumptions",
      "Ownership considerations before reservation",
    ],
  },
  {
    step: "03",
    icon: "CP",
    title: "Coordinate Purchase",
    description:
      "We help coordinate reservation steps, foreign-buyer eligibility checks, legal review and payment milestones with the relevant local parties.",
    details: [
      "Reservation and eligibility coordination",
      "Legal review and payment milestone support",
    ],
  },
  {
    step: "04",
    icon: "MO",
    title: "Manage Ownership",
    description:
      "After completion, the platform vision extends to furnishing, leasing preparation, rental updates, maintenance records and owner reporting.",
    details: [
      "Handover, furnishing and leasing preparation",
      "Platform vision for owner reporting and records",
    ],
  },
];
