"use client";

import {
  CITIES,
  FOREIGN_OWNERSHIP_STATUSES,
  PROPERTY_STATUSES,
} from "@/constants";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { ProjectFilters } from "@/types/project";

const DISTRICT_LABEL_CONTEXT: Record<string, string> = {
  "Ben Nghe": "CBD",
  "Phu My Hung": "Phu My Hung",
  "Thao Dien": "District 2",
  "Thu Duc": "District 9 Growth Corridor",
  "Thu Thiem": "District 2",
};

type ProjectFilterProps = {
  filters: ProjectFilters;
  districtOptions: string[];
  districtLabelOverrides?: Record<string, string>;
  resultCount: number;
  totalCount: number;
  onFilterChange: <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => void;
  onReset: () => void;
};

export function ProjectFilter({
  filters,
  districtOptions,
  districtLabelOverrides = {},
  resultCount,
  totalCount,
  onFilterChange,
  onReset,
}: ProjectFilterProps) {
  const { currency, t, td } = useAppPreferences();
  const currentDistrictOption =
    filters.district !== "All" && !districtOptions.includes(filters.district)
      ? [filters.district]
      : [];

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            {t("investmentFilters")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
            {t("projectFiltersDescription")}
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            {t("showingProjects", { resultCount, totalCount })}
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
          onChange={(value) => onFilterChange("city", value as ProjectFilters["city"])}
          options={CITIES.map((city) => ({ label: td(city), value: city }))}
        />
        <Select
          label={t("districts")}
          value={filters.district}
          onChange={(value) => onFilterChange("district", value as ProjectFilters["district"])}
          options={[
            { label: t("anyDistrict"), value: "All" },
            ...currentDistrictOption.map((district) => ({
              label: districtLabelOverrides[district] ?? getDistrictLabel(district, td),
              value: district,
            })),
            ...districtOptions.map((district) => ({
              label: districtLabelOverrides[district] ?? getDistrictLabel(district, td),
              value: district,
            })),
          ]}
        />
        <Select
          label={t("completionStatus")}
          value={filters.completionStatus}
          onChange={(value) =>
            onFilterChange("completionStatus", value as ProjectFilters["completionStatus"])
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
            onFilterChange("ownership", value as ProjectFilters["ownership"])
          }
          options={[
            { label: t("allPreScreened"), value: "All" },
            ...FOREIGN_OWNERSHIP_STATUSES.map((status) => ({ label: td(status), value: status })),
          ]}
        />
        <Select
          label={t("budget")}
          value={filters.budget}
          onChange={(value) => onFilterChange("budget", value as ProjectFilters["budget"])}
          options={[
            { label: t("anyBudget"), value: "All" },
            {
              label: t("budgetUnder", {
                amount: formatCurrencyFromUsd(200000, currency),
              }),
              value: "under-200k",
            },
            {
              label: t("budgetBetween", {
                minimum: formatCurrencyFromUsd(200000, currency),
                maximum: formatCurrencyFromUsd(400000, currency),
              }),
              value: "200k-400k",
            },
            {
              label: t("budgetAbove", {
                amount: formatCurrencyFromUsd(400000, currency),
              }),
              value: "400k-plus",
            },
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

  if (district === "Ben Nghe") {
    return td("District 1 (CBD)");
  }

  if (district === "Phu My Hung") {
    return td("District 7 / Phu My Hung");
  }

  if (district === "Thu Duc") {
    return td("Thu Duc City / District 9 Growth Corridor");
  }

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
