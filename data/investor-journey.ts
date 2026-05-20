export type InvestorJourneyStage = {
  step: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const investorJourneyStages: InvestorJourneyStage[] = [
  {
    step: "01",
    icon: "DC",
    title: "Discover & Compare",
    description:
      "Browse curated HCMC and Hanoi opportunities with investor-first screening tools.",
    details: [
      "Compare investment score, yield, risk, liquidity, and district insights.",
      "Shortlist projects that fit your preferred buyer profile.",
    ],
    ctaLabel: "Open investment screener",
    ctaHref: "/properties",
  },
  {
    step: "02",
    icon: "SA",
    title: "Speak with Advisor",
    description:
      "Submit an enquiry so the platform can qualify your mandate and route support.",
    details: [
      "Capture budget, goal, timeline, funding source, and preferred city.",
      "Coordinate with a Hong Kong or international advisor for next steps.",
    ],
    ctaLabel: "Submit enquiry",
    ctaHref: "/enquiry",
  },
  {
    step: "03",
    icon: "LP",
    title: "Legal & Payment Coordination",
    description:
      "Coordinate local Vietnam agent and legal partner support before progressing.",
    details: [
      "Review project eligibility, foreign quota, and buyer documentation needs.",
      "Prepare an indicative document checklist and payment timeline.",
    ],
    ctaLabel: "View deal dashboard",
    ctaHref: "/owner-portal",
  },
  {
    step: "04",
    icon: "RP",
    title: "Reserve & Purchase",
    description:
      "Track the reservation, legal notes, SPA process, and payment milestones.",
    details: [
      "Use the dashboard to follow reservation, deposit, and contract status.",
      "Keep transaction information visible for advisor and local partner coordination.",
    ],
    ctaLabel: "Track transaction",
    ctaHref: "/owner-portal",
  },
  {
    step: "05",
    icon: "HR",
    title: "Handover & Rental Setup",
    description:
      "Move from completion into furnishing, handover coordination, and leasing preparation.",
    details: [
      "Prepare a rental strategy with local market and furnishing considerations.",
      "Move the asset into the rental management dashboard after handover.",
    ],
    ctaLabel: "Preview rental setup",
    ctaHref: "/owner-portal",
  },
  {
    step: "06",
    icon: "OR",
    title: "Ongoing Owner Reporting",
    description:
      "Monitor post-purchase performance through a transparent owner reporting layer.",
    details: [
      "Track rent, occupancy, net yield, maintenance requests, and lease expiry.",
      "Keep statements and property documents organized for future reporting.",
    ],
    ctaLabel: "View owner reporting",
    ctaHref: "/owner-portal",
  },
];
