import type { DealDocument, DealDocumentStatus } from "@/types/deal";

type DocumentChecklistProps = {
  documents: DealDocument[];
};

const statusStyles: Record<DealDocumentStatus, string> = {
  received: "bg-[#123c2b] text-white",
  reviewing: "bg-[#d7bd7d] text-[#16231d]",
  required: "bg-[#7a3126] text-white",
  "not-started": "bg-[#edf1f0] text-[#5b645f]",
};

export function DocumentChecklist({ documents }: DocumentChecklistProps) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
        Document checklist
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
        Transaction documents for overseas buyers.
      </h2>
      <div className="mt-6 grid gap-3">
        {documents.map((document) => (
          <div
            className="flex items-center justify-between gap-4 rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-4"
            key={document.name}
          >
            <div>
              <p className="text-sm font-semibold text-[#16231d]">{document.name}</p>
              <p className="mt-1 text-xs text-[#6d746f]">{document.note}</p>
            </div>
            <span
              className={`shrink-0 rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${statusStyles[document.status]}`}
            >
              {document.status.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

