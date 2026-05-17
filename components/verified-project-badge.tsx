import type { VerifiedProjectLevel } from "@/types/property";

const badgeStyles: Record<VerifiedProjectLevel, string> = {
  Verified: "bg-[#123c2b] text-white",
  "Enhanced due diligence": "bg-[#efe5d1] text-[#6b4e18]",
  "Pre-check": "bg-[#edf1f0] text-[#315449]",
};

export function VerifiedProjectBadge({
  level,
  summary,
}: {
  level: VerifiedProjectLevel;
  summary?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex min-h-8 items-center rounded-sm px-3 text-xs font-semibold uppercase tracking-[0.12em] ${badgeStyles[level]}`}
      >
        {level} project
      </span>
      {summary ? <span className="text-xs leading-5 text-[#6d746f]">{summary}</span> : null}
    </div>
  );
}
