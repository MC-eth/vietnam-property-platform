"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { HeartIcon } from "@/components/workspace-action-buttons";
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
    <article className="group overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#D8CDAF] hover:shadow-md">
      <div
        className="relative aspect-[4/3] bg-cover bg-center"
        style={{ backgroundImage: `url('${property.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/28 via-transparent to-transparent" />
        {onShortlistToggle && (
          <button
            aria-label={isShortlisted ? t("saved") : t("save")}
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border text-xl leading-none shadow-sm backdrop-blur transition ${
              isShortlisted
                ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
                : "border-white/80 bg-white/90 text-[#1F2937] hover:border-[#F5C84C] hover:bg-[#FFF7D6]"
            }`}
            type="button"
            onClick={() => onShortlistToggle(property.id)}
          >
            <HeartIcon filled={isShortlisted} />
          </button>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
              {td(property.district)}
            </p>
            <h2 className="mt-2 text-lg font-semibold leading-tight text-[#1F2937]">
              {property.title}
            </h2>
          </div>
          <p className="shrink-0 text-right text-xl font-semibold leading-none text-[#1F2937]">
            {formatCurrencyFromUsd(property.priceUsd, currency)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#1F2937]">
            {td(property.bestFor)}
          </span>
          <span className="text-sm text-[#6B7280]">
            {t("yield")} {property.estimatedYield}
          </span>
        </div>

        {onCompareToggle && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              className={`min-h-10 rounded-sm border px-3 text-sm font-semibold transition ${
                isCompared
                  ? "border-[#F5C84C] bg-[#FFF7D6] text-[#1F2937]"
                  : "border-[#ECE7DA] text-[#6B7280] hover:border-[#F5C84C] hover:text-[#1F2937]"
              } ${isCompareDisabled && !isCompared ? "opacity-80" : ""}`}
              type="button"
              onClick={() => onCompareToggle(property.id)}
            >
              {isCompared ? t("selected") : t("compare")}
            </button>
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
            <DetailRow label={t("foreignBuyerStatus")} value={td(property.foreignOwnership)} />
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
