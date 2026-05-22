import { DEAL_STAGES, DOCUMENT_CHECKLIST_ITEMS } from "@/constants/deal-stages";
import type {
  BuyerDeal,
  DealDocumentStatus,
  DealPayment,
  DealRoles,
  DealStage,
  DealStatus,
} from "@/types/deal";

const documentStatusByDeal: Record<string, Partial<Record<string, DealDocumentStatus>>> = {
  "deal-thu-thiem-active": {
    Passport: "approved",
    "Proof of funds": "approved",
    "Reservation form": "under review",
    "Legal review report": "uploaded",
    SPA: "required",
    "Bank transfer receipt": "missing",
    "Handover documents": "required",
    "Rental management agreement": "required",
  },
  "deal-west-lake-legal": {
    Passport: "approved",
    "Proof of funds": "uploaded",
    "Reservation form": "approved",
    "Legal review report": "under review",
    SPA: "required",
    "Bank transfer receipt": "missing",
    "Handover documents": "required",
    "Rental management agreement": "required",
  },
  "deal-district-seven-rented": {
    Passport: "approved",
    "Proof of funds": "approved",
    "Reservation form": "approved",
    "Legal review report": "approved",
    SPA: "approved",
    "Bank transfer receipt": "approved",
    "Handover documents": "approved",
    "Rental management agreement": "approved",
  },
};

const defaultRoles: DealRoles = {
  buyerAdvisor: "Annie Leung",
  vietnamAgent: "Minh Tran",
  legalPartner: "Saigon Legal Coordination Desk",
  developerContact: "Rivergate Urban Homes sales office",
  rentalManager: "VietInvest Rental Operations",
};

export const buyerDeals: BuyerDeal[] = [
  {
    id: "deal-thu-thiem-active",
    buyerName: "Marcus T.",
    propertyId: "thu-thiem-river-residence",
    propertyName: "Thu Thiem River Residence",
    city: "Ho Chi Minh City",
    currentStage: "Reservation submitted",
    nextAction: "Buyer to review legal notes and confirm whether to proceed with deposit payment.",
    assignedAdvisor: "Annie Leung",
    assignedLocalAgent: "Minh Tran",
    stageStatuses: buildStageStatuses("Reservation submitted"),
    stageDetails: buildStageDetails("Reservation submitted"),
    documents: buildDocuments("deal-thu-thiem-active"),
    payments: buildPayments("active"),
    roles: defaultRoles,
    keyDates: [
      { label: "Reservation review", date: "24 May 2026" },
      { label: "Legal call", date: "27 May 2026" },
      { label: "Deposit target", date: "31 May 2026" },
    ],
  },
  {
    id: "deal-west-lake-legal",
    buyerName: "Elaine C.",
    propertyId: "west-lake-diplomatic-suite",
    propertyName: "West Lake Diplomatic Suite",
    city: "Hanoi",
    currentStage: "Legal review started",
    nextAction: "Buyer to review translated quota and title notes with advisor.",
    assignedAdvisor: "Jonathan Wong",
    assignedLocalAgent: "Linh Pham",
    stageStatuses: buildStageStatuses("Legal review started"),
    stageDetails: buildStageDetails("Legal review started"),
    documents: buildDocuments("deal-west-lake-legal"),
    payments: buildPayments("legal"),
    roles: {
      buyerAdvisor: "Jonathan Wong",
      vietnamAgent: "Linh Pham",
      legalPartner: "Hanoi Property Legal Review Desk",
      developerContact: "Capital Lake Developments sales office",
      rentalManager: "VietInvest Rental Operations",
    },
    keyDates: [
      { label: "Document review", date: "22 May 2026" },
      { label: "Quota confirmation", date: "29 May 2026" },
      { label: "Reservation target", date: "07 June 2026" },
    ],
  },
  {
    id: "deal-district-seven-rented",
    buyerName: "David H.",
    propertyId: "district-seven-family-residence",
    propertyName: "District 7 Family Residence",
    city: "Ho Chi Minh City",
    currentStage: "Property rented",
    nextAction: "Owner portal reporting starts with first monthly rental statement.",
    assignedAdvisor: "Annie Leung",
    assignedLocalAgent: "Quang Nguyen",
    stageStatuses: buildStageStatuses("Property rented"),
    stageDetails: buildStageDetails("Property rented"),
    documents: buildDocuments("deal-district-seven-rented"),
    payments: buildPayments("completed"),
    roles: {
      buyerAdvisor: "Annie Leung",
      vietnamAgent: "Quang Nguyen",
      legalPartner: "Saigon Legal Coordination Desk",
      developerContact: "South Saigon Communities handover team",
      rentalManager: "VietInvest Rental Operations",
    },
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

function buildStageDetails(currentStage: DealStage) {
  const statuses = buildStageStatuses(currentStage);

  return DEAL_STAGES.map((stage, index) => ({
    stage,
    status: statuses[stage],
    responsibleParty: getResponsibleParty(stage),
    expectedDate: getExpectedDate(index),
    nextAction: getStageAction(stage, statuses[stage]),
  }));
}

function buildDocuments(dealId: string) {
  const statusMap = documentStatusByDeal[dealId] ?? {};

  return DOCUMENT_CHECKLIST_ITEMS.map((name) => {
    const status = statusMap[name] ?? "required";

    return {
      name,
      status,
      note: getDocumentNote(status),
    };
  });
}

function buildPayments(mode: "active" | "legal" | "completed"): DealPayment[] {
  if (mode === "completed") {
    return [
      payment("Reservation amount", 8000, "Paid 12 Feb 2026", "paid", true),
      payment("Deposit amount", 78400, "Paid 21 Feb 2026", "paid", true),
      payment("Final payment", 305600, "Paid 04 Apr 2026", "paid", true),
    ];
  }

  if (mode === "legal") {
    return [
      payment("Reservation amount", 6000, "Target 07 June 2026", "upcoming", false),
      payment("Deposit amount", 63000, "Indicative 14 June 2026", "upcoming", false),
      payment("Final payment", 246000, "Subject to SPA timeline", "upcoming", false),
    ];
  }

  return [
    payment("Reservation amount", 8000, "24 May 2026", "under review", true),
    payment("Deposit amount", 85600, "31 May 2026", "due", false),
    payment("Final payment", 334400, "Subject to SPA timeline", "upcoming", false),
  ];
}

function payment(
  label: string,
  amountUsd: number,
  dueDate: string,
  status: DealPayment["status"],
  receiptUploaded: boolean,
): DealPayment {
  return {
    label,
    amount: `USD ${amountUsd.toLocaleString("en-US")}`,
    amountUsd,
    dueDate,
    status,
    receiptUploaded,
    note: "Indicative payment workflow only. No real payment processing is connected in this MVP.",
  };
}

function getDocumentNote(status: DealDocumentStatus) {
  switch (status) {
    case "approved":
      return "Approved for this mock workflow";
    case "uploaded":
      return "Uploaded by buyer";
    case "under review":
      return "Under advisor or legal review";
    case "required":
      return "Required before next stage";
    case "missing":
      return "Not uploaded yet";
  }
}

function getResponsibleParty(stage: DealStage) {
  if (["Enquiry submitted", "Buyer qualified", "Property shortlisted"].includes(stage)) {
    return "Buyer advisor";
  }
  if (["Advisor assigned"].includes(stage)) {
    return "Platform operations";
  }
  if (["Agent matched", "Reservation submitted"].includes(stage)) {
    return "Vietnam agent";
  }
  if (["Legal review started", "SPA signed"].includes(stage)) {
    return "Legal partner";
  }
  if (["Deposit paid", "Final payment completed"].includes(stage)) {
    return "Buyer and advisor";
  }
  if (["Handover completed"].includes(stage)) {
    return "Developer contact";
  }

  return "Rental manager";
}

function getExpectedDate(index: number) {
  const dates = [
    "Completed",
    "Completed",
    "Completed",
    "Completed",
    "Completed",
    "27 May 2026",
    "24 May 2026",
    "31 May 2026",
    "14 June 2026",
    "Subject to SPA",
    "Target Q3 2026",
    "After handover",
    "After leasing",
  ];

  return dates[index] ?? "To be confirmed";
}

function getStageAction(stage: DealStage, status: DealStatus) {
  if (status === "completed") {
    return "No buyer action currently required.";
  }

  const actions: Record<DealStage, string> = {
    "Enquiry submitted": "Submit buyer mandate and contact details.",
    "Buyer qualified": "Confirm budget, timeline, goal, and funding source.",
    "Advisor assigned": "Schedule advisor call.",
    "Property shortlisted": "Review shortlist and select preferred project.",
    "Agent matched": "Confirm local agent coordination scope.",
    "Legal review started": "Review quota, title, and contract notes.",
    "Reservation submitted": "Review reservation form and legal notes.",
    "Deposit paid": "Upload bank transfer receipt after payment.",
    "SPA signed": "Review signed SPA copy and payment timeline.",
    "Final payment completed": "Confirm final payment receipt and handover timing.",
    "Handover completed": "Confirm handover documents and snagging notes.",
    "Rental setup started": "Approve furnishing and rental launch plan.",
    "Property rented": "Review first owner statement.",
  };

  return actions[stage];
}
