"use client";

import { useMemo, useState } from "react";
import { DistrictInsightPanels } from "@/components/district-insight-panels";
import { PropertyCard } from "@/components/property-card";
import {
  PropertyFilter,
  type PropertyFilters,
  type PropertySortOption,
} from "@/components/property-filter";
import { formatUsd } from "@/lib/formatters";
import { getAverageYield, getLiquidityRank, getRiskRank } from "@/lib/property-metrics";
import type { BuyerGoal } from "@/data/buyer-goals";
import type { Property } from "@/types/property";

type PropertyInvestmentToolProps = {
  properties: Property[];
  buyerGoal?: BuyerGoal;
};

const defaultFilters: PropertyFilters = {
  city: "All",
  budget: "All",
  completionStatus: "All",
  riskRating: "All",
  rentalDemand: "All",
  ownership: "All",
  minScore: "All",
};

export function PropertyInvestmentTool({ properties, buyerGoal }: PropertyInvestmentToolProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    ...defaultFilters,
    ...buyerGoal?.filters,
  });
  const [sortBy, setSortBy] = useState<PropertySortOption>("score-desc");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => matchesFilters(property, filters))
      .sort((a, b) => sortProperties(a, b, sortBy));
  }, [properties, filters, sortBy]);

  const compareProperties = useMemo(
    () => properties.filter((property) => compareIds.includes(property.id)),
    [properties, compareIds],
  );

  function updateFilter<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleCompare(propertyId: string) {
    setCompareIds((current) => {
      if (current.includes(propertyId)) {
        return current.filter((id) => id !== propertyId);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, propertyId];
    });
  }

  function toggleShortlist(propertyId: string) {
    setShortlistIds((current) =>
      current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId],
    );
  }

  return (
    <div>
      {buyerGoal ? (
        <section className="mb-8 rounded-sm border border-[#d7bd7d]/60 bg-[#fffaf0] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
            Guided recommendation path
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-[#16231d]">
                {buyerGoal.title} recommendations
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5b645f]">{buyerGoal.summary}</p>
              <p className="mt-3 text-sm leading-7 text-[#5b645f]">{buyerGoal.whyItFits}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a817c]">
                Recommended districts
              </p>
              <div className="flex flex-wrap gap-2">
                {buyerGoal.recommendedDistricts.map((district) => (
                  <span
                    className="rounded-sm border border-[#d7bd7d]/60 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b4e18]"
                    key={district}
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <PropertyFilter
        filters={filters}
        resultCount={filteredProperties.length}
        sortBy={sortBy}
        totalCount={properties.length}
        onFilterChange={updateFilter}
        onReset={() => {
          setFilters({ ...defaultFilters, ...buyerGoal?.filters });
          setSortBy("score-desc");
        }}
        onSortChange={setSortBy}
      />

      <div className="mt-5 grid gap-4 rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm lg:grid-cols-3">
        <ToolMetric label="Selected for compare" value={`${compareIds.length}/3`} />
        <ToolMetric label="Saved shortlist" value={String(shortlistIds.length)} />
        <ToolMetric label="Top visible score" value={getTopScoreLabel(filteredProperties)} />
      </div>

      {compareProperties.length > 0 && (
        <ComparePanel
          properties={compareProperties}
          onRemove={(propertyId) =>
            setCompareIds((current) => current.filter((id) => id !== propertyId))
          }
        />
      )}

      <div className="mt-8">
        <DistrictInsightPanels city={filters.city === "All" ? undefined : filters.city} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProperties.map((property) => (
          <PropertyCard
            isCompared={compareIds.includes(property.id)}
            isCompareDisabled={compareIds.length >= 3}
            isShortlisted={shortlistIds.includes(property.id)}
            key={property.id}
            property={property}
            onCompareToggle={toggleCompare}
            onShortlistToggle={toggleShortlist}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="mt-8 rounded-sm border border-[#e1dbd0] bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-[#16231d]">No matching properties</h2>
          <p className="mt-3 text-sm leading-7 text-[#5b645f]">
            Adjust the investment filters to broaden the current mock property set.
          </p>
        </div>
      )}
    </div>
  );
}

function matchesFilters(property: Property, filters: PropertyFilters) {
  return (
    (filters.city === "All" || property.city === filters.city) &&
    matchesBudget(property.priceUsd, filters.budget) &&
    (filters.completionStatus === "All" ||
      property.completionStatus === filters.completionStatus) &&
    (filters.riskRating === "All" || property.riskRating === filters.riskRating) &&
    (filters.rentalDemand === "All" || property.rentalDemand === filters.rentalDemand) &&
    (filters.ownership === "All" || property.foreignOwnership === filters.ownership) &&
    (filters.minScore === "All" || property.investmentScore.total >= filters.minScore)
  );
}

function matchesBudget(priceUsd: number, budget: PropertyFilters["budget"]) {
  switch (budget) {
    case "under-200":
      return priceUsd < 200000;
    case "200-400":
      return priceUsd >= 200000 && priceUsd <= 400000;
    case "400-700":
      return priceUsd > 400000 && priceUsd <= 700000;
    case "700-plus":
      return priceUsd > 700000;
    case "All":
      return true;
  }
}

function sortProperties(a: Property, b: Property, sortBy: PropertySortOption) {
  switch (sortBy) {
    case "score-desc":
      return b.investmentScore.total - a.investmentScore.total;
    case "yield-desc":
      return getAverageYield(b.estimatedYield) - getAverageYield(a.estimatedYield);
    case "price-asc":
      return a.priceUsd - b.priceUsd;
    case "risk-asc":
      return getRiskRank(a.riskRating) - getRiskRank(b.riskRating);
    case "liquidity-desc":
      return getLiquidityRank(b.liquidity) - getLiquidityRank(a.liquidity);
    case "newest":
      return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
  }
}

function ToolMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-[#f3efe8] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#16231d]">{value}</p>
    </div>
  );
}

function ComparePanel({
  properties,
  onRemove,
}: {
  properties: Property[];
  onRemove: (propertyId: string) => void;
}) {
  const rows = [
    { label: "Price", getValue: (property: Property) => property.price },
    { label: "Estimated yield", getValue: (property: Property) => property.estimatedYield },
    {
      label: "Est. monthly rent",
      getValue: (property: Property) => formatUsd(property.roiDefaults.rentMonthlyUsd),
    },
    {
      label: "Investment score",
      getValue: (property: Property) => `${property.investmentScore.total.toFixed(1)} / 10`,
    },
    { label: "Risk rating", getValue: (property: Property) => property.riskRating },
    { label: "Liquidity", getValue: (property: Property) => property.liquidity },
    { label: "Rental demand", getValue: (property: Property) => property.rentalDemand },
    { label: "Developer quality", getValue: (property: Property) => property.developerQuality },
    {
      label: "Ownership eligibility",
      getValue: (property: Property) => property.foreignOwnership,
    },
    { label: "Best-for profile", getValue: (property: Property) => property.bestFor },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-[#e1dbd0] p-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
            Compare properties
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#16231d]">
            Side-by-side investment view
          </h2>
        </div>
        <p className="text-sm text-[#6d746f]">Select up to 3 properties</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#f3efe8] text-[#4f5a54]">
            <tr>
              <th className="w-48 px-5 py-4 font-semibold">Metric</th>
              {properties.map((property) => (
                <th className="px-5 py-4 font-semibold" key={property.id}>
                  <div className="flex items-start justify-between gap-3">
                    <span>{property.title}</span>
                    <button
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a3126]"
                      type="button"
                      onClick={() => onRemove(property.id)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee8de]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-5 py-4 font-semibold text-[#16231d]">{row.label}</td>
                {properties.map((property) => (
                  <td className="px-5 py-4 text-[#5b645f]" key={property.id}>
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

function getTopScoreLabel(properties: Property[]) {
  if (properties.length === 0) return "-";

  const topScore = Math.max(...properties.map((property) => property.investmentScore.total));

  return `${topScore.toFixed(1)} / 10`;
}
