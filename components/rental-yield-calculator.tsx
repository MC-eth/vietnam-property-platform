"use client";

import { useMemo, useState } from "react";
import { T } from "@/components/localized-text";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  convertCurrencyToUsd,
  convertUsdToCurrency,
  formatCurrencyFromUsd,
  formatPercent,
} from "@/lib/formatters";
import { calculateRentalYield } from "@/lib/rental-yield";
import type { ProjectUnit } from "@/types/project";

type RentalYieldCalculatorProps = {
  unit: ProjectUnit;
};

const DEFAULT_MANAGEMENT_FEE_PERCENT = 8;
const DEFAULT_VACANCY_ALLOWANCE_PERCENT = 5;
const MOCK_MONTHLY_SERVICE_CHARGE_PER_SQM_USD = 3;

export function RentalYieldCalculator({ unit }: RentalYieldCalculatorProps) {
  const { currency, t } = useAppPreferences();
  const [purchasePriceUsd, setPurchasePriceUsd] = useState(unit.priceUsd);
  const [estimatedMonthlyRentUsd, setEstimatedMonthlyRentUsd] = useState(
    unit.estimatedMonthlyRentUsd,
  );
  const [managementFeePercent, setManagementFeePercent] = useState(
    DEFAULT_MANAGEMENT_FEE_PERCENT,
  );
  const [vacancyAllowancePercent, setVacancyAllowancePercent] = useState(
    DEFAULT_VACANCY_ALLOWANCE_PERCENT,
  );
  const [annualServiceChargeUsd, setAnnualServiceChargeUsd] = useState(
    unit.sizeSqm * MOCK_MONTHLY_SERVICE_CHARGE_PER_SQM_USD * 12,
  );
  const result = useMemo(
    () =>
      calculateRentalYield({
        purchasePriceUsd,
        estimatedMonthlyRentUsd,
        managementFeePercent,
        vacancyAllowancePercent,
        annualServiceChargeUsd,
      }),
    [
      annualServiceChargeUsd,
      estimatedMonthlyRentUsd,
      managementFeePercent,
      purchasePriceUsd,
      vacancyAllowancePercent,
    ],
  );

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
          <T k="indicativeEstimate" />
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
          <T k="rentalYieldCalculator" />
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          <T k="rentalYieldCalculatorDescription" />
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <CurrencyField
            currency={currency}
            label={t("purchasePrice")}
            valueUsd={purchasePriceUsd}
            onChange={setPurchasePriceUsd}
          />
          <CurrencyField
            currency={currency}
            label={t("estimatedMonthlyRent")}
            valueUsd={estimatedMonthlyRentUsd}
            onChange={setEstimatedMonthlyRentUsd}
          />
          <PercentField
            label={t("managementFee")}
            value={managementFeePercent}
            onChange={setManagementFeePercent}
          />
          <PercentField
            label={t("vacancyAllowance")}
            value={vacancyAllowancePercent}
            onChange={setVacancyAllowancePercent}
          />
          <div className="sm:col-span-2">
            <CurrencyField
              currency={currency}
              label={t("annualServiceCharge")}
              valueUsd={annualServiceChargeUsd}
              onChange={setAnnualServiceChargeUsd}
            />
            <p className="mt-2 text-xs leading-5 text-[#6B7280]">
              <T k="annualServiceChargeHelper" />
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label={t("grossAnnualRent")}
            value={formatCurrencyFromUsd(result.grossAnnualRentUsd, currency)}
          />
          <ResultCard
            label={t("netAnnualRent")}
            value={formatCurrencyFromUsd(result.netAnnualRentUsd, currency)}
          />
          <ResultCard
            label={t("estimatedGrossYield")}
            value={formatPercent(result.estimatedGrossYieldPercent)}
          />
          <ResultCard
            highlight
            label={t("estimatedNetYield")}
            value={formatPercent(result.estimatedNetYieldPercent)}
          />
        </div>
      </div>

      <p className="mt-5 border-t border-[#ECE7DA] pt-4 text-xs leading-5 text-[#6B7280]">
        <T k="rentalYieldCalculatorDisclaimer" />
      </p>
    </section>
  );
}

function CurrencyField({
  currency,
  label,
  valueUsd,
  onChange,
}: {
  currency: "USD" | "HKD";
  label: string;
  valueUsd: number;
  onChange: (valueUsd: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="text-xs font-semibold text-[#A9851D]">{currency}</span>
      </span>
      <input
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal text-[#1F2937] outline-none transition focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        inputMode="decimal"
        min="0"
        step="1"
        type="number"
        value={Math.round(convertUsdToCurrency(valueUsd, currency))}
        onChange={(event) =>
          onChange(convertCurrencyToUsd(Number(event.target.value), currency))
        }
      />
    </label>
  );
}

function PercentField({
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
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="text-xs font-semibold text-[#A9851D]">%</span>
      </span>
      <input
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal text-[#1F2937] outline-none transition focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        inputMode="decimal"
        min="0"
        step="0.1"
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ResultCard({
  highlight = false,
  label,
  value,
}: {
  highlight?: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`rounded-sm border p-4 ${
        highlight
          ? "border-[#E7B93D] bg-[#FFF8E8]"
          : "border-[#ECE7DA] bg-[#FFFDF8]"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}
