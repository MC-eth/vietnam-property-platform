import { DEAL_STAGES, DOCUMENT_CHECKLIST_ITEMS } from "@/constants/deal-stages";
import type { BuyerDeal, DealDocumentStatus, DealStage, DealStatus } from "@/types/deal";

const documentStatusByDeal: Record<string, Partial<Record<string, DealDocumentStatus>>> = {
  "deal-thu-thiem-active": {
    Passport: "received",
    "Proof of funds": "received",
    "Reservation form": "reviewing",
    SPA: "not-started",
    "Transfer receipt": "not-started",
    "Legal review report": "required",
    "Rental management agreement": "not-started",
  },
  "deal-west-lake-legal": {
    Passport: "received",
    "Proof of funds": "received",
    "Reservation form": "received",
    SPA: "required",
    "Transfer receipt": "not-started",
    "Legal review report": "reviewing",
    "Rental management agreement": "not-started",
  },
  "deal-district-seven-rented": {
    Passport: "received",
    "Proof of funds": "received",
    "Reservation form": "received",
    SPA: "received",
    "Transfer receipt": "received",
    "Legal review report": "received",
    "Rental management agreement": "received",
  },
};

export const buyerDeals: BuyerDeal[] = [
  {
    id: "deal-thu-thiem-active",
    buyerName: "Marcus T.",
    propertyId: "thu-thiem-river-residence",
    propertyName: "Thu Thiem River Residence",
    city: "Ho Chi Minh City",
    currentStage: "Reservation",
    nextAction: "Advisor to confirm reservation form and legal review scope.",
    assignedAdvisor: "Annie Leung",
    assignedLocalAgent: "Minh Tran",
    stageStatuses: buildStageStatuses("Reservation"),
    documents: buildDocuments("deal-thu-thiem-active"),
    keyDates: [
      { label: "Reservation review", date: "24 May 2026" },
      { label: "Legal call", date: "27 May 2026" },
      { label: "Deposit deadline", date: "31 May 2026" },
    ],
  },
  {
    id: "deal-west-lake-legal",
    buyerName: "Elaine C.",
    propertyId: "west-lake-diplomatic-suite",
    propertyName: "West Lake Diplomatic Suite",
    city: "Hanoi",
    currentStage: "Legal review",
    nextAction: "Buyer to approve translated quota and title review report.",
    assignedAdvisor: "Jonathan Wong",
    assignedLocalAgent: "Linh Pham",
    stageStatuses: buildStageStatuses("Legal review"),
    documents: buildDocuments("deal-west-lake-legal"),
    keyDates: [
      { label: "Document review", date: "22 May 2026" },
      { label: "Quota confirmation", date: "29 May 2026" },
      { label: "Contract target", date: "07 June 2026" },
    ],
  },
  {
    id: "deal-district-seven-rented",
    buyerName: "David H.",
    propertyId: "district-seven-family-residence",
    propertyName: "District 7 Family Residence",
    city: "Ho Chi Minh City",
    currentStage: "Rented",
    nextAction: "Owner portal reporting starts with first monthly rental statement.",
    assignedAdvisor: "Annie Leung",
    assignedLocalAgent: "Quang Nguyen",
    stageStatuses: buildStageStatuses("Rented"),
    documents: buildDocuments("deal-district-seven-rented"),
    keyDates: [
      { label: "Handover completed", date: "11 April 2026" },
      { label: "Tenant move-in", date: "01 May 2026" },
      { label: "First owner report", date: "31 May 2026" },
    ],
  },
];

export const activeBuyerDeal = buyerDeals[0];

function buildStageStatuses(currentStage: DealStage): Record<DealStage, DealStatus> {
  const currentIndex = DEAL_STAGES.indexOf(currentStage);

  return DEAL_STAGES.reduce(
    (statuses, stage, index) => ({
      ...statuses,
      [stage]:
        index < currentIndex ? "completed" : index === currentIndex ? "current" : "upcoming",
    }),
    {} as Record<DealStage, DealStatus>,
  );
}

function buildDocuments(dealId: string) {
  const statusMap = documentStatusByDeal[dealId] ?? {};

  return DOCUMENT_CHECKLIST_ITEMS.map((name) => {
    const status = statusMap[name] ?? "not-started";

    return {
      name,
      status,
      note: getDocumentNote(status),
    };
  });
}

function getDocumentNote(status: DealDocumentStatus) {
  switch (status) {
    case "received":
      return "Received";
    case "reviewing":
      return "Under advisor review";
    case "required":
      return "Required next";
    case "not-started":
      return "Upcoming";
  }
}
