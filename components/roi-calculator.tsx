"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/types/property";

type RoiCalculatorProps = {
  property: Property;
};

const hkdRate = 7.8;

export function RoiCalculator({ property }: RoiCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(property.priceUsd);
  const [monthlyRent, setMonthlyRent] = useState(property.roiDefaults.rentMonthlyUsd);
  const [monthlyCosts, setMonthlyCosts] = useState(property.roiDefaults.serviceChargeMonthlyUsd);
  const [furnishing, setFurnishing] = useState(property.roiDefaults.furnishingUsd);

  const result = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const annualCosts = monthlyCosts * 12;
    const netIncome = annualRent - annualCosts;
    const totalCapital = purchasePrice + furnishing;
    const grossYield = purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;
    const netYield = totalCapital > 0 ? (netIncome / totalCapital) * 100 : 0;

    return { annualRent, netIncome, totalCapital, grossYield, netYield };
  }, [purchasePrice, monthlyRent, monthlyCosts, furnishing]);

  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
            ROI calculator
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
            Model rental income before enquiry.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5b645f]">
            Front-end calculator only. Later this can connect to live rent comps,
            management fees, taxes, FX, and financing assumptions.
          </p>
        </div>
        <div className="rounded-sm bg-[#123c2b] px-4 py-3 text-sm font-semibold text-white">
          HKD equivalent: {formatHkd(result.totalCapital * hkdRate)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <NumberField label="Purchase price (USD)" value={purchasePrice} onChange={setPurchasePrice} />
        <NumberField label="Expected monthly rent (USD)" value={monthlyRent} onChange={setMonthlyRent} />
        <NumberField label="Monthly costs (USD)" value={monthlyCosts} onChange={setMonthlyCosts} />
        <NumberField label="Furnishing budget (USD)" value={furnishing} onChange={setFurnishing} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Result label="Gross yield" value={`${result.grossYield.toFixed(2)}%`} />
        <Result label="Net yield" value={`${result.netYield.toFixed(2)}%`} />
        <Result label="Annual rent" value={formatUsd(result.annualRent)} />
        <Result label="Net income" value={formatUsd(result.netIncome)} />
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
      {label}
      <input
        className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal outline-none focus:border-[#123c2b] focus:ring-2 focus:ring-[#123c2b]/15"
        min="0"
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-[#f3efe8] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#16231d]">{value}</p>
    </div>
  );
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatHkd(value: number) {
  return new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(value);
}
