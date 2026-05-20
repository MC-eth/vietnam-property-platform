export type RoiInput = {
  purchasePriceUsd: number;
  monthlyRentUsd: number;
  monthlyCostsUsd: number;
  furnishingUsd: number;
};

export type RoiResult = {
  annualRentUsd: number;
  annualCostsUsd: number;
  netIncomeUsd: number;
  totalCapitalUsd: number;
  grossYieldPercent: number;
  netYieldPercent: number;
};

export function calculateGrossYield(annualRentUsd: number, purchasePriceUsd: number) {
  return purchasePriceUsd > 0 ? (annualRentUsd / purchasePriceUsd) * 100 : 0;
}

export function calculateNetYield(netIncomeUsd: number, totalCapitalUsd: number) {
  return totalCapitalUsd > 0 ? (netIncomeUsd / totalCapitalUsd) * 100 : 0;
}

export function calculateRoi(input: RoiInput): RoiResult {
  const annualRentUsd = input.monthlyRentUsd * 12;
  const annualCostsUsd = input.monthlyCostsUsd * 12;
  const netIncomeUsd = annualRentUsd - annualCostsUsd;
  const totalCapitalUsd = input.purchasePriceUsd + input.furnishingUsd;

  return {
    annualRentUsd,
    annualCostsUsd,
    netIncomeUsd,
    totalCapitalUsd,
    grossYieldPercent: calculateGrossYield(annualRentUsd, input.purchasePriceUsd),
    netYieldPercent: calculateNetYield(netIncomeUsd, totalCapitalUsd),
  };
}

