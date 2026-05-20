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

const budgetOptions = [
  { label: "Any budget", value: "All" },
  { label: "Under USD 200k", value: "under-200" },
  { label: "USD 200k - 400k", value: "200-400" },
  { label: "USD 400k - 700k", value: "400-700" },
  { label: "USD 700k+", value: "700-plus" },
] as const;

export function PropertyFilter({
  filters,
  sortBy,
  resultCount,
  totalCount,
  onFilterChange,
  onSortChange,
  onReset,
}: PropertyFilterProps) {
  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
            Investment filters
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#16231d]">
            Screen Vietnam opportunities by investment criteria.
          </h2>
          <p className="mt-2 text-sm text-[#6d746f]">
            Showing {resultCount} of {totalCount} properties
          </p>
        </div>
        <button
          className="min-h-11 rounded-sm border border-[#123c2b] px-4 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
          type="button"
          onClick={onReset}
        >
          Reset filters
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Select
          label="City"
          value={filters.city}
          onChange={(value) => onFilterChange("city", value as PropertyFilters["city"])}
          options={[
            { label: "All cities", value: "All" },
            ...CITIES.map((city) => ({ label: city, value: city })),
          ]}
        />
        <Select
          label="Budget"
          value={filters.budget}
          onChange={(value) => onFilterChange("budget", value as PropertyFilters["budget"])}
          options={budgetOptions}
        />
        <Select
          label="Completion status"
          value={filters.completionStatus}
          onChange={(value) =>
            onFilterChange("completionStatus", value as PropertyFilters["completionStatus"])
          }
          options={[
            { label: "Any status", value: "All" },
            ...PROPERTY_STATUSES.map((status) => ({ label: status, value: status })),
          ]}
        />
        <Select
          label="Risk rating"
          value={filters.riskRating}
          onChange={(value) =>
            onFilterChange("riskRating", value as PropertyFilters["riskRating"])
          }
          options={[
            { label: "Any risk", value: "All" },
            ...RISK_RATINGS.map((rating) => ({ label: rating, value: rating })),
          ]}
        />
        <Select
          label="Rental demand"
          value={filters.rentalDemand}
          onChange={(value) =>
            onFilterChange("rentalDemand", value as PropertyFilters["rentalDemand"])
          }
          options={[
            { label: "Any demand", value: "All" },
            ...INVESTMENT_RATINGS.map((rating) => ({ label: rating, value: rating })),
          ]}
        />
        <Select
          label="Ownership eligibility"
          value={filters.ownership}
          onChange={(value) =>
            onFilterChange("ownership", value as PropertyFilters["ownership"])
          }
          options={[
            { label: "Any ownership", value: "All" },
            ...FOREIGN_OWNERSHIP_STATUSES.map((status) => ({ label: status, value: status })),
          ]}
        />
        <Select
          label="Minimum score"
          value={String(filters.minScore)}
          onChange={(value) =>
            onFilterChange("minScore", value === "All" ? "All" : Number(value))
          }
          options={[
            { label: "Any score", value: "All" },
            ...MIN_INVESTMENT_SCORE_OPTIONS.map((score) => ({
              label: `${score}+ / 10`,
              value: String(score),
            })),
          ]}
        />
        <Select
          label="Sort by"
          value={sortBy}
          onChange={(value) => onSortChange(value as PropertySortOption)}
          options={PROPERTY_SORT_OPTIONS}
        />
      </div>
    </section>
  );
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
    <label className="grid gap-2 text-sm font-semibold text-[#4f5a54]">
      {label}
      <select
        className="min-h-11 rounded-sm border border-[#d8d1c5] bg-white px-3 font-normal outline-none focus:border-[#123c2b] focus:ring-2 focus:ring-[#123c2b]/15"
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
