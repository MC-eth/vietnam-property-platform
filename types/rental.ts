export type RentalSummary = {
  propertyId: string;
  propertyName: string;
  monthlyRentCollectedUsd: number;
  occupancyStatus: "Occupied" | "Vacant" | "Under maintenance";
  maintenanceRequestsOpen: number;
  documentsAvailable: number;
  grossYieldPercent: number;
  netYieldPercent: number;
  netIncomeUsd: number;
  leaseExpiry: string;
  rentalStatements: string[];
  uploadedDocuments: string[];
};

export type InvestmentInsight = {
  id: string;
  title: string;
  summary: string;
  confidence: "High" | "Medium" | "Watch";
};

