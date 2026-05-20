"use client";

import { useMemo, useState } from "react";
import { calculateRoi } from "@/lib/roi";
import type { Property } from "@/types/property";

export function useRoiCalculator(property: Property) {
  const [purchasePrice, setPurchasePrice] = useState(property.priceUsd);
  const [monthlyRent, setMonthlyRent] = useState(property.roiDefaults.rentMonthlyUsd);
  const [monthlyCosts, setMonthlyCosts] = useState(property.roiDefaults.serviceChargeMonthlyUsd);
  const [furnishing, setFurnishing] = useState(property.roiDefaults.furnishingUsd);

  const result = useMemo(
    () =>
      calculateRoi({
        purchasePriceUsd: purchasePrice,
        monthlyRentUsd: monthlyRent,
        monthlyCostsUsd: monthlyCosts,
        furnishingUsd: furnishing,
      }),
    [purchasePrice, monthlyRent, monthlyCosts, furnishing],
  );

  return {
    fields: {
      purchasePrice,
      monthlyRent,
      monthlyCosts,
      furnishing,
    },
    setters: {
      setPurchasePrice,
      setMonthlyRent,
      setMonthlyCosts,
      setFurnishing,
    },
    result,
  };
}

