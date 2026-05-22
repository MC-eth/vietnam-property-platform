"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { InvestmentInsight } from "@/types/rental";

type InvestmentInsightPanelProps = {
  insights: InvestmentInsight[];
};

export function InvestmentInsightPanel({ insights }: InvestmentInsightPanelProps) {
  const { t, td } = useAppPreferences();

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 text-[#1F2937] shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1F2937]">
        {t("mockInvestmentIntelligence")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        {t("investmentInsightsTitle")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
        {t("investmentInsightsDescription")}
      </p>
      <div className="mt-6 grid gap-4">
        {insights.map((insight) => (
          <article className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4" key={insight.id}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <h3 className="text-lg font-semibold">{td(insight.title)}</h3>
              <span className="w-fit rounded-sm bg-[#F5C84C] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]">
                {td(insight.confidence)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(insight.summary)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
