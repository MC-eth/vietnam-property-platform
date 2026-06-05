"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { CompareIcon, HeartIcon } from "@/components/workspace-action-buttons";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  variant?: "default" | "homepage";
  isCompared?: boolean;
  isCompareDisabled?: boolean;
  isShortlisted?: boolean;
  onCompareToggle?: (projectId: string) => void;
  onShortlistToggle?: (projectId: string) => void;
};

export function ProjectCard({
  project,
  variant = "default",
  isCompared = false,
  isCompareDisabled = false,
  isShortlisted = false,
  onCompareToggle,
  onShortlistToggle,
}: ProjectCardProps) {
  const { currency, t, td } = useAppPreferences();
  const startingPrice = Math.min(...project.availableUnits.map((unit) => unit.priceUsd));
  const isHomepage = variant === "homepage";

  return (
    <article className="premium-card group overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="premium-image absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/36 via-transparent to-transparent" />
        {onCompareToggle ? (
          <button
            aria-label={isCompared ? t("selected") : t("compare")}
            className={`absolute right-[4.75rem] top-4 flex h-11 w-11 items-center justify-center rounded-full border text-lg font-semibold leading-none shadow-sm backdrop-blur transition ${
              isCompared
                ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
                : "border-white/80 bg-white/90 text-[#1F2937] hover:border-[#F5C84C] hover:bg-[#FFF7D6]"
            } ${isCompareDisabled && !isCompared ? "opacity-80" : ""}`}
            title={isCompared ? t("selected") : t("compare")}
            type="button"
            onClick={() => onCompareToggle(project.id)}
          >
            <CompareIcon />
          </button>
        ) : null}
        {onShortlistToggle ? (
          <button
            aria-label={isShortlisted ? t("saved") : t("save")}
            className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border text-xl leading-none shadow-sm backdrop-blur transition ${
              isShortlisted
                ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
                : "border-white/80 bg-white/90 text-[#1F2937] hover:border-[#F5C84C] hover:bg-[#FFF7D6]"
            }`}
            type="button"
            onClick={() => onShortlistToggle(project.id)}
          >
            <HeartIcon filled={isShortlisted} />
          </button>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/86">
              {td(project.district)} · {td(project.city)}
            </p>
            {!isHomepage ? (
              <p className="mt-1 text-xl font-semibold text-white drop-shadow-sm">
                {td(project.projectName)}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className={isHomepage ? "p-5" : "p-5 sm:p-6"}>
        <div className="flex items-start justify-between gap-5">
          <div>
            {!isHomepage ? (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                {td(project.developer)}
              </p>
            ) : null}
            <h2 className={isHomepage ? "text-xl font-semibold leading-tight text-[#1F2937]" : "mt-2 text-xl font-semibold leading-tight text-[#1F2937]"}>
              {td(project.projectName)}
            </h2>
          </div>
          {!isHomepage ? (
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                {t("startingPrice")}
              </p>
              <p className="mt-1 text-lg font-semibold leading-none text-[#1F2937]">
                {formatCurrencyFromUsd(startingPrice, currency)}
              </p>
            </div>
          ) : null}
        </div>

        <div className={isHomepage ? "mt-5 grid gap-3 sm:grid-cols-3" : "mt-5 grid gap-3 sm:grid-cols-2"}>
          <CardMetric label={t("startingPrice")} value={formatCurrencyFromUsd(startingPrice, currency)} />
          <CardMetric label={t("yieldRange")} value={project.averageYieldRange} />
          <CardMetric
            label={t("availableUnits")}
            value={t("availableUnitCount", { count: project.availableUnits.length })}
          />
          {!isHomepage ? (
            <>
              <CardMetric label={t("developer")} value={td(project.developer)} />
              <CardMetric label={t("yearBuilt")} value={project.yearBuilt} />
            </>
          ) : null}
        </div>

        {isHomepage ? (
          <div className="mt-4">
            <span
              className="inline-flex rounded-full border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#4B5563]"
            >
              {t("foreignBuyerStatus")}: {td(project.foreignOwnershipStatus)}
            </span>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.targetBuyerTypes.slice(0, 3).map((buyerType) => (
              <span
                className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#1F2937]"
                key={buyerType}
              >
                {td(buyerType)}
              </span>
            ))}
          </div>
        )}

        {!isHomepage ? (
          <div className="mt-5 grid gap-3 border-t border-[#ECE7DA] pt-5 text-sm text-[#6B7280]">
            <DetailRow label={t("projectType")} value={td(project.projectType)} />
            <DetailRow label={t("completionStatus")} value={td(project.completionStatus)} />
            <DetailRow label={t("foreignBuyerStatus")} value={td(project.foreignOwnershipStatus)} />
            <DetailRow label={t("rentalDemand")} value={td(project.rentalDemand)} />
          </div>
        ) : null}

        <Link
          className="premium-focus-ring mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
          href={`/properties/${project.slug}`}
        >
          {t("viewProjectDetails")}
        </Link>
      </div>
    </article>
  );
}

function CardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-[#FFFDF8] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-semibold text-[#1F2937]">{value}</span>
    </div>
  );
}
