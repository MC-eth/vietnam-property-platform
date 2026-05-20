import type { InvestmentInsight } from "@/types/rental";

type InvestmentInsightPanelProps = {
  insights: InvestmentInsight[];
};

export function InvestmentInsightPanel({ insights }: InvestmentInsightPanelProps) {
  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-[#101c16] p-6 text-white shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d7bd7d]">
        Mock investment intelligence
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        AI-style insights for portfolio decisions.
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/65">
        Simulated guidance only. No AI model, live data, or backend is connected in this MVP.
      </p>
      <div className="mt-6 grid gap-4">
        {insights.map((insight) => (
          <article className="rounded-sm border border-white/10 bg-white/6 p-4" key={insight.id}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <h3 className="text-lg font-semibold">{insight.title}</h3>
              <span className="w-fit rounded-sm bg-[#d7bd7d] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#16231d]">
                {insight.confidence}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">{insight.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

