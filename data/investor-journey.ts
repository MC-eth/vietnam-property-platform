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
      "Explore curated residences, district insights, and investment positioning across HCMC and Hanoi.",
    details: [
      "Review district positioning before comparing residences.",
      "Start with market context instead of browsing blind.",
    ],
  },
  {
    step: "02",
    icon: "CU",
    title: "Compare Units & Speak with Advisor",
    description:
      "Shortlist suitable units, compare key figures, and submit an enquiry for advisor support.",
    details: [
      "Compare available units, pricing, and indicative rent.",
      "Share your mandate for advisor support.",
    ],
  },
  {
    step: "03",
    icon: "RP",
    title: "Reserve with Legal & Payment Coordination",
    description:
      "Coordinate local agent, legal document review, foreign buyer status, and payment milestones before reservation.",
    details: [
      "Check unit-level legal documents and foreign buyer status.",
      "Understand reservation steps and payment milestones.",
    ],
  },
  {
    step: "04",
    icon: "HR",
    title: "Handover & Rental Setup",
    description:
      "Move from completion into furnishing, handover coordination, leasing preparation, and owner visibility.",
    details: [
      "Coordinate handover, furnishing, and leasing preparation.",
      "Track rent, occupancy, documents, and owner reporting after setup.",
    ],
  },
];
