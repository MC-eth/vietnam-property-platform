"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { BuyerDeal } from "@/types/deal";

type NextActionCardProps = {
  deal: BuyerDeal;
};

export function NextActionCard({ deal }: NextActionCardProps) {
  const { t, td } = useAppPreferences();
  const currentStage = deal.stageDetails.find((stage) => stage.status === "current");

  return (
    <article className="rounded-sm border border-[#F5C84C] bg-[#FFFDF8] p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("nextBuyerAction")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        {td(deal.nextAction)}
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Meta label={t("currentStage")} value={td(deal.currentStage)} />
        <Meta label={t("responsibleParty")} value={td(currentStage?.responsibleParty ?? "Advisor")} />
        <Meta label={t("targetDate")} value={td(currentStage?.expectedDate ?? "To be confirmed")} />
      </div>
      <p className="mt-5 text-xs leading-6 text-[#6B7280]">
        {t("nextActionDisclaimer")}
      </p>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#1F2937]">{value}</p>
    </div>
  );
}
