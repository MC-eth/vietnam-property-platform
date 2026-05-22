"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import { useRoiCalculator } from "@/hooks/use-roi-calculator";
import { formatCurrencyFromUsd, formatPercent } from "@/lib/formatters";
import type { Property } from "@/types/property";

type RoiCalculatorProps = {
  property: Property;
};

export function RoiCalculator({ property }: RoiCalculatorProps) {
  const { currency, t } = useAppPreferences();
  const { fields, setters, result } = useRoiCalculator(property);

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
            {t("roiCalculator")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
            {t("roiCalculatorTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
            {t("roiCalculatorDescription")}
          </p>
        </div>
        <div className="rounded-sm bg-[#F5C84C] px-4 py-3 text-sm font-semibold text-[#1F2937]">
          {t("currencyView", { currency })}: {formatCurrencyFromUsd(result.totalCapitalUsd, currency)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <NumberField
          label={t("purchasePriceUsdBase")}
          value={fields.purchasePrice}
          onChange={setters.setPurchasePrice}
        />
        <NumberField
          label={t("expectedMonthlyRentUsdBase")}
          value={fields.monthlyRent}
          onChange={setters.setMonthlyRent}
        />
        <NumberField
          label={t("monthlyCostsUsdBase")}
          value={fields.monthlyCosts}
          onChange={setters.setMonthlyCosts}
        />
        <NumberField
          label={t("furnishingBudgetUsdBase")}
          value={fields.furnishing}
          onChange={setters.setFurnishing}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Result label={t("grossYield")} value={formatPercent(result.grossYieldPercent)} />
        <Result label={t("netYield")} value={formatPercent(result.netYieldPercent)} />
        <Result
          label={t("annualRent")}
          value={formatCurrencyFromUsd(result.annualRentUsd, currency)}
        />
        <Result
          label={t("netIncome")}
          value={formatCurrencyFromUsd(result.netIncomeUsd, currency)}
        />
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
    <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
      {label}
      <input
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
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
    <div className="rounded-sm bg-[#FFFDF8] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}
