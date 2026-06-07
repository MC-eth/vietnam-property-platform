"use client";

import { useEffect, useRef, useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import {
  vietnamThesisCards,
  type VietnamThesisCard,
  type VietnamThesisIcon,
} from "@/data/vietnam-thesis-cards";

export function WhyVietnamStatsSection() {
  const { td } = useAppPreferences();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#111827] px-5 py-16 text-white sm:px-8 lg:py-24"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(245,200,76,0.18),transparent_28%),radial-gradient(circle_at_85%_62%,rgba(175,199,216,0.10),transparent_30%),linear-gradient(135deg,#0B1220_0%,#111827_52%,#171717_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:38px_38px]" />
      <svg
        aria-hidden="true"
        className="absolute -right-20 top-10 hidden h-[420px] w-[420px] text-[#F5C84C]/10 lg:block"
        viewBox="0 0 420 420"
      >
        <path d="M30 310 C90 210 150 360 220 210 S330 110 390 190" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 340 C112 238 162 386 238 232 S338 138 402 206" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 370 C130 278 188 398 256 268 S350 164 408 230" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex max-w-3xl flex-wrap items-center gap-3">
          <p className="w-full text-xs font-semibold uppercase tracking-[0.22em] text-[#D8CDAF]">
            {td("WHY VIETNAM NOW")}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[#FFFDF8] sm:text-4xl lg:text-5xl">
            {td("Why Vietnam Now")}
          </h2>
          <div
            className="relative"
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <button
              aria-describedby="why-vietnam-source-note"
              aria-expanded={isTooltipOpen}
              aria-label={td("2025 figures are preliminary full-year macroeconomic data. Other statements provide general market context. Macroeconomic conditions do not guarantee property investment returns.")}
              className="premium-focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CDAF]/45 bg-white/8 text-xs font-semibold text-[#F5C84C] shadow-sm backdrop-blur transition hover:border-[#F5C84C]"
              onBlur={() => setIsTooltipOpen(false)}
              onClick={() => setIsTooltipOpen((current) => !current)}
              onFocus={() => setIsTooltipOpen(true)}
              type="button"
            >
              i
            </button>
            <div
              className={`absolute left-1/2 top-10 z-20 w-[min(300px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-[#D8CDAF]/28 bg-[#111827]/96 p-3 text-left text-xs leading-5 text-[#D8CDAF] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur transition ${
                isTooltipOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
              id="why-vietnam-source-note"
              role="tooltip"
            >
              {td("2025 figures are preliminary full-year macroeconomic data. Other statements provide general market context. Macroeconomic conditions do not guarantee property investment returns.")}
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vietnamThesisCards.map((card, index) => (
            <ThesisCard card={card} hasEntered={hasEntered} index={index} key={card.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThesisCard({
  card,
  hasEntered,
  index,
}: {
  card: VietnamThesisCard;
  hasEntered: boolean;
  index: number;
}) {
  const { td } = useAppPreferences();

  return (
    <article
      className={`group relative flex min-h-[286px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.075] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#F5C84C]/45 hover:bg-white/[0.095] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        hasEntered ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: hasEntered ? `${index * 90}ms` : "0ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(245,200,76,0.10),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]" />
      <div className="absolute -right-12 -top-10 h-36 w-36 rounded-full border border-[#F5C84C]/12 transition duration-500 group-hover:scale-110 group-hover:border-[#F5C84C]/24" />

      <div className="relative z-10 flex h-full w-full flex-col">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F5C84C]/26 bg-[#F5C84C]/10 text-[#F5C84C] shadow-[0_0_34px_rgba(245,200,76,0.10)] transition group-hover:shadow-[0_0_42px_rgba(245,200,76,0.18)]">
          <ThesisIcon icon={card.icon} />
        </span>

        <div className="mt-7 flex flex-1 flex-col">
          <h3 className="text-xl font-semibold leading-7 text-[#FFFDF8]">
            {td(card.title)}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#D8D2C8]">
            {td(card.body)}
          </p>
          <div className="mt-auto pt-6">
            <span className="inline-flex rounded-full border border-[#F5C84C]/26 bg-[#F5C84C]/10 px-3 py-1.5 text-xs font-semibold text-[#F5E7C6]">
              {td(card.chip)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ThesisIcon({ icon }: { icon: VietnamThesisIcon }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (icon === "TrendingUp") {
    return (
      <svg {...commonProps}>
        <path d="m3 17 6-6 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    );
  }

  if (icon === "Building2") {
    return (
      <svg {...commonProps}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
        <path d="M6 12H4a2 2 0 0 0-2 2v8" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
      </svg>
    );
  }

  if (icon === "Route") {
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="5" r="3" />
        <path d="M9 19h4a5 5 0 0 0 0-10h-2a5 5 0 0 1 0-10h1" transform="translate(0 5)" />
      </svg>
    );
  }

  if (icon === "Globe2") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3 3 15 0 18" />
        <path d="M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }

  if (icon === "ShieldCheck") {
    return (
      <svg {...commonProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
