"use client";

import { useState } from "react";
import { CompareIcon } from "@/components/workspace-action-buttons";
import { UnitComparePanel } from "@/components/unit-compare-panel";
import { useInvestmentWorkspace } from "@/context/investment-workspace-context";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { Project } from "@/types/project";

export function UnitCompareWorkspace({ projects }: { projects: Project[] }) {
  const { comparedUnitKeys, clearComparedUnits } = useInvestmentWorkspace();
  const { t } = useAppPreferences();
  const [isOpen, setIsOpen] = useState(false);

  if (comparedUnitKeys.length === 0) return null;

  return (
    <>
      <UnitComparePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projects={projects}
      />
      <div className="fixed inset-x-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[70] mx-auto max-w-2xl rounded-full border border-[#ECE7DA] bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(31,41,55,0.14)] backdrop-blur sm:bottom-6 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1F2937]">
              {t("unitsSelected", { count: comparedUnitKeys.length })}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              className="premium-focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
              onClick={() => setIsOpen(true)}
              type="button"
            >
              <CompareIcon />
              {t("compareUnits")}
            </button>
            <button
              className="premium-focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-[#D8CDAF] bg-white px-4 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
              onClick={() => {
                clearComparedUnits();
                setIsOpen(false);
              }}
              type="button"
            >
              {t("clear")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
