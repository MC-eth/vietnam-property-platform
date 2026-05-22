import type { DEAL_STAGES, DOCUMENT_CHECKLIST_ITEMS } from "@/constants/deal-stages";

export type DealStage = (typeof DEAL_STAGES)[number];

export type DealStatus = "completed" | "current" | "upcoming" | "blocked";

export type DocumentChecklistItem = (typeof DOCUMENT_CHECKLIST_ITEMS)[number];

export type DealDocumentStatus = "required" | "uploaded" | "under review" | "approved" | "missing";

export type DealDocument = {
  name: DocumentChecklistItem;
  status: DealDocumentStatus;
  note: string;
};

export type DealKeyDate = {
  label: string;
  date: string;
};

export type DealStageDetail = {
  stage: DealStage;
  status: DealStatus;
  responsibleParty: string;
  expectedDate: string;
  nextAction: string;
};

export type DealPaymentStatus = "upcoming" | "due" | "paid" | "under review";

export type DealPayment = {
  label: string;
  amount: string;
  amountUsd: number;
  dueDate: string;
  status: DealPaymentStatus;
  receiptUploaded: boolean;
  note: string;
};

export type DealRoles = {
  buyerAdvisor: string;
  vietnamAgent: string;
  legalPartner: string;
  developerContact: string;
  rentalManager: string;
};

export type BuyerDeal = {
  id: string;
  buyerName: string;
  propertyId: string;
  propertyName: string;
  city: string;
  currentStage: DealStage;
  nextAction: string;
  assignedAdvisor: string;
  assignedLocalAgent: string;
  stageStatuses: Partial<Record<DealStage, DealStatus>>;
  stageDetails: DealStageDetail[];
  documents: DealDocument[];
  payments: DealPayment[];
  roles: DealRoles;
  keyDates: DealKeyDate[];
};
