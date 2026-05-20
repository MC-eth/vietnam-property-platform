"use client";

import { HKD_PER_USD } from "@/constants";
import { useRoiCalculator } from "@/hooks/use-roi-calculator";
import { formatHkd, formatPercent, formatUsd } from "@/lib/formatters";
import type { Property } from "@/types/property";

type RoiCalculatorProps = {
  property: Property;
};

export function RoiCalculator({ property }: RoiCalculatorProps) {
  const { fields, setters, result } = useRoiCalculator(property);

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
          HKD equivalent: {formatHkd(result.totalCapitalUsd * HKD_PER_USD)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <NumberField
          label="Purchase price (USD)"
          value={fields.purchasePrice}
          onChange={setters.setPurchasePrice}
        />
        <NumberField
          label="Expected monthly rent (USD)"
          value={fields.monthlyRent}
          onChange={setters.setMonthlyRent}
        />
        <NumberField
          label="Monthly costs (USD)"
          value={fields.monthlyCosts}
          onChange={setters.setMonthlyCosts}
        />
        <NumberField
          label="Furnishing budget (USD)"
          value={fields.furnishing}
          onChange={setters.setFurnishing}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Result label="Gross yield" value={formatPercent(result.grossYieldPercent)} />
        <Result label="Net yield" value={formatPercent(result.netYieldPercent)} />
        <Result label="Annual rent" value={formatUsd(result.annualRentUsd)} />
        <Result label="Net income" value={formatUsd(result.netIncomeUsd)} />
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
