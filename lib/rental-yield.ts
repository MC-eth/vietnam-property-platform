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

// Shared assumptions used by the unit-comparison interface so that the visible
// rows and the comparison engine consume identical numeric yield outputs.
const UNIT_YIELD_ASSUMPTIONS = {
  managementFeePercent: 8,
  vacancyAllowancePercent: 5,
  annualServiceChargePerSqmUsd: 3,
};

type UnitYieldInput = {
  priceUsd: number;
  estimatedMonthlyRentUsd: number;
  sizeSqm: number;
};

function unitYieldResult(unit: UnitYieldInput) {
  return calculateRentalYield({
    purchasePriceUsd: unit.priceUsd,
    estimatedMonthlyRentUsd: unit.estimatedMonthlyRentUsd,
    managementFeePercent: UNIT_YIELD_ASSUMPTIONS.managementFeePercent,
    vacancyAllowancePercent: UNIT_YIELD_ASSUMPTIONS.vacancyAllowancePercent,
    annualServiceChargeUsd:
      unit.sizeSqm * UNIT_YIELD_ASSUMPTIONS.annualServiceChargePerSqmUsd * 12,
  });
}

export function estimateUnitNetYieldPercent(unit: UnitYieldInput) {
  return unitYieldResult(unit).estimatedNetYieldPercent;
}

export function estimateUnitGrossYieldPercent(unit: UnitYieldInput) {
  return unitYieldResult(unit).estimatedGrossYieldPercent;
}
