import type { DEAL_STAGES, DOCUMENT_CHECKLIST_ITEMS } from "@/constants/deal-stages";

export type DealStage = (typeof DEAL_STAGES)[number];

export type DealStatus = "completed" | "current" | "upcoming" | "blocked";

export type DocumentChecklistItem = (typeof DOCUMENT_CHECKLIST_ITEMS)[number];

export type DealDocumentStatus = "received" | "required" | "reviewing" | "not-started";

export type DealDocument = {
  name: DocumentChecklistItem;
  status: DealDocumentStatus;
  note: string;
};

export type DealKeyDate = {
  label: string;
  date: string;
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
  documents: DealDocument[];
  keyDates: DealKeyDate[];
};

