import type { InvestmentInsight, RentalSummary } from "@/types/rental";

export const rentalSummaries: RentalSummary[] = [
  {
    propertyId: "thu-thiem-river-residence",
    propertyName: "Thu Thiem River Residence",
    monthlyRentCollectedUsd: 2050,
    occupancyStatus: "Occupied",
    maintenanceRequestsOpen: 1,
    documentsAvailable: 5,
    grossYieldPercent: 5.7,
    netYieldPercent: 5.1,
    netIncomeUsd: 2860,
    leaseExpiry: "30 April 2027",
    rentalStatements: ["May 2026 owner statement", "April 2026 owner statement"],
    uploadedDocuments: ["Lease agreement", "Inventory report", "Tenant ID record"],
  },
  {
    propertyId: "west-lake-diplomatic-suite",
    propertyName: "West Lake Diplomatic Suite",
    monthlyRentCollectedUsd: 1370,
    occupancyStatus: "Occupied",
    maintenanceRequestsOpen: 2,
    documentsAvailable: 4,
    grossYieldPercent: 5.0,
    netYieldPercent: 4.4,
    netIncomeUsd: 1840,
    leaseExpiry: "15 February 2027",
    rentalStatements: ["May 2026 owner statement", "April 2026 owner statement"],
    uploadedDocuments: ["Lease agreement", "Management agreement", "Maintenance invoice"],
  },
];

export const mockInvestmentInsights: InvestmentInsight[] = [
  {
    id: "income-stability",
    title: "Income stability remains the strongest portfolio signal",
    summary:
      "Both managed assets are occupied, with current leases extending beyond six months and limited near-term vacancy exposure.",
    confidence: "High",
  },
  {
    id: "maintenance-watch",
    title: "Maintenance requests should be resolved before renewal discussions",
    summary:
      "Open maintenance items are small, but closing them early may protect renewal probability and reduce downtime risk.",
    confidence: "Medium",
  },
  {
    id: "rental-setup",
    title: "Rental setup is the next value-creation step for the active purchase",
    summary:
      "The active Thu Thiem purchase should prepare furnishing, tenant profile, and management agreement before handover.",
    confidence: "Watch",
  },
];

