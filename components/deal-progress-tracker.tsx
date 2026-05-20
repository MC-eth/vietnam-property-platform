import { DEAL_STAGES } from "@/constants/deal-stages";
import { DealStageCard } from "@/components/deal-stage-card";
import type { BuyerDeal } from "@/types/deal";

type DealProgressTrackerProps = {
  deal: BuyerDeal;
};

export function DealProgressTracker({ deal }: DealProgressTrackerProps) {
  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
        Deal progress tracker
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
        Transparent transaction progress for overseas buyers.
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#5b645f]">
        Mock operating-system view for enquiry, advisor work, legal review, payment,
        handover, and rental setup. Future backend integration can map these stages
        to real CRM and transaction records.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {DEAL_STAGES.map((stage, index) => (
          <DealStageCard
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
