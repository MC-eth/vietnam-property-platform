"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import { hcmcDistrictSummaries } from "@/data/hcmc-investment-map";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { CurrencyCode } from "@/types/currency";
import type { HcmcDistrictSummary } from "@/types/hcmc-map";
import type { Project } from "@/types/project";

type HomepageMapPlaceholderProps = {
  activeLayer: string;
  onLayerChange: (layer: string) => void;
  projects: Project[];
};

const layers = [
  { id: "all", label: "allLocations" },
  { id: "projects", label: "residentialProjects" },
  { id: "landmarks", label: "landmarks" },
  { id: "infrastructure", label: "infrastructure" },
] as const;

const thuThiemSummary = hcmcDistrictSummaries["thu-thiem"];

export function HomepageMapPlaceholder({ activeLayer, onLayerChange, projects }: HomepageMapPlaceholderProps) {
  const { t } = useAppPreferences();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white p-2 shadow-[0_22px_64px_rgba(31,41,55,0.10)] sm:p-3">
      <div className="relative min-h-[540px] overflow-hidden rounded-xl bg-[#FFF8E8] md:min-h-[500px] lg:min-h-[520px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(245,200,76,0.28),transparent_30%),radial-gradient(circle_at_20%_72%,rgba(184,202,199,0.28),transparent_30%),linear-gradient(135deg,#FFFDF8_0%,#F7EFE0_42%,#EEF3F0_100%)]" />
        <div className="absolute inset-0 opacity-55">
          <div className="absolute left-[-8%] top-[28%] h-px w-[115%] rotate-[-9deg] bg-[#D8CDAF]" />
          <div className="absolute left-[-10%] top-[54%] h-px w-[120%] rotate-[7deg] bg-[#D8CDAF]" />
          <div className="absolute left-[18%] top-[-20%] h-[130%] w-px rotate-[15deg] bg-[#D8CDAF]" />
          <div className="absolute left-[62%] top-[-15%] h-[130%] w-px rotate-[-18deg] bg-[#D8CDAF]" />
          <div className="absolute bottom-[-18%] right-[12%] h-72 w-72 rounded-full border border-[#D8CDAF]/70" />
        </div>

        <div className="relative z-10 flex min-h-[540px] flex-col justify-between gap-3 p-3 md:min-h-[500px] md:p-4 lg:min-h-[520px]">
          <div className="grid gap-4 lg:grid-cols-[150px_1fr_400px] lg:items-start xl:grid-cols-[170px_1fr_430px]">
            <nav className="flex gap-2 overflow-x-auto rounded-full border border-white/70 bg-white/88 p-2 shadow-sm backdrop-blur lg:flex-col lg:rounded-2xl">
              {layers.map((layer) => (
                <button
                  className={`premium-focus-ring min-h-11 shrink-0 rounded-full px-4 text-left text-sm font-semibold transition lg:w-full ${
                    activeLayer === layer.id
                      ? "bg-[#F5C84C] text-[#1F2937]"
                      : "bg-white text-[#4B5563] hover:bg-[#FFF8E8] hover:text-[#1F2937]"
                  }`}
                  key={layer.id}
                  onClick={() => onLayerChange(layer.id)}
                  type="button"
                >
                  {t(layer.label)}
                </button>
              ))}
            </nav>

            <div className="flex min-h-[220px] items-center justify-center px-2 py-6 text-center lg:min-h-[390px]">
              <div className="max-w-md rounded-2xl border border-white/70 bg-white/80 px-6 py-7 shadow-[0_18px_60px_rgba(31,41,55,0.08)] backdrop-blur">
                <h3 className="text-3xl font-semibold leading-tight text-[#1F2937]">
                  {t("hcmcMapPreviewTitle")}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#6B7280]">
                  {t("hcmcMapPreviewHelper")}
                </p>
              </div>
            </div>

            {isPanelOpen ? (
              <DistrictSummaryPanel
                onClose={() => setIsPanelOpen(false)}
                projects={projects}
                summary={thuThiemSummary}
              />
            ) : (
              <button
                className="premium-focus-ring rounded-2xl border border-[#ECE7DA] bg-white/90 p-5 text-left text-sm font-semibold text-[#1F2937] shadow-sm backdrop-blur transition hover:border-[#F5C84C]"
                onClick={() => setIsPanelOpen(true)}
                type="button"
              >
                <TD value="View District Insights" />
              </button>
            )}
          </div>

          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-white/75 bg-white/85 p-1 shadow-sm backdrop-blur">
              <span className="rounded-full bg-[#F5C84C] px-4 py-2 text-xs font-semibold text-[#1F2937]">2D</span>
              <span className="px-4 py-2 text-xs font-semibold text-[#6B7280]">3D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TD({ value }: { value: string }) {
  const { td } = useAppPreferences();
  return <>{td(value)}</>;
}

function DistrictSummaryPanel({
  onClose,
  projects,
  summary,
}: {
  onClose: () => void;
  projects: Project[];
  summary: HcmcDistrictSummary;
}) {
  const { currency, t, td } = useAppPreferences();
  const residences = summary.residenceSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <aside className="relative rounded-2xl border border-[#ECE7DA] bg-white/96 p-4 shadow-[0_18px_60px_rgba(31,41,55,0.10)] backdrop-blur sm:p-5">
      <button
        aria-label={t("close")}
        className="premium-focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#1F2937] transition hover:bg-[#FFF8E8]"
        onClick={onClose}
        type="button"
      >
        <span aria-hidden="true" className="text-xl leading-none">×</span>
      </button>

      <div className="pr-9">
        <h3 className="text-2xl font-semibold leading-tight text-[#1F2937]">
          <TD value={summary.name} />
        </h3>
        <span className="mt-3 inline-flex rounded-md bg-[#F5E7C6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A6A22]">
          <TD value={summary.positioningBadge} />
        </span>
      </div>

      <DevelopmentThemes
        bullets={summary.developmentBullets}
        summary={summary.developmentSummary}
        title={summary.developmentTitle}
      />

      <div className="mt-4">
        <p className="text-sm font-semibold text-[#1F2937]">{t("bestFor")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {summary.bestFor.map((item) => (
            <span className="rounded-full border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#1F2937]" key={item}>
              <TD value={item} />
            </span>
          ))}
        </div>
      </div>

      <div
        aria-label={td("Indicative district assessment based on current market and planning context.")}
        className="mt-4 grid grid-cols-2 divide-x divide-[#ECE7DA] border-y border-[#ECE7DA] py-3"
        title={td("Indicative district assessment based on current market and planning context.")}
      >
        <IndicatorMetric
          activeSegments={summary.rentalDemand.activeSegments}
          label="Rental Demand"
          value={summary.rentalDemand.value}
        />
        <IndicatorMetric
          activeSegments={summary.growthOutlook.activeSegments}
          label="Growth Outlook"
          value={summary.growthOutlook.value}
        />
      </div>
      <p className="mt-2 text-[11px] leading-5 text-[#8A8174]">
        <TD value="Indicative district assessment based on current market and planning context." />
      </p>

      <div className="mt-4">
        <p className="text-sm font-semibold text-[#1F2937]">
          <TD value="Nearby Landmarks" />
        </p>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          {summary.landmarks.map((landmark) => (
            <div className="flex items-center gap-2 text-sm text-[#4B5563]" key={landmark.label}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ECE7DA] bg-[#FFFDF8] text-[#8A6A22]">
                <LandmarkIcon icon={landmark.icon} />
              </span>
              <span className="leading-5"><TD value={landmark.label} /></span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-[#ECE7DA] pt-4">
        <p className="text-sm font-semibold text-[#1F2937]">
          <TD value="Available Residences" />
        </p>
        <div className="mt-3 grid gap-2">
          {residences.map((project) => (
            <ResidenceRow currency={currency} key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <Link
        className="premium-focus-ring mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] shadow-[0_14px_32px_rgba(245,200,76,0.18)] transition hover:bg-[#E7B93D]"
        href={summary.districtInsightsHref}
      >
        {t("viewDistrictInsights")}
        <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

function DevelopmentThemes({
  bullets,
  summary,
  title,
}: {
  bullets: string[];
  summary: string;
  title: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-[#1F2937]">
        <TD value={title} />
      </p>
      <p className="mt-1 text-sm leading-6 text-[#4B5563]">
        <TD value={summary} />
      </p>
      <ul className="mt-2 grid gap-1.5">
        {bullets.map((item) => (
          <li className="flex gap-2 text-xs leading-5 text-[#4B5563]" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C84C]" />
            <span><TD value={item} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndicatorMetric({
  activeSegments,
  label,
  value,
}: {
  activeSegments: number;
  label: string;
  value: string;
}) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <p className="text-sm font-medium text-[#4B5563]">
        <TD value={label} />
      </p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-xl font-semibold leading-none text-[#1F2937]">
          <TD value={value} />
        </p>
        <SegmentIndicator activeSegments={activeSegments} />
      </div>
    </div>
  );
}

function SegmentIndicator({ activeSegments }: { activeSegments: number }) {
  return (
    <span className="flex items-end gap-1" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          className={`block w-1.5 rounded-full ${index < activeSegments ? "bg-[#C7A76C]" : "bg-[#F1E8D7]"}`}
          key={index}
          style={{ height: `${8 + index * 2}px` }}
        />
      ))}
    </span>
  );
}

function ResidenceRow({ currency, project }: { currency: CurrencyCode; project: Project }) {
  const { t } = useAppPreferences();
  const startingPricePerSqm = getStartingPricePerSqm(project);
  const availableUnitsCount = project.availableUnits.length;

  return (
    <Link
      className="group grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-xl p-1.5 transition hover:bg-[#FFF8E8]"
      href={`/properties/${project.slug}`}
    >
      <div
        className="h-16 w-16 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url('${project.heroImage}')` }}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#1F2937]">
          <TD value={project.projectName} />
        </p>
        <p className="mt-1 text-xs leading-5 text-[#6B7280]">
          {startingPricePerSqm ? `${formatCurrencyFromUsd(startingPricePerSqm, currency)} / sqm` : <TD value="Indicative availability" />}
        </p>
        <p className="text-xs leading-5 text-[#6B7280]">
          {availableUnitsCount > 0 ? t("availableUnitCount", { count: availableUnitsCount }) : <TD value="Indicative availability" />}
        </p>
      </div>
      <span className="text-2xl leading-none text-[#1F2937] transition group-hover:translate-x-0.5">›</span>
    </Link>
  );
}

function getStartingPricePerSqm(project: Project) {
  const prices = project.availableUnits
    .filter((unit) => unit.sizeSqm > 0)
    .map((unit) => Math.round(unit.priceUsd / unit.sizeSqm));

  return prices.length > 0 ? Math.min(...prices) : undefined;
}

function LandmarkIcon({ icon }: { icon: HcmcDistrictSummary["landmarks"][number]["icon"] }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (icon === "bridge") {
    return (
      <svg {...commonProps}>
        <path d="M4 19h16" />
        <path d="M6 19c1-5 3-8 6-8s5 3 6 8" />
        <path d="M12 11V5" />
        <path d="M8 8h8" />
      </svg>
    );
  }

  if (icon === "river") {
    return (
      <svg {...commonProps}>
        <path d="M3 8c3-3 6 3 9 0s6 3 9 0" />
        <path d="M3 15c3-3 6 3 9 0s6 3 9 0" />
      </svg>
    );
  }

  if (icon === "train") {
    return (
      <svg {...commonProps}>
        <path d="M7 4h10a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Z" />
        <path d="M8 9h8" />
        <path d="M9 18l-2 3" />
        <path d="M15 18l2 3" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M4 21h16" />
      <path d="M6 21V7l6-4 6 4v14" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}
