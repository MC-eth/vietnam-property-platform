"use client";

import Link from "next/link";
import { Money } from "@/components/money";
import { T, TD } from "@/components/localized-text";
import { CompareIcon, HeartIcon } from "@/components/workspace-action-buttons";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  getUnitWorkspaceKey,
  useInvestmentWorkspace,
} from "@/context/investment-workspace-context";
import type { Project, ProjectUnit } from "@/types/project";
import type { ReactNode } from "react";

type AvailableUnitCardProps = {
  project: Project;
  unit: ProjectUnit;
};

export function AvailableUnitCard({ project, unit }: AvailableUnitCardProps) {
  const { t } = useAppPreferences();
  const {
    comparedUnitKeys,
    savedUnitKeys,
    toggleComparedUnit,
    toggleSavedUnit,
  } = useInvestmentWorkspace();
  const unitKey = getUnitWorkspaceKey(project.slug, unit.id);
  const isSaved = savedUnitKeys.includes(unitKey);
  const isCompared = comparedUnitKeys.includes(unitKey);

  return (
    <article className="premium-card group overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="premium-image absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${unit.unitImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/28 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[#F5C84C] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1F2937] shadow-sm">
          <T k="featured" />
        </span>
        <div className="absolute right-4 top-4 flex gap-3">
          <button
            aria-label={t("compare")}
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg leading-none shadow-sm backdrop-blur transition ${
              isCompared
                ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
                : "border-white/80 bg-white/92 text-[#1F2937] hover:border-[#F5C84C] hover:bg-[#FFF7D6]"
            }`}
            onClick={() => toggleComparedUnit(project.slug, unit.id)}
            title={t("compare")}
            type="button"
          >
            <CompareIcon />
          </button>
          <button
            aria-label={isSaved ? t("saved") : t("save")}
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-xl leading-none shadow-sm backdrop-blur transition ${
              isSaved
                ? "border-[#F5C84C] bg-[#F5C84C] text-[#1F2937] hover:bg-[#E7B93D]"
                : "border-white/80 bg-white/92 text-[#1F2937] hover:border-[#F5C84C] hover:bg-[#FFF7D6]"
            }`}
            onClick={() => toggleSavedUnit(project.slug, unit.id)}
            title={isSaved ? t("saved") : t("save")}
            type="button"
          >
            <HeartIcon filled={isSaved} />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          <TD value={project.projectName} /> · <TD value={project.district} />
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-tight text-[#1F2937]">
          <TD value={unit.unitType} />
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">
          <span className="font-semibold text-[#1F2937]">
            <T k="whyThisUnit" />
          </span>{" "}
          <TD value={unit.notes} />
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-base font-semibold text-[#667085]">
          <IconMetric
            icon={<BedIcon />}
            label={t("beds")}
            value={`${unit.bedrooms}`}
          />
          <IconMetric
            icon={<BathIcon />}
            label={t("baths")}
            value={`${unit.bathrooms}`}
          />
          <IconMetric
            icon={<SizeIcon />}
            label={t("size")}
            value={`${unit.sizeSqm} sqm`}
          />
        </div>

        <div className="mt-5 grid gap-3 border-t border-[#ECE7DA] pt-5">
          <Metric label={<T k="startingPrice" />} value={<Money usd={unit.priceUsd} />} strong />
          <Metric
            label={<T k="estimatedRent" />}
            value={
              <>
                <Money usd={unit.estimatedMonthlyRentUsd} />/<T k="perMonth" />
              </>
            }
          />
          <Metric label={<T k="estimatedYield" />} value={unit.estimatedGrossYield} />
        </div>
        <p className="mt-4 text-xs leading-5 text-[#6B7280]">
          <T k="unitLegalQuotaReviewNote" />
        </p>

        <Link
          className="premium-focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
          href={`/properties/${project.slug}/units/${unit.slug ?? unit.id}`}
        >
          <T k="viewUnitDetails" />
        </Link>

        <Link
          className="premium-focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-[#D8CDAF] bg-white px-4 text-sm font-semibold text-[#1F2937] hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
          href={`/enquiry?project=${project.slug}&unit=${unit.id}`}
        >
          <T k="enquire" />
        </Link>
      </div>
    </article>
  );
}

function IconMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-2" title={label}>
      <span className="text-[#667085]">{icon}</span>
      <span>{value}</span>
    </span>
  );
}

function Metric({
  label,
  value,
  strong = false,
}: {
  label: ReactNode;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-[#6B7280]">{label}</span>
      <span className={`text-right font-semibold ${strong ? "text-lg text-[#1F2937]" : "text-[#1F2937]"}`}>
        {value}
      </span>
    </div>
  );
}

function BedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      <path d="M3 11V6.5A2.5 2.5 0 0 1 5.5 4h3A2.5 2.5 0 0 1 11 6.5V11" />
      <path d="M13 11V7h5a3 3 0 0 1 3 3v1" />
      <path d="M3 20v-7h18v7" />
      <path d="M3 16h18" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      <path d="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Z" />
      <path d="M6 11V6.5A2.5 2.5 0 0 1 8.5 4H10" />
      <path d="M8 21v-2" />
      <path d="M16 21v-2" />
      <path d="M9 6h3" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M8 21H3v-5" />
      <path d="M16 21h5v-5" />
      <path d="M3 3l6 6" />
      <path d="M21 3l-6 6" />
      <path d="M3 21l6-6" />
      <path d="M21 21l-6-6" />
    </svg>
  );
}
