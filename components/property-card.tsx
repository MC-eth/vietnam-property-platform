"use client";

import Link from "next/link";
import { InvestmentScoreBadge } from "@/components/investment-score-badge";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
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
  const { currency, t, td } = useAppPreferences();
  const isHighRisk = property.riskRating === "Medium-high";

  return (
    <article className="group overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative min-h-60 bg-cover bg-center"
        style={{ backgroundImage: `url('${property.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/38 via-[#1F2937]/8 to-transparent" />
        <span className="absolute left-4 top-4 rounded-sm bg-white/94 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1F2937] shadow-sm">
          {td(property.city)}
        </span>
        <div className="absolute bottom-4 right-4">
          <InvestmentScoreBadge compact score={property.investmentScore} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-[#E7B93D]">{td(property.district)}</p>
        <div className="mt-2 flex items-start justify-between gap-5">
          <h2 className="text-xl font-semibold leading-tight text-[#1F2937]">
            {property.title}
          </h2>
          <p className="shrink-0 text-right text-2xl font-semibold leading-none text-[#1F2937]">
            {formatCurrencyFromUsd(property.priceUsd, currency)}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-sm bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]">
            {td(property.bestFor)}
          </span>
          <span className="text-sm font-semibold text-[#1F2937]">
            {t("yield")} {property.estimatedYield}
          </span>
          <span className="text-sm text-[#6B7280]">
            {t("rent")} {formatCurrencyFromUsd(property.roiDefaults.rentMonthlyUsd, currency)}/
            {t("perMonth")}
          </span>
        </div>

        {(onCompareToggle || onShortlistToggle) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {onCompareToggle && (
              <button
                className={`min-h-11 rounded-sm border px-4 text-sm font-semibold transition ${
                  isCompared
                    ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937]"
                    : "border-[#ECE7DA] text-[#6B7280] hover:border-[#F5C84C] hover:text-[#1F2937]"
                } disabled:cursor-not-allowed disabled:border-[#ECE7DA] disabled:text-[#a5aaa6]`}
                disabled={isCompareDisabled && !isCompared}
                type="button"
                onClick={() => onCompareToggle(property.id)}
              >
                {isCompared ? t("selected") : t("compare")}
              </button>
            )}
            {onShortlistToggle && (
              <button
                className={`min-h-11 rounded-sm border px-4 text-sm font-semibold transition ${
                  isShortlisted
                    ? "border-[#F5C84C] bg-[#FFFDF8] text-[#1F2937]"
                    : "border-[#ECE7DA] text-[#6B7280] hover:border-[#F5C84C] hover:text-[#1F2937]"
                }`}
                type="button"
                onClick={() => onShortlistToggle(property.id)}
              >
                {isShortlisted ? t("saved") : t("save")}
              </button>
            )}
          </div>
        )}

        <details className="mt-5 border-t border-[#ECE7DA] pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#6B7280] transition hover:text-[#1F2937]">
            {t("moreInvestmentDetails")}
          </summary>
          <div className="mt-4 grid gap-3 text-sm text-[#6B7280]">
            <DetailRow label={t("rentalDemand")} value={td(property.rentalDemand)} />
            <DetailRow label={t("exitLiquidity")} value={td(property.liquidity)} />
            <DetailRow label={t("developerQuality")} value={td(property.developerQuality)} />
            <DetailRow
              emphasis={isHighRisk ? "risk" : undefined}
              label={t("risk")}
              value={td(property.riskRating)}
            />
            <DetailRow label={t("ownership")} value={td(property.foreignOwnership)} />
            <DetailRow label={t("verifiedProject")} value={td(property.verifiedProject.level)} />
          </div>
        </details>

        <Link
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
          href={`/properties/${property.id}`}
        >
          {t("viewDetails")}
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
      <span className="text-[#6B7280]">{label}</span>
      <span className={`text-right font-semibold ${emphasis === "risk" ? "text-[#9b2f24]" : "text-[#1F2937]"}`}>
        {value}
      </span>
    </div>
  );
}
