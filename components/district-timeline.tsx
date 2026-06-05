import { TD } from "@/components/localized-text";
import type { DistrictTimelineItem } from "@/types/district";

export function DistrictTimeline({ items }: { items: DistrictTimelineItem[] }) {
  return (
    <div className="grid gap-0">
      {items.map((item, index) => {
        const isFuture =
          item.isFuture ||
          item.status === "Planned" ||
          item.status === "Indicative" ||
          item.year.includes("+");
        const isCurrent = item.status === "Under Construction" || item.status === "Announced";

        return (
          <article className="grid grid-cols-[72px_1fr] gap-4 sm:grid-cols-[96px_1fr]" key={`${item.year}-${item.title}`}>
            <div className="pt-1 text-sm font-semibold text-[#1F2937] sm:text-base">{item.year}</div>
            <div className="relative pb-6 sm:pb-8">
              {index < items.length - 1 ? (
                <div
                  className={`absolute left-0 top-5 h-full border-l ${
                    isFuture ? "border-dashed border-[#D8CDAF]" : "border-solid border-[#E7B93D]/75"
                  }`}
                />
              ) : null}
              <span
                className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                  isCurrent ? "bg-[#F5C84C]" : isFuture ? "border border-[#E7B93D] bg-white" : "bg-[#E7B93D]"
                }`}
              />
              <div
                className={`ml-6 rounded-2xl border p-4 shadow-sm sm:p-5 ${
                  isCurrent
                    ? "border-[#E7B93D]/55 bg-[#FFF8E5]"
                    : "border-[#ECE7DA] bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-[#1F2937]">
                    <TD value={item.title} />
                  </h3>
                  <span className="rounded-full border border-[#ECE7DA] bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
                    <TD value={item.status} />
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280]">
                  <TD value={item.description} />
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
