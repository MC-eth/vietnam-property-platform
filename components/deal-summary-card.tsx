"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { BuyerDeal } from "@/types/deal";

type DealSummaryCardProps = {
  deal: BuyerDeal;
};

export function DealSummaryCard({ deal }: DealSummaryCardProps) {
  const { t, td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("activeBuyerDeal")}
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-[#1F2937]">{deal.propertyName}</h2>
          <p className="mt-2 text-sm leading-7 text-[#6B7280]">
            {deal.buyerName} · {td(deal.city)}
          </p>
        </div>
        <div className="rounded-sm bg-[#F5C84C] px-4 py-3 text-[#1F2937]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1F2937]">
            {t("currentStage")}
          </p>
          <p className="mt-1 text-sm font-semibold">{td(deal.currentStage)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryItem label={t("nextActionRequired")} value={td(deal.nextAction)} />
        <SummaryItem label={t("assignedAdvisor")} value={deal.assignedAdvisor} />
        <SummaryItem label={t("localVietnamAgent")} value={deal.assignedLocalAgent} />
      </div>

      <div className="mt-6 border-t border-[#ECE7DA] pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          {t("keyDates")}
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {deal.keyDates.map((item) => (
            <div className="rounded-sm bg-[#FFFDF8] p-4" key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
                {td(item.label)}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#1F2937]">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#1F2937]">{value}</p>
    </div>
  );
}
