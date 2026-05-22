"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { DealStage, DealStageDetail, DealStatus } from "@/types/deal";

type DealStageCardProps = {
  stage: DealStage;
  status: DealStatus;
  index: number;
  detail?: DealStageDetail;
};

const statusStyles: Record<DealStatus, string> = {
  completed: "border-[#F5C84C]/30 bg-[#f1f7f3] text-[#1F2937]",
  current: "border-[#F5C84C] bg-[#FFFDF8] text-[#1F2937]",
  upcoming: "border-[#ECE7DA] bg-[#FFFDF8] text-[#6B7280]",
  blocked: "border-[#b96b5d]/40 bg-[#fff3f0] text-[#7a3126]",
};

export function DealStageCard({ stage, status, index, detail }: DealStageCardProps) {
  const { t, td } = useAppPreferences();

  return (
    <article className={`rounded-sm border p-4 ${statusStyles[status]}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            status === "completed"
              ? "bg-[#F5C84C] text-[#1F2937]"
              : status === "current"
                ? "bg-[#F5C84C] text-[#1F2937]"
                : "bg-white text-[#6B7280]"
          }`}
        >
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5">{td(stage)}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] opacity-70">
            {td(status)}
          </p>
        </div>
      </div>
      {detail ? (
        <div className="mt-4 grid gap-2 border-t border-current/10 pt-4 text-xs leading-5">
          <StageMeta label={t("responsible")} value={td(detail.responsibleParty)} />
          <StageMeta label={t("expected")} value={td(detail.expectedDate)} />
          <StageMeta label={t("nextAction")} value={td(detail.nextAction)} />
        </div>
      ) : null}
    </article>
  );
}

function StageMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold uppercase tracking-[0.1em] opacity-60">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
