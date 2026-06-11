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
      "We help you understand key districts, project positioning and suitable residence options before you commit time or capital.",
    details: [
      "District and residence shortlisting",
      "Budget, location and buyer-profile fit",
    ],
  },
  {
    step: "02",
    icon: "CA",
    title: "Compare & Assess",
    description:
      "Compare available units, pricing, rental assumptions and ownership considerations through structured buyer tools and advisor input.",
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
      "We help coordinate the reservation process, foreign-buyer eligibility checks, legal review and payment milestones with relevant local parties.",
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
      "After completion, our platform vision extends to furnishing, leasing preparation, rental updates, maintenance records and owner reporting.",
    details: [
      "Handover, furnishing and leasing preparation",
      "Owner reporting and document records",
    ],
  },
];
