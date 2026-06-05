"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  hcmcMapDistricts,
  hcmcMapLandmarks,
  hcmcMapProjects,
} from "@/data/hcmc-investment-map";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type {
  HcmcMapDistrict,
  HcmcMapLandmark,
  HcmcMapProject,
} from "@/types/hcmc-map";

type MapLayer = "all" | "projects" | "landmarks" | "infrastructure";
type Translate = ReturnType<typeof useAppPreferences>["t"];
type TranslateData = ReturnType<typeof useAppPreferences>["td"];

const mapLayers: {
  id: MapLayer;
  labelKey: "mapAll" | "mapResidences" | "landmarks" | "infrastructure";
}[] = [
  { id: "all", labelKey: "mapAll" },
  { id: "projects", labelKey: "mapResidences" },
  { id: "infrastructure", labelKey: "infrastructure" },
  { id: "landmarks", labelKey: "landmarks" },
];

export function HcmcInvestmentMap() {
  const { currency, t, td } = useAppPreferences();
  const [selectedDistrictId, setSelectedDistrictId] = useState("thu-thiem");
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayer>("all");

  const selectedDistrict =
    hcmcMapDistricts.find((district) => district.id === selectedDistrictId) ??
    hcmcMapDistricts[0];
  const previewDistrict =
    hcmcMapDistricts.find((district) => district.id === hoveredDistrictId) ??
    selectedDistrict;
  const showProjects = activeLayer === "all" || activeLayer === "projects";
  const showLandmarks = activeLayer === "all" || activeLayer === "landmarks";
  const showInfrastructure = activeLayer === "all" || activeLayer === "infrastructure";

  return (
    <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:py-28" id="hcmc-investment-map">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B88A18]">
          {t("investmentDistricts")}
        </p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
          {t("hcmcInvestmentMapTitle")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B7280]">
          {t("hcmcInvestmentMapSubtitle")}
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-[#E8E1D3] bg-[#FDFBF5] shadow-[0_22px_60px_rgba(68,56,34,0.10)]">
          <div className="relative">
            <div className="relative h-[470px] overflow-hidden bg-[radial-gradient(circle_at_58%_42%,#FFF8DE_0%,#FDFBF5_46%,#F6F1E7_100%)] sm:h-[560px] lg:h-[640px] lg:pr-[304px]">
              <div className="absolute inset-y-0 left-0 right-0 lg:right-[304px]">
                <div className="absolute left-4 top-4 z-30 flex max-w-[calc(100%-2rem)] gap-2 overflow-x-auto rounded-full border border-white/80 bg-white/86 p-1.5 shadow-[0_8px_24px_rgba(68,56,34,0.10)] backdrop-blur sm:left-6 sm:top-6">
                  {mapLayers.map((layer) => (
                    <button
                      aria-pressed={activeLayer === layer.id}
                      className={`premium-focus-ring min-h-10 shrink-0 rounded-full px-4 text-xs font-semibold transition ${
                        activeLayer === layer.id
                          ? "bg-[#F5C84C] text-[#1F2937] shadow-sm"
                          : "text-[#5F6672] hover:bg-[#FFF8E4] hover:text-[#1F2937]"
                      }`}
                      key={layer.id}
                      onClick={() => setActiveLayer(layer.id)}
                      type="button"
                    >
                      {t(layer.labelKey)}
                    </button>
                  ))}
                </div>

                <svg
                  aria-label={t("hcmcInvestmentMapTitle")}
                  className="map-enter h-full w-full"
                  role="img"
                  viewBox="0 0 1000 640"
                >
                  <defs>
                    <filter id="map-district-shadow" x="-30%" y="-30%" width="170%" height="180%">
                      <feDropShadow dx="0" dy="13" floodColor="#5D5B52" floodOpacity="0.17" stdDeviation="10" />
                    </filter>
                    <filter id="map-district-glow" x="-35%" y="-35%" width="180%" height="190%">
                      <feDropShadow dx="0" dy="14" floodColor="#A57B18" floodOpacity="0.24" stdDeviation="11" />
                    </filter>
                    <linearGradient id="map-river" x1="20%" x2="80%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#D9ECF0" />
                      <stop offset="58%" stopColor="#BFDDE4" />
                      <stop offset="100%" stopColor="#A9CED8" />
                    </linearGradient>
                    <linearGradient id="map-ground" x1="12%" x2="88%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF8" />
                      <stop offset="100%" stopColor="#F3EEE4" />
                    </linearGradient>
                    <pattern height="20" id="map-dots" patternUnits="userSpaceOnUse" width="20">
                      <circle cx="3" cy="3" fill="#D7CDBA" opacity="0.22" r="1" />
                    </pattern>
                  </defs>

                  <rect fill="url(#map-ground)" height="640" width="1000" />
                  <rect fill="url(#map-dots)" height="640" width="1000" />
                  <path d="M40 204 C180 178 284 198 392 165 C545 118 716 136 972 82" className="map-road" />
                  <path d="M56 458 C220 421 359 456 493 492 C650 535 806 508 979 468" className="map-road" />
                  <path d="M126 550 C272 480 375 380 441 240 C493 134 585 94 734 72" className="map-road map-road-muted" />

                  {hcmcMapDistricts.map((district) => (
                    <DistrictShape
                      district={district}
                      isHovered={district.id === hoveredDistrictId}
                      isSelected={district.id === selectedDistrict.id}
                      key={district.id}
                      onBlur={() => setHoveredDistrictId(null)}
                      onFocus={() => setHoveredDistrictId(district.id)}
                      onSelect={() => setSelectedDistrictId(district.id)}
                      onMouseEnter={() => setHoveredDistrictId(district.id)}
                      onMouseLeave={() => setHoveredDistrictId(null)}
                      td={td}
                    />
                  ))}

                  <path
                    d="M493 -35 C451 61 462 144 503 207 C540 264 508 326 466 367 C431 402 460 448 554 474 C684 510 731 550 770 680"
                    fill="none"
                    opacity="0.22"
                    stroke="#799AA4"
                    strokeLinecap="round"
                    strokeWidth="88"
                  />
                  <path
                    d="M493 -35 C451 61 462 144 503 207 C540 264 508 326 466 367 C431 402 460 448 554 474 C684 510 731 550 770 680"
                    fill="none"
                    stroke="url(#map-river)"
                    strokeLinecap="round"
                    strokeWidth="76"
                  />
                  <path
                    d="M493 -35 C451 61 462 144 503 207 C540 264 508 326 466 367 C431 402 460 448 554 474 C684 510 731 550 770 680"
                    fill="none"
                    opacity="0.7"
                    stroke="#FFFFFF"
                    strokeDasharray="2 16"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <text fill="#688A94" fontSize="12" fontWeight="700" letterSpacing="2.5" transform="rotate(28 554 472)" x="554" y="472">
                    SAIGON RIVER
                  </text>

                  {showInfrastructure ? <InfrastructureLayer /> : null}

                  {hcmcMapDistricts.map((district) => (
                    <DistrictLabel district={district} key={`${district.id}-label`} td={td} />
                  ))}

                  {showLandmarks
                    ? hcmcMapLandmarks.map((landmark) => (
                        <LandmarkMarker key={landmark.id} landmark={landmark} td={td} />
                      ))
                    : null}
                </svg>

                {showProjects
                  ? hcmcMapProjects.map((project) => (
                      <ProjectPin
                        currency={currency}
                        isHovered={hoveredProjectSlug === project.projectSlug}
                        key={project.projectSlug}
                        onBlur={() => setHoveredProjectSlug(null)}
                        onFocus={() => setHoveredProjectSlug(project.projectSlug)}
                        onMouseEnter={() => setHoveredProjectSlug(project.projectSlug)}
                        onMouseLeave={() => setHoveredProjectSlug(null)}
                        project={project}
                        td={td}
                        t={t}
                      />
                    ))
                  : null}
              </div>

              <div className="absolute bottom-4 left-4 z-20 rounded-full border border-white/75 bg-white/78 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64707B] shadow-sm backdrop-blur sm:bottom-6 sm:left-6">
                {td(previewDistrict.displayName)}
              </div>

              <div className="absolute inset-y-0 right-0 hidden w-[304px] border-l border-white/70 bg-white/82 p-5 shadow-[-12px_0_34px_rgba(68,56,34,0.08)] backdrop-blur-md lg:block">
                <DistrictPanel district={previewDistrict} t={t} td={td} />
              </div>
            </div>

            <div className="border-t border-[#E8E1D3] bg-white/88 p-4 sm:p-5">
              <FeaturedResidences currency={currency} t={t} td={td} />
            </div>
          </div>
        </div>

        <div className="mt-4 lg:hidden">
          <DistrictPanel district={previewDistrict} isMobile t={t} td={td} />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {hcmcMapDistricts.map((district) => (
            <button
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                selectedDistrict.id === district.id
                  ? "border-[#E7B93D] bg-[#FFF8DF] text-[#1F2937]"
                  : "border-[#ECE7DA] bg-white text-[#6B7280]"
              }`}
              key={district.id}
              onClick={() => setSelectedDistrictId(district.id)}
              type="button"
            >
              {td(district.name)}
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-[#6B7280]">
          {t("hcmcInvestmentMapDisclaimer")}
        </p>
      </div>
    </section>
  );
}

function DistrictShape({
  district,
  isHovered,
  isSelected,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onSelect,
  td,
}: {
  district: HcmcMapDistrict;
  isHovered: boolean;
  isSelected: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelect: () => void;
  td: TranslateData;
}) {
  return (
    <g
      aria-label={td(district.displayName)}
      className="cursor-pointer outline-none"
      onBlur={onBlur}
      onClick={onSelect}
      onFocus={onFocus}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
    >
      <path d={district.shapePath} fill="#574E40" opacity="0.13" transform="translate(0 14)" />
      <path
        className="map-district-shape"
        d={district.shapePath}
        fill={district.color}
        fillOpacity={isSelected ? 0.98 : isHovered ? 0.9 : 0.78}
        filter={isSelected || isHovered ? "url(#map-district-glow)" : "url(#map-district-shadow)"}
        stroke={isSelected || isHovered ? "#C69724" : "#FFFFFF"}
        strokeWidth={isSelected || isHovered ? 4 : 2}
        style={{ transform: isHovered ? "translateY(-7px)" : undefined }}
      />
    </g>
  );
}

function DistrictLabel({ district, td }: { district: HcmcMapDistrict; td: TranslateData }) {
  return (
    <g pointerEvents="none">
      <circle cx={district.mapPosition.x * 10} cy={district.mapPosition.y * 6.4} fill="#FFFFFF" opacity="0.94" r="4" />
      <text
        fill="#263648"
        fontSize={district.id === "thu-duc-city" ? 11 : 12}
        fontWeight="800"
        textAnchor="middle"
        x={district.mapPosition.x * 10}
        y={district.mapPosition.y * 6.4 + 24}
      >
        {td(district.name)}
      </text>
      {district.districtNumber ? (
        <text
          fill="#536172"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x={district.mapPosition.x * 10}
          y={district.mapPosition.y * 6.4 + 39}
        >
          D{district.districtNumber}
        </text>
      ) : null}
    </g>
  );
}

function InfrastructureLayer() {
  return (
    <>
      <path d="M274 326 C438 263 632 170 906 117" fill="none" opacity="0.92" stroke="#B88A18" strokeDasharray="9 8" strokeWidth="4" />
      <text fill="#8A6919" fontSize="12" fontWeight="700" letterSpacing="1.6" x="706" y="145">
        METRO LINE 1
      </text>
      <path d="M391 228 L548 295" fill="none" opacity="0.78" stroke="#4B5864" strokeLinecap="round" strokeWidth="8" />
      <text fill="#4B5563" fontSize="11" fontWeight="700" x="408" y="243">
        THU THIEM BRIDGE
      </text>
    </>
  );
}

function LandmarkMarker({ landmark, td }: { landmark: HcmcMapLandmark; td: TranslateData }) {
  return (
    <g>
      <circle
        cx={landmark.mapPosition.x * 10}
        cy={landmark.mapPosition.y * 6.4}
        fill="#FFFFFF"
        r="14"
        stroke="#D8CDAF"
        strokeWidth="2"
      />
      <circle cx={landmark.mapPosition.x * 10} cy={landmark.mapPosition.y * 6.4} fill="#B88A18" r="4" />
      <text
        fill="#4B5563"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        x={landmark.mapPosition.x * 10}
        y={landmark.mapPosition.y * 6.4 - 21}
      >
        {td(landmark.name)}
      </text>
    </g>
  );
}

function DistrictPanel({
  district,
  isMobile = false,
  t,
  td,
}: {
  district: HcmcMapDistrict;
  isMobile?: boolean;
  t: Translate;
  td: TranslateData;
}) {
  const districtProjects = hcmcMapProjects.filter((project) =>
    district.projectSlugs.includes(project.projectSlug),
  );

  return (
    <aside className={isMobile ? "rounded-lg border border-[#ECE7DA] bg-[#FFFDF8] p-5 shadow-sm" : ""}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B88A18]">
        {t("selectedDistrict")}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-tight text-[#1F2937]">
        {td(district.displayName)}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#4B5563]">{td(district.positioning)}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {district.bestFor.slice(0, 3).map((item) => (
          <span className="rounded-full border border-[#E7DDC8] bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#59616D]" key={item}>
            {td(item)}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-[#E8E1D3] pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A8490]">
          {t("availableResidences")}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#4B5563]">
          {districtProjects.length > 0
            ? districtProjects.map((project) => td(project.projectName)).join(" · ")
            : t("selectedExamplesComingSoon")}
        </p>
      </div>

      <Link
        className="premium-focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
        href={`/districts/${district.slug}`}
      >
        {t("viewDistrictInsights")}
      </Link>
    </aside>
  );
}

function ProjectPin({
  currency,
  isHovered,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  project,
  t,
  td,
}: {
  currency: ReturnType<typeof useAppPreferences>["currency"];
  isHovered: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  project: HcmcMapProject;
  t: Translate;
  td: TranslateData;
}) {
  return (
    <Link
      aria-label={td(project.projectName)}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      href={project.href}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ left: `${project.mapPosition.x}%`, top: `${project.mapPosition.y}%` }}
    >
      <span className="map-pin-pulse absolute inset-0 rounded-full bg-[#E7B93D]/45" />
      <span className="relative block h-5 w-5 rounded-full border-[3px] border-white bg-[#B88A18] shadow-[0_6px_16px_rgba(82,64,26,0.35)] transition duration-300 hover:scale-110 sm:h-6 sm:w-6" />
      {isHovered ? (
        <span className="absolute bottom-7 left-1/2 w-56 -translate-x-1/2 rounded-sm border border-[#ECE7DA] bg-white/96 p-3 text-left shadow-xl backdrop-blur">
          <span className="block text-sm font-semibold text-[#1F2937]">{td(project.projectName)}</span>
          <span className="mt-1 block text-xs text-[#6B7280]">
            {formatCurrencyFromUsd(project.startingPriceUsd, currency)} ·{" "}
            {project.availableUnitsCount > 0
              ? t("availableUnitCount", { count: project.availableUnitsCount })
              : t("selectedExample")}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

function FeaturedResidences({
  currency,
  t,
  td,
}: {
  currency: ReturnType<typeof useAppPreferences>["currency"];
  t: Translate;
  td: TranslateData;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7A8490]">
        {t("featuredResidences")}
      </p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {hcmcMapProjects
          .filter((project) => project.availableUnitsCount > 0)
          .slice(0, 4)
          .map((project) => (
            <Link
              className="group flex min-w-[250px] flex-1 items-center gap-3 rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#D8CDAF] hover:bg-white hover:shadow-md"
              href={project.href}
              key={project.projectSlug}
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-[#F4EFE5]">
                <Image
                  alt=""
                  className="object-cover transition duration-500 group-hover:scale-105"
                  fill
                  sizes="80px"
                  src={project.image}
                />
              </div>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[#1F2937]">
                  {td(project.projectName)}
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#6B7280]">
                  {formatCurrencyFromUsd(project.startingPriceUsd, currency)} ·{" "}
                  {t("availableUnitCount", { count: project.availableUnitsCount })}
                </span>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
