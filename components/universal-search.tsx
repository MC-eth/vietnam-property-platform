"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  groupUniversalSearchResults,
  searchUniversalContent,
  type UniversalSearchGroupKey,
  type UniversalSearchResult,
} from "@/lib/universal-search";

type QuickSuggestion = {
  label: string;
  labelZh: string;
  href?: string;
  query?: string;
};

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { label: "Thu Thiem (District 2)", labelZh: "守添（第2郡）", href: "/districts/thu-thiem" },
  { label: "Thao Dien (District 2)", labelZh: "Thao Dien（第2郡）", href: "/districts/thao-dien" },
  { label: "District 1 (CBD)", labelZh: "第一郡（CBD）", href: "/districts/district-1-cbd" },
  { label: "Phu My Hung (District 7)", labelZh: "富美興（第7郡）", href: "/districts/district-7" },
  { label: "Binh Thanh", labelZh: "平盛區", href: "/districts/binh-thanh" },
  { label: "Tay Ho (Hanoi)", labelZh: "西湖郡（河內）", query: "Tay Ho (Hanoi)" },
];

const GROUP_ORDER: UniversalSearchGroupKey[] = ["districts", "residences", "learn"];

export function UniversalSearch() {
  const router = useRouter();
  const inputId = useId();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { language, t, td } = useAppPreferences();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(
    () => (query.trim().length >= 2 ? searchUniversalContent(query, 8) : []),
    [query],
  );
  const groupedResults = useMemo(() => groupUniversalSearchResults(results), [results]);
  const hasResults = results.length > 0;
  const shouldShowDropdown = isOpen && query.trim().length >= 2;
  const activeResult = activeIndex >= 0 ? results[activeIndex] : undefined;

  function submitSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      inputRef.current?.focus();
      return;
    }

    if (activeResult) {
      router.push(activeResult.href);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown" && hasResults) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp" && hasResults) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="rounded-[28px] border border-white/20 bg-[#0F172A]/72 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <label className="sr-only" htmlFor={inputId}>
              {td("Search districts, residences or guides")}
            </label>
            <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 text-white/62 sm:block">
              <SearchIcon />
            </span>
            <input
              aria-activedescendant={activeResult ? `${listboxId}-${activeResult.id}` : undefined}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={shouldShowDropdown}
              aria-label={td("Search districts, residences or guides")}
              className="premium-focus-ring min-h-14 w-full rounded-2xl border border-white/16 bg-white/94 px-4 text-base font-medium text-[#1F2937] outline-none transition placeholder:text-[#6B7280] focus:border-[#F5C84C] focus:bg-white sm:min-h-16 sm:pl-12 sm:text-lg"
              id={inputId}
              onBlur={() => window.setTimeout(() => setIsOpen(false), 140)}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={td("Search districts, residences or guides")}
              ref={inputRef}
              role="combobox"
              type="search"
              value={query}
            />
          </div>
          <button
            aria-label={t("search")}
            className="premium-focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#F5C84C] px-7 text-base font-semibold text-[#111827] shadow-[0_14px_32px_rgba(245,200,76,0.22)] transition hover:bg-[#E7B93D] sm:min-h-16"
            onClick={submitSearch}
            type="button"
          >
            {t("search")}
            <ArrowIcon />
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {QUICK_SUGGESTIONS.map((suggestion) => {
            const href = suggestion.href ?? `/search?q=${encodeURIComponent(suggestion.query ?? suggestion.label)}`;
            const label = language === "zh-Hant" ? suggestion.labelZh : suggestion.label;

            return (
              <Link
                className="premium-focus-ring shrink-0 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-xs font-semibold text-white/86 transition hover:border-[#F5C84C]/70 hover:bg-white/16 sm:text-sm"
                href={href}
                key={suggestion.label}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {shouldShowDropdown ? (
        <div
          className="absolute left-0 right-0 z-30 mt-3 overflow-hidden rounded-[24px] border border-[#D8CDAF]/80 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.24)]"
          id={listboxId}
          role="listbox"
        >
          {hasResults ? (
            <div className="max-h-[420px] overflow-y-auto p-3">
              {GROUP_ORDER.map((groupKey) => {
                const groupResults = groupedResults[groupKey];
                if (groupResults.length === 0) return null;

                return (
                  <div className="py-2" key={groupKey}>
                    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
                      {getGroupLabel(groupKey, t)}
                    </p>
                    <div className="grid gap-1">
                      {groupResults.map((result) => {
                        const resultIndex = results.findIndex((item) => item.id === result.id);
                        return (
                          <SearchResultRow
                            active={activeIndex === resultIndex}
                            id={`${listboxId}-${result.id}`}
                            key={result.id}
                            onMouseEnter={() => setActiveIndex(resultIndex)}
                            result={result}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6">
              <p className="text-base font-semibold text-[#1F2937]">
                {td("No results yet")}
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                {td("Try a district, residence or buying topic.")}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SearchResultRow({
  active,
  id,
  onMouseEnter,
  result,
}: {
  active: boolean;
  id: string;
  onMouseEnter: () => void;
  result: UniversalSearchResult;
}) {
  const { td } = useAppPreferences();

  return (
    <Link
      aria-selected={active}
      className={`grid grid-cols-[40px_1fr] gap-3 rounded-2xl px-3 py-3 transition ${
        active ? "bg-[#FFF8E8]" : "hover:bg-[#FFFDF8]"
      }`}
      href={result.href}
      id={id}
      onMouseEnter={onMouseEnter}
      role="option"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#ECE7DA] bg-[#FFF8E8] text-[#A9851D]">
        <ResultIcon type={result.type} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-[#1F2937]">
          {td(result.title)}
        </span>
        <span className="mt-1 block truncate text-xs leading-5 text-[#6B7280]">
          {td(result.metadata ?? result.subtitle ?? "")}
        </span>
      </span>
    </Link>
  );
}

function getGroupLabel(groupKey: UniversalSearchGroupKey, t: (key: "districts" | "residences" | "learn") => string) {
  if (groupKey === "districts") return t("districts");
  if (groupKey === "residences") return t("residences");
  return t("learn");
}

function ResultIcon({ type }: { type: UniversalSearchResult["type"] }) {
  if (type === "district") return <MapPinIcon />;
  if (type === "residence") return <BuildingIcon />;
  if (type === "faq") return <QuestionIcon />;
  return <DocumentIcon />;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M4 21h16" />
      <path d="M6 21V5h8v16" />
      <path d="M14 9h4v12" />
      <path d="M9 9h2M9 13h2M9 17h2" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h5" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.4 2.4 0 0 1 4.4 1.4c0 1.7-2.2 1.9-2.2 3.6" />
      <path d="M12 17h.01" />
    </svg>
  );
}
