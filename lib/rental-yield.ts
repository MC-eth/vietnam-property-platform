export type RentalYieldInput = {
  purchasePriceUsd: number;
  estimatedMonthlyRentUsd: number;
  managementFeePercent: number;
  vacancyAllowancePercent: number;
  annualServiceChargeUsd: number;
};

export type RentalYieldResult = {
  grossAnnualRentUsd: number;
  rentalManagementCostUsd: number;
  vacancyAllowanceCostUsd: number;
  netAnnualRentUsd: number;
  estimatedGrossYieldPercent: number;
  estimatedNetYieldPercent: number;
};

export function calculateRentalYield(input: RentalYieldInput): RentalYieldResult {
  const grossAnnualRentUsd = input.estimatedMonthlyRentUsd * 12;
  const rentalManagementCostUsd =
    grossAnnualRentUsd * (input.managementFeePercent / 100);
  const vacancyAllowanceCostUsd =
    grossAnnualRentUsd * (input.vacancyAllowancePercent / 100);
  const netAnnualRentUsd =
    grossAnnualRentUsd -
    rentalManagementCostUsd -
    vacancyAllowanceCostUsd -
    input.annualServiceChargeUsd;

  return {
    grossAnnualRentUsd,
    rentalManagementCostUsd,
    vacancyAllowanceCostUsd,
    netAnnualRentUsd,
    estimatedGrossYieldPercent: calculateYield(grossAnnualRentUsd, input.purchasePriceUsd),
    estimatedNetYieldPercent: calculateYield(netAnnualRentUsd, input.purchasePriceUsd),
  };
}

function calculateYield(annualRentUsd: number, purchasePriceUsd: number) {
  return purchasePriceUsd > 0 ? (annualRentUsd / purchasePriceUsd) * 100 : 0;
}
