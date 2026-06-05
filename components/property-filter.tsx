"use client";

import {
  CITIES,
  FOREIGN_OWNERSHIP_STATUSES,
  PROPERTY_STATUSES,
} from "@/constants";
import { useAppPreferences } from "@/context/app-preferences-context";
import type {
  City,
  ForeignOwnershipStatus,
  PropertyStatus,
} from "@/types/property";
import type { PROPERTY_SORT_OPTIONS } from "@/constants";

export type PropertyFilters = {
  city: City;
  district: string | "All";
  completionStatus: PropertyStatus | "All";
  ownership: ForeignOwnershipStatus | "All";
};

export type PropertySortOption = (typeof PROPERTY_SORT_OPTIONS)[number]["value"];

const DISTRICT_LABEL_CONTEXT: Record<string, string> = {
  "Ben Nghe": "District 1",
  "Phu My Hung": "District 7",
  "Thao Dien": "District 2",
  "Thu Thiem": "Thu Duc City",
};

type PropertyFilterProps = {
  filters: PropertyFilters;
  districtOptions: string[];
  resultCount: number;
  totalCount: number;
  onFilterChange: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  onReset: () => void;
};

export function PropertyFilter({
  filters,
  districtOptions,
  resultCount,
  totalCount,
  onFilterChange,
  onReset,
}: PropertyFilterProps) {
  const { t, td } = useAppPreferences();

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
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
          className="min-h-11 rounded-sm border border-[#D8CDAF] bg-white px-4 text-sm font-semibold text-[#1F2937] transition hover:border-[#BFAF86]"
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
          options={CITIES.map((city) => ({ label: td(city), value: city }))}
        />
        <Select
          label={t("districts")}
          value={filters.district}
          onChange={(value) => onFilterChange("district", value as PropertyFilters["district"])}
          options={[
            { label: t("anyDistrict"), value: "All" },
            ...districtOptions.map((district) => ({
              label: getDistrictLabel(district, td),
              value: district,
            })),
          ]}
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
          label={t("foreignBuyerStatus")}
          value={filters.ownership}
          onChange={(value) =>
            onFilterChange("ownership", value as PropertyFilters["ownership"])
          }
          options={[
            { label: t("allPreScreened"), value: "All" },
            ...FOREIGN_OWNERSHIP_STATUSES.map((status) => ({ label: td(status), value: status })),
          ]}
        />
      </div>
    </section>
  );
}

function getDistrictLabel(
  district: string,
  td: ReturnType<typeof useAppPreferences>["td"],
) {
  const context = DISTRICT_LABEL_CONTEXT[district];

  if (!context) {
    return td(district);
  }

  return `${td(district)} (${td(context)})`;
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
