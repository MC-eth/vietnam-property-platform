"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { InvestmentScore } from "@/types/property";

type InvestmentScoreBadgeProps = {
  score: InvestmentScore;
  compact?: boolean;
};

export function InvestmentScoreBadge({ score, compact = false }: InvestmentScoreBadgeProps) {
  const { t, td } = useAppPreferences();

  return (
    <div
      className={`rounded-sm border border-[#F5C84C]/70 bg-[#F5C84C] text-[#1F2937] ${
        compact ? "px-3 py-2" : "p-5"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1F2937]">
        {t("investmentScore")}
      </p>
      <div className="mt-2 flex items-end gap-2">
        <p className={compact ? "text-2xl font-semibold" : "text-5xl font-semibold"}>
          {score.total.toFixed(1)}
        </p>
        <p className="pb-1 text-sm font-semibold text-[#1F2937]/70">/ 10</p>
      </div>
      {!compact ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1F2937]/72">
          {td(score.label)} {t("investmentProfile")}
        </p>
      ) : null}
    </div>
  );
}
