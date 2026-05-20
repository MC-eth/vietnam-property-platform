import type { DealStage, DealStatus } from "@/types/deal";

type DealStageCardProps = {
  stage: DealStage;
  status: DealStatus;
  index: number;
};

const statusStyles: Record<DealStatus, string> = {
  completed: "border-[#123c2b]/30 bg-[#f1f7f3] text-[#123c2b]",
  current: "border-[#d7bd7d] bg-[#fff8e8] text-[#16231d]",
  upcoming: "border-[#eee8de] bg-[#fbfaf7] text-[#6d746f]",
  blocked: "border-[#b96b5d]/40 bg-[#fff3f0] text-[#7a3126]",
};

const statusLabels: Record<DealStatus, string> = {
  completed: "Complete",
  current: "Current",
  upcoming: "Upcoming",
  blocked: "Blocked",
};

export function DealStageCard({ stage, status, index }: DealStageCardProps) {
  return (
    <article className={`rounded-sm border p-4 ${statusStyles[status]}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            status === "completed"
              ? "bg-[#123c2b] text-white"
              : status === "current"
                ? "bg-[#d7bd7d] text-[#16231d]"
                : "bg-white text-[#6d746f]"
          }`}
        >
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5">{stage}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] opacity-70">
            {statusLabels[status]}
          </p>
        </div>
      </div>
    </article>
  );
}

