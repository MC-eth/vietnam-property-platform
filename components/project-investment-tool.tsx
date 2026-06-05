"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";
import { ProjectComparePanel } from "@/components/project-compare-panel";
import { CompareIcon } from "@/components/workspace-action-buttons";
import { PROPERTY_SORT_OPTIONS } from "@/constants";
import { useAppPreferences } from "@/context/app-preferences-context";
import { useInvestmentWorkspace } from "@/context/investment-workspace-context";
import type { BuyerGoal } from "@/data/buyer-goals";
import { getProjectDistrictForDistrictFilter } from "@/data/district-insights";
import type { DistrictInsightPageData } from "@/types/district";
import type { Project, ProjectFilters } from "@/types/project";

export type ProjectSortOption = (typeof PROPERTY_SORT_OPTIONS)[number]["value"];

type ProjectInvestmentToolProps = {
  projects: Project[];
  buyerGoal?: BuyerGoal;
  initialDistrictFilter?: DistrictInsightPageData;
};

const defaultFilters: ProjectFilters = {
  city: "Ho Chi Minh City",
  district: "All",
  completionStatus: "All",
  ownership: "All",
  budget: "All",
};

export function ProjectInvestmentTool({
  projects,
  buyerGoal,
  initialDistrictFilter,
}: ProjectInvestmentToolProps) {
  const { t, td } = useAppPreferences();
  const {
    comparedProjectIds,
    clearComparedProjects,
    savedResidenceIds,
    toggleComparedProject,
    toggleSavedResidence,
  } = useInvestmentWorkspace();
  const initialProjectDistrict = initialDistrictFilter
    ? getProjectDistrictForDistrictFilter(initialDistrictFilter.ctaDistrictFilter) ??
      `district-filter:${initialDistrictFilter.ctaDistrictFilter}`
    : undefined;
  const districtLabelOverrides = initialDistrictFilter && initialProjectDistrict
    ? {
        [initialProjectDistrict]: `${td(initialDistrictFilter.displayName)} · ${td(
          initialDistrictFilter.urbanZoneDisplayName,
        )}`,
      }
    : undefined;
  const [filters, setFilters] = useState<ProjectFilters>({
    ...defaultFilters,
    ...buyerGoal?.filters,
    ...(initialProjectDistrict ? { district: initialProjectDistrict } : {}),
  });
  const [sortBy, setSortBy] = useState<ProjectSortOption>("newest-listed");
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => matchesFilters(project, filters))
      .sort((a, b) => sortProjects(a, b, sortBy));
  }, [projects, filters, sortBy]);

  const districtOptions = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .filter((project) => project.city === filters.city)
            .map((project) => project.district),
        ),
      ).sort(),
    [projects, filters.city],
  );

  function updateFilter<K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) {
    setFilters((current) => {
      if (key === "city") {
        return { ...current, city: value as ProjectFilters["city"], district: "All" };
      }

      return { ...current, [key]: value };
    });
  }

  return (
    <div>
      {buyerGoal ? (
        <section className="mb-10 rounded-sm border border-[#ECE7DA] bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            {t("guidedRecommendationPath")}
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold text-[#1F2937]">
                {td(buyerGoal.title)} {t("recommendations")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(buyerGoal.summary)}</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(buyerGoal.whyItFits)}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                {t("recommendedDistricts")}
              </p>
              <div className="flex flex-wrap gap-2">
                {buyerGoal.recommendedDistricts.map((district) => (
                  <span
                    className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]"
                    key={district}
                  >
                    {td(district)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <ProjectFilter
        districtLabelOverrides={districtLabelOverrides}
        districtOptions={districtOptions}
        filters={filters}
        resultCount={filteredProjects.length}
        totalCount={projects.length}
        onFilterChange={updateFilter}
        onReset={() => {
          setFilters({ ...defaultFilters, ...buyerGoal?.filters });
          setSortBy("newest-listed");
        }}
      />

      {initialDistrictFilter && filters.district !== "All" ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-sm border border-[#ECE7DA] bg-white px-4 py-3 shadow-sm">
          <span className="rounded-full bg-[#FFF8E8] px-3 py-1.5 text-sm font-semibold text-[#1F2937]">
            {td(initialDistrictFilter.displayName)}
            <span className="hidden text-[#6B7280] sm:inline">
              {" · "}
              {td(initialDistrictFilter.urbanZoneDisplayName)}
            </span>
          </span>
          <button
            className="text-sm font-semibold text-[#6B7280] hover:text-[#1F2937]"
            type="button"
            onClick={() => setFilters((current) => ({ ...current, district: "All" }))}
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : null}

      <div className="mt-10 flex justify-end">
        <SortControl sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            isCompared={comparedProjectIds.includes(project.id)}
            isCompareDisabled={comparedProjectIds.length >= 3}
            isShortlisted={savedResidenceIds.includes(project.id)}
            key={project.id}
            project={project}
            onCompareToggle={toggleComparedProject}
            onShortlistToggle={toggleSavedResidence}
          />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-8 rounded-sm border border-[#ECE7DA] bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-[#1F2937]">
            {initialDistrictFilter ? t("noResidencesForDistrict") : t("noProjectsFound")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">
            {t("noProjectsFoundDescription")}
          </p>
        </div>
      ) : null}

      <ProjectComparePanel
        isOpen={isCompareOpen}
        projects={projects}
        onClose={() => setIsCompareOpen(false)}
      />

      <ProjectCompareBar
        comparedProjectIds={comparedProjectIds}
        projects={projects}
        onClear={() => {
          clearComparedProjects();
          setIsCompareOpen(false);
        }}
        onOpen={() => setIsCompareOpen(true)}
      />
    </div>
  );
}

function ProjectCompareBar({
  comparedProjectIds,
  onClear,
  onOpen,
  projects,
}: {
  comparedProjectIds: string[];
  onClear: () => void;
  onOpen: () => void;
  projects: Project[];
}) {
  const { t, td } = useAppPreferences();
  const selectedProjects = comparedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  if (selectedProjects.length === 0) return null;

  return (
    <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-1/2 z-[95] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-sm border border-[#E2D6B8] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1F2937]">{t("projectsSelected", { count: selectedProjects.length })}</p>
          <p className="mt-1 hidden truncate text-xs text-[#6B7280] sm:block">
            {selectedProjects.map((project) => td(project.projectName)).join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            className="premium-focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#F5C84C] px-3 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
            onClick={onOpen}
            type="button"
          >
            <CompareIcon />
            {t("compareProjects")}
          </button>
          <button
            className="premium-focus-ring min-h-10 rounded-sm border border-[#D8CDAF] bg-white px-3 text-sm font-semibold text-[#4B5563] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8] hover:text-[#1F2937]"
            onClick={onClear}
            type="button"
          >
            {t("clear")}
          </button>
        </div>
      </div>
    </div>
  );
}

function matchesFilters(project: Project, filters: ProjectFilters) {
  return (
    project.city === filters.city &&
    (filters.district === "All" || project.district === filters.district) &&
    (filters.completionStatus === "All" ||
      project.completionStatus === filters.completionStatus) &&
    (filters.ownership === "All" || project.foreignOwnershipStatus === filters.ownership) &&
    matchesBudget(getStartingPrice(project), filters.budget)
  );
}

function matchesBudget(startingPriceUsd: number, budget: ProjectFilters["budget"]) {
  switch (budget) {
    case "under-200k":
      return startingPriceUsd < 200000;
    case "200k-400k":
      return startingPriceUsd >= 200000 && startingPriceUsd < 400000;
    case "400k-plus":
      return startingPriceUsd >= 400000;
    case "All":
      return true;
  }
}

function sortProjects(a: Project, b: Project, sortBy: ProjectSortOption) {
  switch (sortBy) {
    case "newest-listed":
      return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    case "oldest-listed":
      return new Date(a.listedAt).getTime() - new Date(b.listedAt).getTime();
    case "price-asc":
      return getStartingPrice(a) - getStartingPrice(b);
    case "price-desc":
      return getStartingPrice(b) - getStartingPrice(a);
  }
}

function getStartingPrice(project: Project) {
  return Math.min(...project.availableUnits.map((unit) => unit.priceUsd));
}

function SortControl({
  sortBy,
  onSortChange,
}: {
  sortBy: ProjectSortOption;
  onSortChange: (value: ProjectSortOption) => void;
}) {
  const { t } = useAppPreferences();

  return (
    <label className="grid w-full gap-2 text-sm font-semibold text-[#6B7280] sm:w-64">
      {t("sortBy")}
      <select
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal text-[#1F2937] outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as ProjectSortOption)}
      >
        {PROPERTY_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {getSortLabel(option.value, t)}
          </option>
        ))}
      </select>
    </label>
  );
}

function getSortLabel(value: ProjectSortOption, t: ReturnType<typeof useAppPreferences>["t"]) {
  switch (value) {
    case "newest-listed":
      return t("newestListed");
    case "oldest-listed":
      return t("oldestListed");
    case "price-asc":
      return t("lowestPrice");
    case "price-desc":
      return t("highestPrice");
  }
}
