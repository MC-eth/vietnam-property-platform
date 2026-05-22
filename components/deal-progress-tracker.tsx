"use client";

import { DEAL_STAGES } from "@/constants/deal-stages";
import { DealStageCard } from "@/components/deal-stage-card";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { BuyerDeal } from "@/types/deal";

type DealProgressTrackerProps = {
  deal: BuyerDeal;
};

export function DealProgressTracker({ deal }: DealProgressTrackerProps) {
  const { t } = useAppPreferences();

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("dealProgressTracker")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        {t("dealProgressTitle")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
        {t("dealProgressDescription")}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {DEAL_STAGES.map((stage, index) => (
          <DealStageCard
            detail={deal.stageDetails.find((detail) => detail.stage === stage)}
            index={index}
            key={stage}
            stage={stage}
            status={deal.stageStatuses[stage] ?? "upcoming"}
          />
        ))}
      </div>
    </section>
  );
}
