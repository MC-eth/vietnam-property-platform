"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { VerifiedProjectChecks, VerifiedProjectLevel } from "@/types/property";

const badgeStyles: Record<VerifiedProjectLevel, string> = {
  Verified: "bg-[#F5C84C] text-[#1F2937]",
  "Enhanced due diligence": "bg-[#efe5d1] text-[#1F2937]",
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
  const { t, td } = useAppPreferences();
  const passedChecks = checks ? Object.values(checks).filter(Boolean).length : null;

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex min-h-8 items-center rounded-sm px-3 text-xs font-semibold uppercase tracking-[0.12em] ${badgeStyles[level]}`}
        >
          {td(level)} {t("project")}
        </span>
        {passedChecks !== null ? (
          <span className="inline-flex min-h-8 items-center rounded-sm border border-[#ECE7DA] bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            {t("checksCount", { passedChecks })}
          </span>
        ) : null}
      </div>
      {summary ? <span className="text-xs leading-5 text-[#6B7280]">{td(summary)}</span> : null}
      {checks && showChecks ? <VerificationChecklist checks={checks} /> : null}
    </div>
  );
}

function VerificationChecklist({ checks }: { checks: VerifiedProjectChecks }) {
  const { t } = useAppPreferences();
  const items = [
    { label: t("foreignQuota"), passed: checks.foreignQuotaChecked },
    { label: t("developer"), passed: checks.developerReviewed },
    { label: t("legal"), passed: checks.legalReviewed },
    { label: t("rentalDemand"), passed: checks.rentalDemandReviewed },
    { label: t("riskLevel"), passed: checks.riskLevelReviewed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className={`rounded-sm px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
            item.passed ? "bg-[#edf5ef] text-[#1F2937]" : "bg-[#FFFDF8] text-[#6B7280]"
          }`}
          key={item.label}
        >
          {item.passed ? t("checked") : t("pending")} · {item.label}
        </span>
      ))}
    </div>
  );
}
