import type { BuyerDeal } from "@/types/deal";

type DealSummaryCardProps = {
  deal: BuyerDeal;
};

export function DealSummaryCard({ deal }: DealSummaryCardProps) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
        Active buyer deal
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-[#16231d]">{deal.propertyName}</h2>
          <p className="mt-2 text-sm leading-7 text-[#5b645f]">
            {deal.buyerName} · {deal.city}
          </p>
        </div>
        <div className="rounded-sm bg-[#123c2b] px-4 py-3 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d7bd7d]">
            Current stage
          </p>
          <p className="mt-1 text-sm font-semibold">{deal.currentStage}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryItem label="Next action required" value={deal.nextAction} />
        <SummaryItem label="Assigned advisor" value={deal.assignedAdvisor} />
        <SummaryItem label="Local Vietnam agent" value={deal.assignedLocalAgent} />
      </div>

      <div className="mt-6 border-t border-[#eee8de] pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7a817c]">
          Key dates
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {deal.keyDates.map((item) => (
            <div className="rounded-sm bg-[#f3efe8] p-4" key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a817c]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#16231d]">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#16231d]">{value}</p>
    </div>
  );
}

