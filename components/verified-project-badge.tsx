import type { VerifiedProjectChecks, VerifiedProjectLevel } from "@/types/property";

const badgeStyles: Record<VerifiedProjectLevel, string> = {
  Verified: "bg-[#123c2b] text-white",
  "Enhanced due diligence": "bg-[#efe5d1] text-[#6b4e18]",
  "Pre-check": "bg-[#edf1f0] text-[#315449]",
};

export function VerifiedProjectBadge({
  level,
  summary,
  checks,
  showChecks = false,
}: {
  level: VerifiedProjectLevel;
  summary?: string;
  checks?: VerifiedProjectChecks;
  showChecks?: boolean;
}) {
  const passedChecks = checks ? Object.values(checks).filter(Boolean).length : null;

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex min-h-8 items-center rounded-sm px-3 text-xs font-semibold uppercase tracking-[0.12em] ${badgeStyles[level]}`}
        >
          {level} project
        </span>
        {passedChecks !== null ? (
          <span className="inline-flex min-h-8 items-center rounded-sm border border-[#e1dbd0] bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#4f5a54]">
            {passedChecks}/5 checks
          </span>
        ) : null}
      </div>
      {summary ? <span className="text-xs leading-5 text-[#6d746f]">{summary}</span> : null}
      {checks && showChecks ? <VerificationChecklist checks={checks} /> : null}
    </div>
  );
}

function VerificationChecklist({ checks }: { checks: VerifiedProjectChecks }) {
  const items = [
    { label: "Foreign quota", passed: checks.foreignQuotaChecked },
    { label: "Developer", passed: checks.developerReviewed },
    { label: "Legal", passed: checks.legalReviewed },
    { label: "Rental demand", passed: checks.rentalDemandReviewed },
    { label: "Risk level", passed: checks.riskLevelReviewed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className={`rounded-sm px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
            item.passed ? "bg-[#edf5ef] text-[#123c2b]" : "bg-[#f3efe8] text-[#7a817c]"
          }`}
          key={item.label}
        >
          {item.passed ? "Checked" : "Pending"} · {item.label}
        </span>
      ))}
    </div>
  );
}
