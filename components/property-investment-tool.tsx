"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import {
  PropertyFilter,
  type PropertyFilters,
  type PropertySortOption,
} from "@/components/property-filter";
import { useAppPreferences } from "@/context/app-preferences-context";
import { PROPERTY_SORT_OPTIONS } from "@/constants";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { useInvestmentWorkspace } from "@/context/investment-workspace-context";
import type { BuyerGoal } from "@/data/buyer-goals";
import type { Property } from "@/types/property";

type PropertyInvestmentToolProps = {
  properties: Property[];
  buyerGoal?: BuyerGoal;
};

const defaultFilters: PropertyFilters = {
  city: "Ho Chi Minh City",
  district: "All",
  completionStatus: "All",
  ownership: "All",
};

export function PropertyInvestmentTool({ properties, buyerGoal }: PropertyInvestmentToolProps) {
  const { currency, t, td } = useAppPreferences();
  const {
    comparedProjectIds,
    removeComparedProject,
    savedResidenceIds,
    toggleComparedProject,
    toggleSavedResidence,
  } = useInvestmentWorkspace();
  const [filters, setFilters] = useState<PropertyFilters>({
    ...defaultFilters,
    ...buyerGoal?.filters,
  });
  const [sortBy, setSortBy] = useState<PropertySortOption>("newest-listed");

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => matchesFilters(property, filters))
      .sort((a, b) => sortProperties(a, b, sortBy));
  }, [properties, filters, sortBy]);

  const compareProperties = useMemo(
    () => properties.filter((property) => comparedProjectIds.includes(property.id)),
    [properties, comparedProjectIds],
  );
  const districtOptions = useMemo(
    () =>
      Array.from(
        new Set(
          properties
            .filter((property) => property.city === filters.city)
            .map((property) => property.district),
        ),
      ).sort(),
    [properties, filters.city],
  );

  function updateFilter<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    setFilters((current) => {
      if (key === "city") {
        return { ...current, city: value as PropertyFilters["city"], district: "All" };
      }

      return { ...current, [key]: value };
    });
  }

  return (
    <div>
      {buyerGoal ? (
        <section className="mb-10 rounded-sm border border-[#ECE7DA] bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            {t("guidedRecommendationPath")}
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-[#1F2937]">
                {td(buyerGoal.title)} {t("recommendations")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(buyerGoal.summary)}</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(buyerGoal.whyItFits)}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                {t("recommendedDistricts")}
              </p>
              <div className="flex flex-wrap gap-2">
                {buyerGoal.recommendedDistricts.map((district) => (
                  <span
                    className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]"
                    key={district}
                  >
                    {td(district)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <PropertyFilter
        filters={filters}
        districtOptions={districtOptions}
        resultCount={filteredProperties.length}
        totalCount={properties.length}
        onFilterChange={updateFilter}
        onReset={() => {
          setFilters({ ...defaultFilters, ...buyerGoal?.filters });
          setSortBy("newest-listed");
        }}
      />

      {compareProperties.length > 0 && (
        <ComparePanel
          currency={currency}
          properties={compareProperties}
          t={t}
          td={td}
          onRemove={removeComparedProject}
        />
      )}

      <div className="mt-10 flex justify-end">
        <SortControl sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProperties.map((property) => (
          <PropertyCard
            isCompared={comparedProjectIds.includes(property.id)}
            isCompareDisabled={comparedProjectIds.length >= 3}
            isShortlisted={savedResidenceIds.includes(property.id)}
            key={property.id}
            property={property}
            onCompareToggle={toggleComparedProject}
            onShortlistToggle={toggleSavedResidence}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="mt-8 rounded-sm border border-[#ECE7DA] bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-[#1F2937]">{t("noPropertiesFound")}</h2>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">
            {t("noPropertiesFoundDescription")}
          </p>
        </div>
      )}
    </div>
  );
}

function matchesFilters(property: Property, filters: PropertyFilters) {
  return (
    property.city === filters.city &&
    (filters.district === "All" || property.district === filters.district) &&
    (filters.completionStatus === "All" ||
      property.completionStatus === filters.completionStatus) &&
    (filters.ownership === "All" || property.foreignOwnership === filters.ownership)
  );
}

function sortProperties(a: Property, b: Property, sortBy: PropertySortOption) {
  switch (sortBy) {
    case "newest-listed":
      return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    case "oldest-listed":
      return new Date(a.listedAt).getTime() - new Date(b.listedAt).getTime();
    case "price-asc":
      return a.priceUsd - b.priceUsd;
    case "price-desc":
      return b.priceUsd - a.priceUsd;
  }
}

function SortControl({
  sortBy,
  onSortChange,
}: {
  sortBy: PropertySortOption;
  onSortChange: (value: PropertySortOption) => void;
}) {
  const { t } = useAppPreferences();

  return (
    <label className="grid w-full gap-2 text-sm font-semibold text-[#6B7280] sm:w-64">
      {t("sortBy")}
      <select
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal text-[#1F2937] outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as PropertySortOption)}
      >
        {PROPERTY_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {getSortLabel(option.value, t)}
          </option>
        ))}
      </select>
    </label>
  );
}

function getSortLabel(value: PropertySortOption, t: ReturnType<typeof useAppPreferences>["t"]) {
  switch (value) {
    case "newest-listed":
      return t("newestListed");
    case "oldest-listed":
      return t("oldestListed");
    case "price-asc":
      return t("lowestPrice");
    case "price-desc":
      return t("highestPrice");
  }
}

function ComparePanel({
  currency,
  properties,
  t,
  td,
  onRemove,
}: {
  currency: "USD" | "HKD";
  properties: Property[];
  t: ReturnType<typeof useAppPreferences>["t"];
  td: ReturnType<typeof useAppPreferences>["td"];
  onRemove: (propertyId: string) => void;
}) {
  const rows = [
    { label: t("price"), getValue: (property: Property) => formatCurrencyFromUsd(property.priceUsd, currency) },
    { label: t("estimatedRentalYield"), getValue: (property: Property) => property.estimatedYield },
    {
      label: t("estimatedMonthlyRent"),
      getValue: (property: Property) => formatCurrencyFromUsd(property.roiDefaults.rentMonthlyUsd, currency),
    },
    { label: t("riskRating"), getValue: (property: Property) => td(property.riskRating) },
    { label: t("liquidity"), getValue: (property: Property) => td(property.liquidity) },
    { label: t("rentalDemand"), getValue: (property: Property) => td(property.rentalDemand) },
    { label: t("developerQuality"), getValue: (property: Property) => td(property.developerQuality) },
    {
      label: t("foreignBuyerStatus"),
      getValue: (property: Property) => td(property.foreignOwnership),
    },
    { label: t("bestFor"), getValue: (property: Property) => td(property.bestFor) },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-[#ECE7DA] p-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
            {t("compareProperties")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
            {t("sideBySideInvestmentView")}
          </h2>
        </div>
        <p className="text-sm text-[#6B7280]">{t("comparePropertiesHelp")}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#FFFDF8] text-[#6B7280]">
            <tr>
              <th className="w-48 px-5 py-4 font-semibold">{t("metric")}</th>
              {properties.map((property) => (
                <th className="px-5 py-4 font-semibold" key={property.id}>
                  <div className="flex items-start justify-between gap-3">
                    <span>{property.title}</span>
                    <button
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a3126]"
                      type="button"
                      onClick={() => onRemove(property.id)}
                    >
                      {t("remove")}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE7DA]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-5 py-4 font-semibold text-[#1F2937]">{row.label}</td>
                {properties.map((property) => (
                  <td className="px-5 py-4 text-[#6B7280]" key={property.id}>
                    {row.getValue(property)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
