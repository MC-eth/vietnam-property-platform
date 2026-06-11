"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  getUnitWorkspaceKey,
  useInvestmentWorkspace,
} from "@/context/investment-workspace-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { estimateUnitNetYieldPercent } from "@/lib/rental-yield";
import { generateUnitComparisonAnalysis } from "@/lib/unit-comparison-analysis";
import { CloseIcon } from "@/components/workspace-action-buttons";
import { InfoPopover } from "@/components/info-popover";
import type { Project, ProjectUnit } from "@/types/project";
import type { TranslationKey } from "@/constants/translations";

type SelectedUnit = {
  project: Project;
  unit: ProjectUnit;
};

type CompareRow = {
  label: TranslationKey;
  value: (item: SelectedUnit) => string;
  highlight?: boolean;
  metric?: "price" | "pricePerSqm" | "size" | "netYield" | "grossRent" | "view";
  available?: (items: SelectedUnit[]) => boolean;
};

type DifferenceBadge = {
  unitKey: string;
  label: TranslationKey;
};

type UnitComparePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
};

export function UnitComparePanel({ isOpen, onClose, projects }: UnitComparePanelProps) {
  const { currency, language, t, td } = useAppPreferences();
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

  const comparedUnits = selectedUnits.map((item) => item.unit);

  const essentialRows: CompareRow[] = [
    { label: "unitType", value: ({ unit }) => unit.unitType },
    { highlight: true, label: "price", metric: "price", value: ({ unit }) => formatCurrencyFromUsd(unit.priceUsd, currency) },
    { label: "size", metric: "size", value: ({ unit }) => `${unit.sizeSqm} sqm` },
    {
      highlight: true,
      label: "pricePerSqm",
      metric: "pricePerSqm",
      value: ({ unit }) => `${formatCurrencyFromUsd(unit.pricePerSqmUsd ?? Math.round(unit.priceUsd / unit.sizeSqm), currency)} / sqm`,
    },
    { label: "bedrooms", value: ({ unit }) => `${unit.bedrooms}` },
    {
      label: "view",
      metric: "view",
      value: ({ unit }) => unit.viewType ?? "—",
      available: (items) => items.some(({ unit }) => Boolean(unit.viewType)),
    },
    { label: "tenantFit", value: ({ unit }) => (language === "zh-Hant" ? unit.tenantFitZh : unit.tenantFit) },
    {
      highlight: true,
      label: "estimatedGrossRent",
      metric: "grossRent",
      value: ({ unit }) => `${formatCurrencyFromUsd(unit.estimatedMonthlyRentUsd, currency)}/${t("perMonth")}`,
    },
    {
      highlight: true,
      label: "estimatedNetYield",
      metric: "netYield",
      value: ({ unit }) => unit.estimatedNetYield ?? `${estimateUnitNetYieldPercent(unit).toFixed(1)}%`,
    },
  ];

  const detailRows: CompareRow[] = [
    { label: "bathrooms", value: ({ unit }) => `${unit.bathrooms}` },
    { label: "floorLevel", value: ({ unit }) => unit.floorLevel ?? unit.floorRange },
    {
      label: "orientation",
      value: ({ unit }) => unit.orientation ?? "—",
      available: (items) => items.some(({ unit }) => Boolean(unit.orientation)),
    },
    { label: "furnishing", value: ({ unit }) => unit.furnishingStatus },
    { label: "foreignBuyerEligibility", value: ({ project }) => td(project.foreignOwnershipStatus) },
    { label: "investmentFit", value: ({ unit }) => (language === "zh-Hant" ? unit.investmentFitZh : unit.investmentFit) },
    { highlight: true, label: "estimatedGrossYield", value: ({ unit }) => unit.estimatedGrossYield },
  ];

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
            <h2 className="mt-1 text-xl font-semibold text-[#1F2937] sm:text-2xl">{t("compareSelectedUnits")}</h2>
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

          <div className="mt-4 overflow-x-auto pb-1">
            <div className="grid min-w-[640px] gap-3 sm:grid-cols-3">
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
          </div>

          {selectedUnits.length >= 2 ? (
            <div className="mt-5 grid gap-3">
              <ComparisonGroup items={selectedUnits} rows={essentialRows} />
              <AiAnalysisPanel comparedUnits={comparedUnits} items={selectedUnits} />
              <button
                aria-expanded={showMore}
                aria-controls="unit-comparison-details"
                className="premium-focus-ring min-h-11 rounded-sm border border-[#D8CDAF] bg-white px-4 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
                onClick={() => setShowMore((current) => !current)}
                type="button"
              >
                {t(showMore ? "showFewerDetails" : "viewMoreDetails")}
              </button>
              {showMore ? (
                <div id="unit-comparison-details">
                  <ComparisonGroup items={selectedUnits} rows={detailRows} />
                </div>
              ) : null}
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
  const netYield = unit.estimatedNetYield ?? `${estimateUnitNetYieldPercent(unit).toFixed(1)}%`;

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            {td(project.projectName)}
          </p>
          <h3 className="mt-1 text-sm font-semibold leading-5 text-[#1F2937]">
            {td(unit.unitName ?? unit.unitType)}
          </h3>
        </div>
        <button
          aria-label={t("removeFromComparison")}
          className="premium-focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ECE7DA] bg-white text-[#1F2937] transition hover:border-[#F5C84C] hover:bg-[#FFF8E8]"
          onClick={() => onRemove(project.slug, unit.id)}
          title={t("removeFromComparison")}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div>
          <dt className="text-[#6B7280]">{t("unitType")}</dt>
          <dd className="mt-0.5 font-semibold text-[#1F2937]">{td(unit.unitType)}</dd>
        </div>
        <div>
          <dt className="text-[#6B7280]">{t("size")}</dt>
          <dd className="mt-0.5 font-semibold text-[#1F2937]">{unit.sizeSqm} sqm</dd>
        </div>
        <div>
          <dt className="text-[#6B7280]">{t("price")}</dt>
          <dd className="mt-0.5 font-semibold text-[#A9851D]">{formatCurrencyFromUsd(unit.priceUsd, currency)}</dd>
        </div>
        <div>
          <dt className="text-[#6B7280]">{t("estimatedNetYield")}</dt>
          <dd className="mt-0.5 font-semibold text-[#A9851D]">{netYield}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
          <Link className="premium-focus-ring inline-flex min-h-10 items-center rounded-sm bg-[#F5C84C] px-3 text-xs font-semibold text-[#1F2937] hover:bg-[#E7B93D]" href={`/properties/${project.slug}/units/${unit.slug ?? unit.id}`}>
            {t("viewUnitDetails")}
          </Link>
          <Link className="premium-focus-ring inline-flex min-h-10 items-center rounded-sm border border-[#D8CDAF] bg-white px-3 text-xs font-semibold text-[#1F2937] hover:border-[#E7B93D] hover:bg-[#FFF8E8]" href={`/enquiry?project=${project.slug}&unit=${unit.id}`}>
            {t("enquireAboutThisUnit")}
          </Link>
      </div>
    </article>
  );
}

function ComparisonGroup({
  items,
  rows,
}: {
  items: SelectedUnit[];
  rows: CompareRow[];
}) {
  const { t, td } = useAppPreferences();
  const visibleRows = rows.filter(
    (row) => !row.available || row.available(items),
  );

  return (
    <div className="overflow-x-auto rounded-sm border border-[#ECE7DA] bg-white">
      <div className="min-w-[720px]">
        {visibleRows.map((row) => {
          const badges = getDifferenceBadges(row, items);

          return (
            <div
              className="grid grid-cols-[160px_repeat(3,minmax(0,1fr))] items-center gap-3 border-b border-[#ECE7DA] px-4 py-2.5 last:border-b-0"
              key={row.label}
            >
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">{t(row.label)}</p>
              </div>
              {items.map((item) => {
                const unitKey = getUnitWorkspaceKey(item.project.slug, item.unit.id);
                const badge = badges.find((candidate) => candidate.unitKey === unitKey);

                return (
                  <div
                    className={
                      `text-sm leading-5 ${row.highlight ? "font-semibold text-[#A9851D]" : "font-medium text-[#1F2937]"}`
                    }
                    key={unitKey}
                  >
                    <p>{td(row.value(item))}</p>
                    {badge ? (
                      <span className="mt-1.5 inline-flex rounded-full border border-[#D8CDAF] bg-[#FFF8E8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A6B16]">
                        {t(badge.label)}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AiAnalysisPanel({
  comparedUnits,
  items,
}: {
  comparedUnits: ProjectUnit[];
  items: SelectedUnit[];
}) {
  const { language, t, td } = useAppPreferences();

  return (
    <section className="rounded-sm border border-[#E6D8AF] bg-[#FFF8E8] px-4 py-4">
      <div className="flex items-center gap-2">
          <SparkleIcon />
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6B16]">
          {t("aiUnitAnalysis")}
        </p>
        <InfoPopover content={t("aiAnalysisDisclaimer")} label={t("aiUnitAnalysis")} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ project, unit }) => (
          <article
            className="rounded-sm border border-[#E6D8AF] bg-white/65 p-3"
            key={getUnitWorkspaceKey(project.slug, unit.id)}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6B16]">
              {td(unit.unitName ?? unit.unitType)}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4B5563]">
              {generateUnitComparisonAnalysis(unit, comparedUnits, language)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getDifferenceBadges(row: CompareRow, items: SelectedUnit[]): DifferenceBadge[] {
  if (!row.metric || items.length < 2) return [];

  switch (row.metric) {
    case "price":
      return getLowerValueBadge(items, ({ unit }) => unit.priceUsd, 0.03, "lowestPrice");
    case "pricePerSqm":
      return getLowerValueBadge(
        items,
        ({ unit }) => unit.pricePerSqmUsd ?? (unit.sizeSqm > 0 ? unit.priceUsd / unit.sizeSqm : 0),
        0.03,
        "lowestPricePerSqm",
      );
    case "size":
      return getHigherValueBadge(items, ({ unit }) => unit.sizeSqm, 0.05, "largestSize");
    case "grossRent":
      return getHigherValueBadge(items, ({ unit }) => unit.estimatedMonthlyRentUsd, 0.05, "higherGrossRent");
    case "netYield":
      return getHigherPointBadge(items, ({ unit }) => estimateUnitNetYieldPercent(unit), 0.15, "higherNetYield");
    case "view":
      return getPremiumViewBadges(items);
    default:
      return [];
  }
}

function getLowerValueBadge(
  items: SelectedUnit[],
  getValue: (item: SelectedUnit) => number,
  thresholdRatio: number,
  label: TranslationKey,
): DifferenceBadge[] {
  const values = items.map((item) => ({ item, value: getValue(item) })).filter(({ value }) => value > 0);
  if (values.length < 2) return [];
  const sorted = [...values].sort((a, b) => a.value - b.value);
  const best = sorted[0];
  const next = sorted[1];
  if (!best || !next || (next.value - best.value) / next.value < thresholdRatio) return [];
  return [{ label, unitKey: getUnitWorkspaceKey(best.item.project.slug, best.item.unit.id) }];
}

function getHigherValueBadge(
  items: SelectedUnit[],
  getValue: (item: SelectedUnit) => number,
  thresholdRatio: number,
  label: TranslationKey,
): DifferenceBadge[] {
  const values = items.map((item) => ({ item, value: getValue(item) })).filter(({ value }) => value > 0);
  if (values.length < 2) return [];
  const sorted = [...values].sort((a, b) => b.value - a.value);
  const best = sorted[0];
  const next = sorted[1];
  if (!best || !next || (best.value - next.value) / best.value < thresholdRatio) return [];
  return [{ label, unitKey: getUnitWorkspaceKey(best.item.project.slug, best.item.unit.id) }];
}

function getHigherPointBadge(
  items: SelectedUnit[],
  getValue: (item: SelectedUnit) => number,
  thresholdPoints: number,
  label: TranslationKey,
): DifferenceBadge[] {
  const values = items.map((item) => ({ item, value: getValue(item) })).filter(({ value }) => value > 0);
  if (values.length < 2) return [];
  const sorted = [...values].sort((a, b) => b.value - a.value);
  const best = sorted[0];
  const next = sorted[1];
  if (!best || !next || best.value - next.value < thresholdPoints) return [];
  return [{ label, unitKey: getUnitWorkspaceKey(best.item.project.slug, best.item.unit.id) }];
}

function getPremiumViewBadges(items: SelectedUnit[]): DifferenceBadge[] {
  const premiumViews = items.filter(({ unit }) => {
    const view = (unit.viewType ?? "").toLowerCase();
    return view.includes("river") || view.includes("lake");
  });
  if (premiumViews.length !== 1) return [];
  const [item] = premiumViews;
  return [{ label: "premiumView", unitKey: getUnitWorkspaceKey(item.project.slug, item.unit.id) }];
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-sm border border-dashed border-[#D8CDAF] bg-white/60 p-4 text-center text-sm font-semibold leading-6 text-[#6B7280]">
      {label}
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-[#A9851D]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function findUnit(projects: Project[], key: string): SelectedUnit | null {
  for (const project of projects) {
    const unit = project.availableUnits.find((item) => getUnitWorkspaceKey(project.slug, item.id) === key);
    if (unit) return { project, unit };
  }

  return null;
}
