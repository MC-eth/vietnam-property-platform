"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import {
  getUnitWorkspaceKey,
  useInvestmentWorkspace,
} from "@/context/investment-workspace-context";

type ProjectWorkspaceActionsProps = {
  projectId: string;
  compact?: boolean;
};

export function ProjectWorkspaceActions({
  compact = false,
  projectId,
}: ProjectWorkspaceActionsProps) {
  const { t } = useAppPreferences();
  const {
    comparedProjectIds,
    savedResidenceIds,
    toggleComparedProject,
    toggleSavedResidence,
  } = useInvestmentWorkspace();
  const isCompared = comparedProjectIds.includes(projectId);
  const isSaved = savedResidenceIds.includes(projectId);

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-4"}`}>
      <ActionButton
        active={isCompared}
        icon={<CompareIcon />}
        label={isCompared ? t("selected") : t("compare")}
        onClick={() => toggleComparedProject(projectId)}
      />
      <ActionButton
        active={isSaved}
        icon={<HeartIcon filled={isSaved} />}
        label={isSaved ? t("saved") : t("save")}
        onClick={() => toggleSavedResidence(projectId)}
      />
    </div>
  );
}

type UnitWorkspaceActionsProps = {
  projectSlug: string;
  unitId: string;
  compact?: boolean;
};

export function UnitWorkspaceActions({
  compact = false,
  projectSlug,
  unitId,
}: UnitWorkspaceActionsProps) {
  const { t } = useAppPreferences();
  const {
    comparedUnitKeys,
    savedUnitKeys,
    toggleComparedUnit,
    toggleSavedUnit,
  } = useInvestmentWorkspace();
  const unitKey = getUnitWorkspaceKey(projectSlug, unitId);
  const isCompared = comparedUnitKeys.includes(unitKey);
  const isSaved = savedUnitKeys.includes(unitKey);

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-4"}`}>
      <ActionButton
        active={isCompared}
        icon={<CompareIcon />}
        label={isCompared ? t("selected") : t("compare")}
        onClick={() => toggleComparedUnit(projectSlug, unitId)}
      />
      <ActionButton
        active={isSaved}
        icon={<HeartIcon filled={isSaved} />}
        label={isSaved ? t("saved") : t("save")}
        onClick={() => toggleSavedUnit(projectSlug, unitId)}
      />
    </div>
  );
}

function ActionButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className={`premium-focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-3 text-sm font-semibold transition ${
        active
          ? "border-[#F5C84C] bg-[#FFF7D6] text-[#1F2937]"
          : "border-[#D8CDAF] bg-white text-[#4B5563] hover:border-[#E7B93D] hover:bg-[#FFF8E8] hover:text-[#1F2937]"
      }`}
      onClick={onClick}
      title={label}
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function CompareIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 7h12m0 0-3-3m3 3-3 3M17 17H5m0 0 3 3m-3-3 3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
    >
      <path
        d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.6 4.6 0 0 1 12 5.9a4.6 4.6 0 0 1 8.8 2.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}
