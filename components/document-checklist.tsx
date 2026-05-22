"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { DealDocument, DealDocumentStatus } from "@/types/deal";

type DocumentChecklistProps = {
  documents: DealDocument[];
};

const statusStyles: Record<DealDocumentStatus, string> = {
  approved: "bg-[#F5C84C] text-[#1F2937]",
  uploaded: "bg-[#F5C84C] text-[#1F2937]",
  "under review": "bg-[#FFFDF8] text-[#1F2937]",
  required: "bg-[#7a3126] text-white",
  missing: "bg-[#edf1f0] text-[#6B7280]",
};

export function DocumentChecklist({ documents }: DocumentChecklistProps) {
  const { t, td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("documentChecklist")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        {t("documentChecklistTitle")}
      </h2>
      <div className="mt-6 grid gap-3">
        {documents.map((document) => (
          <div
            className="flex items-center justify-between gap-4 rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4"
            key={document.name}
          >
            <div>
              <p className="text-sm font-semibold text-[#1F2937]">{td(document.name)}</p>
              <p className="mt-1 text-xs text-[#6B7280]">{td(document.note)}</p>
            </div>
            <span
              className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${statusStyles[document.status]}`}
            >
              {td(document.status)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
