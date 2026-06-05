"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  getUnitWorkspaceKey,
  useInvestmentWorkspace,
} from "@/context/investment-workspace-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { calculateRentalYield } from "@/lib/rental-yield";
import { CloseIcon } from "@/components/workspace-action-buttons";
import type { Project, ProjectUnit } from "@/types/project";
import type { TranslationKey } from "@/constants/translations";

type SelectedUnit = {
  project: Project;
  unit: ProjectUnit;
};

type UnitComparePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
};

export function UnitComparePanel({ isOpen, onClose, projects }: UnitComparePanelProps) {
  const { currency, t, td } = useAppPreferences();
  const [showMore, setShowMore] = useState(false);
  const { comparedUnitKeys, removeComparedUnit } = useInvestmentWorkspace();
  const selectedUnits = comparedUnitKeys
    .map((key) => findUnit(projects, key))
    .filter((item): item is SelectedUnit => Boolean(item));

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

  if (!isOpen || selectedUnits.length === 0) return null;

  return (
    <div
      aria-label={t("compareUnits")}
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">{t("compareUnits")}</p>
            <h2 className="mt-1 text-xl font-semibold text-[#1F2937] sm:text-2xl">{t("compareSimilarUnits")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280]">{t("unitCompareIntro")}</p>
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
          <p className="text-sm text-[#6B7280]">{t("unitsSelected", { count: selectedUnits.length })}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {selectedUnits.map(({ project, unit }) => (
              <UnitSummaryCard
                key={getUnitWorkspaceKey(project.slug, unit.id)}
                onRemove={removeComparedUnit}
                project={project}
                unit={unit}
              />
            ))}
            {Array.from({ length: Math.max(0, 3 - selectedUnits.length) }, (_, index) => (
              <EmptySlot key={index} label={t("addAnotherUnitToCompare")} />
            ))}
          </div>

          {selectedUnits.length >= 2 ? (
            <div className="mt-5 grid gap-3">
              <ComparisonGroup
                items={selectedUnits}
                rows={[
                  { label: "unitType", value: ({ unit }) => unit.unitType },
                  { label: "bedrooms", value: ({ unit }) => `${unit.bedrooms}` },
                  { label: "size", value: ({ unit }) => `${unit.sizeSqm} sqm` },
                  { highlight: true, label: "price", value: ({ unit }) => formatCurrencyFromUsd(unit.priceUsd, currency) },
                  { highlight: true, label: "pricePerSqm", value: ({ unit }) => `${formatCurrencyFromUsd(unit.pricePerSqmUsd ?? Math.round(unit.priceUsd / unit.sizeSqm), currency)} / sqm` },
                  { highlight: true, label: "estimatedMonthlyRent", value: ({ unit }) => `${formatCurrencyFromUsd(unit.estimatedMonthlyRentUsd, currency)}/${t("perMonth")}` },
                  { highlight: true, label: "estimatedGrossYield", value: ({ unit }) => unit.estimatedGrossYield },
                  { highlight: true, label: "estimatedNetYield", value: ({ unit }) => unit.estimatedNetYield ?? `${getEstimatedNetYield(unit).toFixed(1)}%` },
                ]}
              />
              {showMore ? (
                <ComparisonGroup
                  items={selectedUnits}
                  rows={[
                    { label: "bathrooms", value: ({ unit }) => `${unit.bathrooms}` },
                    { label: "floorLevel", value: ({ unit }) => unit.floorLevel ?? unit.floorRange },
                    { label: "viewType", value: ({ unit }) => unit.viewType ?? "—" },
                    { label: "orientation", value: ({ unit }) => unit.orientation ?? "—" },
                    { label: "furnishingStatus", value: ({ unit }) => unit.furnishingStatus },
                    { label: "foreignBuyerStatus", value: ({ project }) => td(project.foreignOwnershipStatus) },
                    { label: "availability", value: ({ unit }) => unit.availabilityStatus },
                    { label: "typicalTenantProfile", value: ({ unit }) => getShortText(unit.rentalStrategy ?? unit.bestFor) },
                    { label: "whyChooseThisUnit", value: ({ unit }) => getShortText(unit.notes) },
                    { label: "watchpoints", value: ({ unit }) => getShortText(unit.foreignBuyerNote ?? unit.notes) },
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

function UnitSummaryCard({
  onRemove,
  project,
  unit,
}: SelectedUnit & {
  onRemove: (projectSlug: string, unitId: string) => void;
}) {
  const { currency, t, td } = useAppPreferences();

  return (
    <article className="overflow-hidden rounded-sm border border-[#ECE7DA] bg-white">
      <div className="relative aspect-[16/8] bg-cover bg-center" style={{ backgroundImage: `url('${unit.heroImage ?? unit.unitImage}')` }}>
        <button
          aria-label={t("removeFromComparison")}
          className="premium-focus-ring absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/92 text-[#1F2937] shadow-sm transition hover:border-[#F5C84C] hover:bg-[#FFF8E8]"
          onClick={() => onRemove(project.slug, unit.id)}
          title={t("removeFromComparison")}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{td(project.projectName)} · {td(project.district)}</p>
        <h3 className="mt-2 text-lg font-semibold text-[#1F2937]">{td(unit.unitName ?? unit.unitType)}</h3>
        <p className="mt-2 text-sm font-semibold text-[#1F2937]">{formatCurrencyFromUsd(unit.priceUsd, currency)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link className="premium-focus-ring inline-flex min-h-10 items-center rounded-sm bg-[#F5C84C] px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#E7B93D]" href={`/properties/${project.slug}/units/${unit.slug ?? unit.id}`}>
            {t("viewUnitDetails")}
          </Link>
          <Link className="premium-focus-ring inline-flex min-h-10 items-center rounded-sm border border-[#D8CDAF] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:border-[#E7B93D] hover:bg-[#FFF8E8]" href={`/enquiry?project=${project.slug}&unit=${unit.id}`}>
            {t("enquireAboutThisUnit")}
          </Link>
        </div>
      </div>
    </article>
  );
}

function ComparisonGroup({
  items,
  rows,
}: {
  items: SelectedUnit[];
  rows: { highlight?: boolean; label: TranslationKey; value: (item: SelectedUnit) => string }[];
}) {
  const { t, td } = useAppPreferences();

  return (
    <div className="overflow-x-auto rounded-sm border border-[#ECE7DA] bg-white">
      <div className="min-w-[720px]">
        {rows.map((row) => (
          <div className="grid grid-cols-[180px_repeat(3,minmax(0,1fr))] gap-3 border-b border-[#ECE7DA] px-4 py-3 last:border-b-0" key={row.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{t(row.label)}</p>
            {items.map((item) => (
              <p className={`text-sm leading-5 ${row.highlight ? "font-semibold text-[#A9851D]" : "text-[#4B5563]"}`} key={getUnitWorkspaceKey(item.project.slug, item.unit.id)}>{td(row.value(item))}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-sm border border-dashed border-[#D8CDAF] bg-white/60 p-6 text-center text-sm font-semibold leading-6 text-[#6B7280]">
      {label}
    </div>
  );
}

function findUnit(projects: Project[], key: string): SelectedUnit | null {
  for (const project of projects) {
    const unit = project.availableUnits.find((item) => getUnitWorkspaceKey(project.slug, item.id) === key);
    if (unit) return { project, unit };
  }

  return null;
}

function getEstimatedNetYield(unit: ProjectUnit) {
  return calculateRentalYield({
    purchasePriceUsd: unit.priceUsd,
    estimatedMonthlyRentUsd: unit.estimatedMonthlyRentUsd,
    managementFeePercent: 8,
    vacancyAllowancePercent: 5,
    annualServiceChargeUsd: unit.sizeSqm * 3 * 12,
  }).estimatedNetYieldPercent;
}

function getShortText(value: string) {
  const firstSentence = value.split(".")[0];
  return firstSentence.length > 78 ? `${firstSentence.slice(0, 75)}...` : firstSentence;
}
