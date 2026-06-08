"use client";

import { useRef } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { DistrictTimelineItem } from "@/types/district";

export function DistrictTimeline({ items }: { items: DistrictTimelineItem[] }) {
  const { td, language } = useAppPreferences();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollTimeline(direction: "previous" | "next") {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      left: direction === "next" ? scroller.clientWidth * 0.82 : -scroller.clientWidth * 0.82,
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TimelineLegend />
        {items.length > 4 ? (
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label={td("Previous timeline milestones")}
              className="premium-focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CDAF] bg-white text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
              onClick={() => scrollTimeline("previous")}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-label={td("Next timeline milestones")}
              className="premium-focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CDAF] bg-white text-[#1F2937] transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
              onClick={() => scrollTimeline("next")}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-7 sm:hidden">
        <div className="grid gap-0">
          {items.map((item, index) => (
            <MobileTimelineItem item={item} key={item.id ?? `${item.yearLabel ?? item.year}-${item.title}`} language={language} isLast={index === items.length - 1} />
          ))}
        </div>
      </div>

      <div className="relative mt-8 hidden sm:block">
        <div
          className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:thin] [scrollbar-color:#D8CDAF_transparent]"
          ref={scrollerRef}
          tabIndex={0}
        >
          {items.map((item, index) => (
            <DesktopTimelineItem
              item={item}
              key={item.id ?? `${item.yearLabel ?? item.year}-${item.title}`}
              language={language}
              showConnector={index < items.length - 1}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 max-w-3xl text-xs leading-6 text-[#8A7B58]">
        {td("Future milestones are based on publicly reported plans and remain subject to official updates and actual delivery.")}
      </p>
    </div>
  );
}

function TimelineLegend() {
  const { td } = useAppPreferences();
  const items = [
    { label: "Completed", marker: "bg-[#B88A18]" },
    { label: "Current", marker: "bg-[#F5C84C] shadow-[0_0_0_6px_rgba(245,200,76,0.18)]" },
    { label: "Future", marker: "border border-[#B88A18] bg-white" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className="inline-flex items-center gap-2 rounded-full border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#4B5563]"
          key={item.label}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${item.marker}`} />
          {td(item.label)}
        </span>
      ))}
    </div>
  );
}

function DesktopTimelineItem({
  item,
  language,
  showConnector,
}: {
  item: DistrictTimelineItem;
  language: "en" | "zh-Hant";
  showConnector: boolean;
}) {
  const phase = getTimelinePhase(item);
  const content = getTimelineContent(item, language);

  return (
    <article className="relative min-w-[calc(50%_-_0.5rem)] snap-start pt-8 md:min-w-[calc(33.333%_-_0.75rem)] xl:min-w-[calc(25%_-_0.75rem)]">
      {showConnector ? (
        <div
          className={`absolute left-6 right-[-1rem] top-[15px] border-t ${
            phase === "future" ? "border-dashed border-[#D8CDAF]" : "border-solid border-[#E7B93D]/80"
          }`}
        />
      ) : null}
      <span
        className={`absolute left-2 top-[8px] h-4 w-4 rounded-full ring-4 ring-white ${getNodeClass(phase)}`}
        title={content.status}
      />
      <div className={`h-full rounded-2xl border p-4 shadow-sm ${getCardClass(phase)}`}>
        <TimelineCardContent content={content} />
      </div>
    </article>
  );
}

function MobileTimelineItem({
  item,
  language,
  isLast,
}: {
  item: DistrictTimelineItem;
  language: "en" | "zh-Hant";
  isLast: boolean;
}) {
  const phase = getTimelinePhase(item);
  const content = getTimelineContent(item, language);

  return (
    <article className="grid grid-cols-[24px_1fr] gap-4">
      <div className="relative">
        {!isLast ? (
          <div
            className={`absolute left-[7px] top-5 h-full border-l ${
              phase === "future" ? "border-dashed border-[#D8CDAF]" : "border-solid border-[#E7B93D]/80"
            }`}
          />
        ) : null}
        <span className={`absolute left-0 top-2 h-4 w-4 rounded-full ring-4 ring-white ${getNodeClass(phase)}`} />
      </div>
      <div className="pb-5">
        <div className={`rounded-2xl border p-4 shadow-sm ${getCardClass(phase)}`}>
          <TimelineCardContent content={content} />
        </div>
      </div>
    </article>
  );
}

function TimelineCardContent({
  content,
}: {
  content: {
    description: string;
    status: string;
    title: string;
    year: string;
  };
}) {
  const { td } = useAppPreferences();

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#D8CDAF] bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#8A6B16]">
          {content.year}
        </span>
        <span className="rounded-full border border-[#ECE7DA] bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
          {td(content.status)}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-6 text-[#1F2937]">
        {content.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        {content.description}
      </p>
    </>
  );
}

function getTimelineContent(item: DistrictTimelineItem, language: "en" | "zh-Hant") {
  return {
    description: language === "zh-Hant" ? item.descriptionZh ?? item.description : item.description,
    status: language === "zh-Hant" ? item.statusZh ?? item.status : item.status,
    title: language === "zh-Hant" ? item.titleZh ?? item.title : item.title,
    year: item.yearLabel ?? item.year ?? "",
  };
}

function getTimelinePhase(item: DistrictTimelineItem) {
  if (item.phase) return item.phase;
  if (item.isFuture || item.status === "Planned" || item.status === "Indicative" || item.status === "Planning Horizon") return "future";
  if (item.status === "Announced" || item.status === "Approved Policy" || item.status === "Under Construction" || item.status === "Targeted") return "current";
  return "past";
}

function getNodeClass(phase: "past" | "current" | "future") {
  if (phase === "current") return "bg-[#F5C84C] shadow-[0_0_0_7px_rgba(245,200,76,0.18)]";
  if (phase === "future") return "border border-[#B88A18] bg-white";
  return "bg-[#B88A18]";
}

function getCardClass(phase: "past" | "current" | "future") {
  if (phase === "current") return "border-[#E7B93D]/60 bg-[#FFF8E5]";
  if (phase === "future") return "border-[#ECE7DA] bg-[#FFFDF8]/80";
  return "border-[#ECE7DA] bg-white";
}
