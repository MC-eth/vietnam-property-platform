"use client";

import {
  CITIES,
  FOREIGN_OWNERSHIP_STATUSES,
  INVESTMENT_RATINGS,
  MIN_INVESTMENT_SCORE_OPTIONS,
  PROPERTY_SORT_OPTIONS,
  PROPERTY_STATUSES,
  RISK_RATINGS,
} from "@/constants";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type {
  City,
  ForeignOwnershipStatus,
  InvestmentRating,
  PropertyStatus,
  RiskRating,
} from "@/types/property";

export type PropertyFilters = {
  city: City | "All";
  budget: "All" | "under-200" | "200-400" | "400-700" | "700-plus";
  completionStatus: PropertyStatus | "All";
  riskRating: RiskRating | "All";
  rentalDemand: InvestmentRating | "All";
  ownership: ForeignOwnershipStatus | "All";
  minScore: number | "All";
};

export type PropertySortOption = (typeof PROPERTY_SORT_OPTIONS)[number]["value"];

type PropertyFilterProps = {
  filters: PropertyFilters;
  sortBy: PropertySortOption;
  resultCount: number;
  totalCount: number;
  onFilterChange: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  onSortChange: (value: PropertySortOption) => void;
  onReset: () => void;
};

export function PropertyFilter({
  filters,
  sortBy,
  resultCount,
  totalCount,
  onFilterChange,
  onSortChange,
  onReset,
}: PropertyFilterProps) {
  const { currency, t, td } = useAppPreferences();
  const budgetOptions = [
    { label: t("anyBudget"), value: "All" },
    { label: `${t("under")} ${formatCurrencyFromUsd(200000, currency)}`, value: "under-200" },
    {
      label: `${formatCurrencyFromUsd(200000, currency)} - ${formatCurrencyFromUsd(400000, currency)}`,
      value: "200-400",
    },
    {
      label: `${formatCurrencyFromUsd(400000, currency)} - ${formatCurrencyFromUsd(700000, currency)}`,
      value: "400-700",
    },
    { label: `${formatCurrencyFromUsd(700000, currency)}+`, value: "700-plus" },
  ] as const;

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
            {t("investmentFilters")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
            {t("filtersDescription")}
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            {t("showingProperties", { resultCount, totalCount })}
          </p>
        </div>
        <button
          className="min-h-11 rounded-sm border border-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
          type="button"
          onClick={onReset}
        >
          {t("clearFilters")}
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Select
          label={t("city")}
          value={filters.city}
          onChange={(value) => onFilterChange("city", value as PropertyFilters["city"])}
          options={[
            { label: t("allCities"), value: "All" },
            ...CITIES.map((city) => ({ label: td(city), value: city })),
          ]}
        />
        <Select
          label={t("budget")}
          value={filters.budget}
          onChange={(value) => onFilterChange("budget", value as PropertyFilters["budget"])}
          options={budgetOptions}
        />
        <Select
          label={t("completionStatus")}
          value={filters.completionStatus}
          onChange={(value) =>
            onFilterChange("completionStatus", value as PropertyFilters["completionStatus"])
          }
          options={[
            { label: t("anyStatus"), value: "All" },
            ...PROPERTY_STATUSES.map((status) => ({ label: td(status), value: status })),
          ]}
        />
        <Select
          label={t("riskRating")}
          value={filters.riskRating}
          onChange={(value) =>
            onFilterChange("riskRating", value as PropertyFilters["riskRating"])
          }
          options={[
            { label: t("anyRisk"), value: "All" },
            ...RISK_RATINGS.map((rating) => ({ label: td(rating), value: rating })),
          ]}
        />
        <Select
          label={t("rentalDemand")}
          value={filters.rentalDemand}
          onChange={(value) =>
            onFilterChange("rentalDemand", value as PropertyFilters["rentalDemand"])
          }
          options={[
            { label: t("anyDemand"), value: "All" },
            ...INVESTMENT_RATINGS.map((rating) => ({ label: td(rating), value: rating })),
          ]}
        />
        <Select
          label={t("ownershipEligibility")}
          value={filters.ownership}
          onChange={(value) =>
            onFilterChange("ownership", value as PropertyFilters["ownership"])
          }
          options={[
            { label: t("anyOwnership"), value: "All" },
            ...FOREIGN_OWNERSHIP_STATUSES.map((status) => ({ label: td(status), value: status })),
          ]}
        />
        <Select
          label={t("investmentScore")}
          value={String(filters.minScore)}
          onChange={(value) =>
            onFilterChange("minScore", value === "All" ? "All" : Number(value))
          }
          options={[
            { label: t("anyScore"), value: "All" },
            ...MIN_INVESTMENT_SCORE_OPTIONS.map((score) => ({
              label: `${score}+ / 10`,
              value: String(score),
            })),
          ]}
        />
        <Select
          label={t("sortBy")}
          value={sortBy}
          onChange={(value) => onSortChange(value as PropertySortOption)}
          options={PROPERTY_SORT_OPTIONS.map((option) => ({
            label: getSortLabel(option.value, t),
            value: option.value,
          }))}
        />
      </div>
    </section>
  );
}

function getSortLabel(value: PropertySortOption, t: ReturnType<typeof useAppPreferences>["t"]) {
  switch (value) {
    case "score-desc":
      return t("highestInvestmentScore");
    case "yield-desc":
      return t("highestYield");
    case "price-asc":
      return t("lowestPrice");
    case "risk-asc":
      return t("lowestRisk");
    case "liquidity-desc":
      return t("bestLiquidity");
    case "newest":
      return t("newest");
  }
}

type SelectOption = {
  label: string;
  value: string;
};

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
      {label}
      <select
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
