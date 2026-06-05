"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/workspace-action-buttons";
import type { TranslationKey } from "@/constants/translations";
import { useAppPreferences } from "@/context/app-preferences-context";
import { useInvestmentWorkspace } from "@/context/investment-workspace-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { Project } from "@/types/project";

type ProjectComparePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
};

export function ProjectComparePanel({ isOpen, onClose, projects }: ProjectComparePanelProps) {
  const { currency, t, td } = useAppPreferences();
  const [showMore, setShowMore] = useState(false);
  const { comparedProjectIds, removeComparedProject } = useInvestmentWorkspace();
  const selectedProjects = comparedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || selectedProjects.length === 0) return null;

  return (
    <div
      aria-label={t("compareProjects")}
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#1F2937]/25 px-0 pt-14 backdrop-blur-[2px] sm:items-center sm:px-5 sm:py-8"
      role="dialog"
    >
      <button
        aria-label={t("close")}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <section className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-lg border border-[#ECE7DA] bg-[#FFFDF8] shadow-2xl sm:max-h-[88vh] sm:rounded-sm">
        <div className="flex items-start justify-between gap-4 border-b border-[#ECE7DA] bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
              {t("quickComparison")}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#1F2937] sm:text-2xl">{t("compareProjects")}</h2>
          </div>
          <button
            aria-label={t("close")}
            className="premium-focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ECE7DA] bg-white text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
            onClick={onClose}
            title={t("close")}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-sm text-[#6B7280]">{t("projectsSelected", { count: selectedProjects.length })}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {selectedProjects.map((project) => (
              <ProjectSummaryCard key={project.id} onRemove={removeComparedProject} project={project} />
            ))}
            {Array.from({ length: 3 - selectedProjects.length }, (_, index) => (
              <EmptySlot key={index} label={t("addAnotherProjectToCompare")} />
            ))}
          </div>

          {selectedProjects.length >= 2 ? (
            <div className="mt-5 grid gap-3">
              <ComparisonGroup
                projects={selectedProjects}
                rows={[
                  { label: "project", value: (project) => project.projectName },
                  { label: "districtLocation", value: getDistrictLocation },
                  { highlight: true, label: "startingPrice", value: (project) => formatCurrencyFromUsd(getStartingPrice(project), currency) },
                  { highlight: true, label: "pricePerSqm", value: (project) => formatCurrencyFromUsd(getPricePerSqm(project), currency) },
                  { label: "availableUnits", value: (project) => t("availableUnitCount", { count: project.availableUnitsCount ?? project.availableUnits.length }) },
                  { highlight: true, label: "yieldRange", value: (project) => project.averageYieldRange },
                ]}
              />

              {showMore ? (
                <ComparisonGroup
                  projects={selectedProjects}
                  rows={[
                    { label: "developer", value: (project) => project.developer },
                    { label: "completionStatusYear", value: (project) => `${td(project.completionStatus)} · ${project.yearBuilt}` },
                    { label: "rentalDemand", value: (project) => td(project.rentalDemand) },
                    { label: "foreignBuyerStatus", value: (project) => td(project.foreignOwnershipStatus) },
                    { label: "resaleAppeal", value: getResaleAppeal },
                    { label: "bestFor", value: (project) => project.targetBuyerTypes.map(td).join(" · ") },
                    { label: "keyWatchpoints", value: (project) => (project.keyRisks[0] ? td(project.keyRisks[0]) : "—") },
                  ]}
                />
              ) : null}

              <button
                className="premium-focus-ring min-h-11 rounded-sm border border-[#D8CDAF] bg-white px-4 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
                onClick={() => setShowMore((current) => !current)}
                type="button"
              >
                {t(showMore ? "showLess" : "viewMore")}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ProjectSummaryCard({
  onRemove,
  project,
}: {
  onRemove: (projectId: string) => void;
  project: Project;
}) {
  const { t, td } = useAppPreferences();

  return (
    <article className="grid grid-cols-[88px_1fr] overflow-hidden rounded-sm border border-[#ECE7DA] bg-white">
      <div className="bg-cover bg-center" style={{ backgroundImage: `url('${project.heroImage}')` }} />
      <div className="relative min-w-0 p-3 pr-11">
        <button
          aria-label={t("removeFromComparison")}
          className="premium-focus-ring absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#ECE7DA] bg-white text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
          onClick={() => onRemove(project.id)}
          title={t("removeFromComparison")}
          type="button"
        >
          <CloseIcon />
        </button>
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">{td(project.district)}</p>
        <h3 className="mt-1 truncate text-sm font-semibold text-[#1F2937]">{td(project.projectName)}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="premium-focus-ring text-xs font-semibold text-[#8A6A16] hover:text-[#1F2937]" href={`/properties/${project.slug}`}>
            {t("viewProject")}
          </Link>
          <Link className="premium-focus-ring text-xs font-semibold text-[#6B7280] hover:text-[#1F2937]" href={`/properties/${project.slug}#available-units`}>
            {t("viewUnits")}
          </Link>
        </div>
      </div>
    </article>
  );
}

function ComparisonGroup({
  projects,
  rows,
}: {
  projects: Project[];
  rows: { highlight?: boolean; label: TranslationKey; value: (project: Project) => string }[];
}) {
  const { t, td } = useAppPreferences();

  return (
    <div className="overflow-x-auto rounded-sm border border-[#ECE7DA] bg-white">
      <div className="min-w-[680px]">
        {rows.map((row) => (
          <div className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] border-b border-[#ECE7DA] px-4 py-3 last:border-b-0" key={row.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{t(row.label)}</p>
            {projects.map((project) => (
              <p className={`text-sm leading-5 ${row.highlight ? "font-semibold text-[#A9851D]" : "text-[#4B5563]"}`} key={project.id}>
                {td(row.value(project))}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-24 items-center justify-center rounded-sm border border-dashed border-[#D8CDAF] bg-white/60 p-4 text-center text-xs font-semibold leading-5 text-[#6B7280]">
      {label}
    </div>
  );
}

function getStartingPrice(project: Project) {
  return Math.min(...project.availableUnits.map((unit) => unit.priceUsd));
}

function getPricePerSqm(project: Project) {
  if (project.pricePerSqmUsd) return project.pricePerSqmUsd;
  const startingUnit = [...project.availableUnits].sort((a, b) => a.priceUsd - b.priceUsd)[0];
  return startingUnit ? Math.round(startingUnit.priceUsd / startingUnit.sizeSqm) : 0;
}

function getDistrictLocation(project: Project) {
  return `${project.district} · ${project.city}`;
}

function getResaleAppeal(project: Project) {
  return project.liquidity === "High"
    ? "CBD-adjacent liquidity"
    : project.exitLiquidityNote ?? "Long-term resale positioning";
}
