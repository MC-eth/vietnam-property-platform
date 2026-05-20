"use client";

import Link from "next/link";
import { InvestmentScoreBadge } from "@/components/investment-score-badge";
import { formatUsd } from "@/lib/formatters";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
  isCompared?: boolean;
  isCompareDisabled?: boolean;
  isShortlisted?: boolean;
  onCompareToggle?: (propertyId: string) => void;
  onShortlistToggle?: (propertyId: string) => void;
};

export function PropertyCard({
  property,
  isCompared = false,
  isCompareDisabled = false,
  isShortlisted = false,
  onCompareToggle,
  onShortlistToggle,
}: PropertyCardProps) {
  const isHighRisk = property.riskRating === "Medium-high";

  return (
    <article className="group overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative min-h-60 bg-cover bg-center"
        style={{ backgroundImage: `url('${property.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f18]/72 via-[#0f1f18]/12 to-transparent" />
        <span className="absolute left-4 top-4 rounded-sm bg-white/94 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#123c2b] shadow-sm">
          {property.city}
        </span>
        <div className="absolute bottom-4 right-4">
          <InvestmentScoreBadge compact score={property.investmentScore} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-[#a47d32]">{property.district}</p>
        <div className="mt-2 flex items-start justify-between gap-5">
          <h2 className="text-xl font-semibold leading-tight text-[#16231d]">
            {property.title}
          </h2>
          <p className="shrink-0 text-right text-2xl font-semibold leading-none text-[#123c2b]">
            {property.price.replace("USD ", "$")}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-sm bg-[#f3efe8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b4e18]">
            {property.bestFor}
          </span>
          <span className="text-sm font-semibold text-[#16231d]">
            Yield {property.estimatedYield}
          </span>
          <span className="text-sm text-[#6d746f]">
            Rent {formatUsd(property.roiDefaults.rentMonthlyUsd)}/mo
          </span>
        </div>

        {(onCompareToggle || onShortlistToggle) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {onCompareToggle && (
              <button
                className={`min-h-11 rounded-sm border px-4 text-sm font-semibold transition ${
                  isCompared
                    ? "border-[#123c2b] bg-[#123c2b] text-white"
                    : "border-[#d8d1c5] text-[#4f5a54] hover:border-[#123c2b] hover:text-[#123c2b]"
                } disabled:cursor-not-allowed disabled:border-[#e1dbd0] disabled:text-[#a5aaa6]`}
                disabled={isCompareDisabled && !isCompared}
                type="button"
                onClick={() => onCompareToggle(property.id)}
              >
                {isCompared ? "Selected" : "Compare"}
              </button>
            )}
            {onShortlistToggle && (
              <button
                className={`min-h-11 rounded-sm border px-4 text-sm font-semibold transition ${
                  isShortlisted
                    ? "border-[#d7bd7d] bg-[#fff8e8] text-[#6b4e18]"
                    : "border-[#d8d1c5] text-[#4f5a54] hover:border-[#123c2b] hover:text-[#123c2b]"
                }`}
                type="button"
                onClick={() => onShortlistToggle(property.id)}
              >
                {isShortlisted ? "Saved" : "Save"}
              </button>
            )}
          </div>
        )}

        <details className="mt-5 border-t border-[#eee8de] pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#4f5a54] transition hover:text-[#123c2b]">
            More investment details
          </summary>
          <div className="mt-4 grid gap-3 text-sm text-[#5b645f]">
            <DetailRow label="Rental demand" value={property.rentalDemand} />
            <DetailRow label="Exit liquidity" value={property.liquidity} />
            <DetailRow label="Developer quality" value={property.developerQuality} />
            <DetailRow
              emphasis={isHighRisk ? "risk" : undefined}
              label="Risk"
              value={property.riskRating}
            />
            <DetailRow label="Ownership" value={property.foreignOwnership} />
            <DetailRow label="Verification" value={property.verifiedProject.level} />
          </div>
        </details>

        <Link
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#123c2b] px-4 text-sm font-semibold text-white transition hover:bg-[#0d2d20]"
          href={`/properties/${property.id}`}
        >
          View Investment Case
        </Link>
      </div>
    </article>
  );
}

function DetailRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: "risk";
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#7a817c]">{label}</span>
      <span className={`text-right font-semibold ${emphasis === "risk" ? "text-[#9b2f24]" : "text-[#16231d]"}`}>
        {value}
      </span>
    </div>
  );
}
