import type { InvestmentScore } from "@/types/property";

type InvestmentScoreBadgeProps = {
  score: InvestmentScore;
  compact?: boolean;
};

export function InvestmentScoreBadge({ score, compact = false }: InvestmentScoreBadgeProps) {
  return (
    <div
      className={`rounded-sm border border-[#d7bd7d]/70 bg-[#123c2b] text-white ${
        compact ? "px-3 py-2" : "p-5"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d7bd7d]">
        Investment score
      </p>
      <div className="mt-2 flex items-end gap-2">
        <p className={compact ? "text-2xl font-semibold" : "text-5xl font-semibold"}>
          {score.total.toFixed(1)}
        </p>
        <p className="pb-1 text-sm font-semibold text-white/70">/ 10</p>
      </div>
      {!compact ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/72">
          {score.label} investment profile
        </p>
      ) : null}
    </div>
  );
}
