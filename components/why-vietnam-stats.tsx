"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import { vietnamStats, type VietnamStat, type VietnamStatIcon } from "@/data/vietnam-stats";

const DURATION_MS = 900;

export function WhyVietnamStatsSection() {
  const { td } = useAppPreferences();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const animationFrame = window.requestAnimationFrame(() => setHasEntered(true));
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-5 py-14 sm:px-8 lg:py-20" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
            {td("Why Vietnam Now")}
          </h2>
          <span className="inline-flex min-h-8 items-center rounded-full bg-[#F5E7C6] px-3 text-xs font-semibold text-[#1F2937] ring-1 ring-[#E7C879]">
            2025
          </span>
          <div
            className="relative"
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <button
              aria-describedby="why-vietnam-source-note"
              aria-expanded={isTooltipOpen}
              aria-label={td("2025 full-year preliminary data. Macroeconomic indicators provide market context and do not guarantee property investment returns.")}
              className="premium-focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CDAF] bg-white text-xs font-semibold text-[#8A6A22] shadow-sm transition hover:border-[#F5C84C]"
              onBlur={() => setIsTooltipOpen(false)}
              onClick={() => setIsTooltipOpen((current) => !current)}
              onFocus={() => setIsTooltipOpen(true)}
              type="button"
            >
              i
            </button>
            <div
              className={`absolute left-1/2 top-10 z-20 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-[#ECE7DA] bg-white p-3 text-left text-xs leading-5 text-[#4B5563] shadow-[0_18px_50px_rgba(31,41,55,0.14)] transition ${
                isTooltipOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
              id="why-vietnam-source-note"
              role="tooltip"
            >
              <p>{td("2025 full-year preliminary data. Macroeconomic indicators provide market context and do not guarantee property investment returns.")}</p>
              <p className="mt-2 text-[#8A8174]">{td("Vietnam government data reported January 2026.")}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {vietnamStats.map((stat, index) => (
            <StatCard index={index} isActive={hasEntered} key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ index, isActive, stat }: { index: number; isActive: boolean; stat: VietnamStat }) {
  const { td } = useAppPreferences();
  const value = useCountUp(stat.value, stat.decimals, isActive);
  const displayValue = formatStatValue(value, stat);

  return (
    <article className="group relative min-h-[178px] overflow-hidden rounded-2xl border border-[#ECE7DA] bg-[#FFFDF8] p-4 shadow-[0_16px_46px_rgba(31,41,55,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#E7C879] hover:shadow-[0_24px_70px_rgba(31,41,55,0.12)] sm:min-h-[210px] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(245,200,76,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,248,232,0.72))]" />
      <Pattern index={index} />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex justify-end">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7C879]/70 bg-white/72 text-[#A9851D] shadow-sm">
            <StatIcon icon={stat.icon} />
          </span>
        </div>
        <div>
          <p className="font-semibold leading-none tracking-[-0.02em] text-[#1F2937] [font-variant-numeric:tabular-nums] text-[clamp(2.35rem,9vw,3.25rem)] sm:text-[clamp(3rem,6vw,4.25rem)]">
            {displayValue}
          </p>
          <p className="mt-3 text-sm font-semibold leading-5 text-[#4B5563] sm:text-base">
            {td(stat.label)}
          </p>
        </div>
      </div>
    </article>
  );
}

function useCountUp(target: number, decimals: number, isActive: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const animationFrame = window.requestAnimationFrame(() => setValue(target));
      return () => window.cancelAnimationFrame(animationFrame);
    }

    let animationFrame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [decimals, isActive, target]);

  return value;
}

function formatStatValue(value: number, stat: VietnamStat) {
  return `${stat.prefix}${value.toFixed(stat.decimals)}${stat.suffix}`;
}

function Pattern({ index }: { index: number }) {
  const pattern = useMemo(() => index % 4, [index]);

  if (pattern === 0) {
    return (
      <svg aria-hidden="true" className="absolute bottom-0 left-0 h-full w-full text-[#C7A76C]/26" viewBox="0 0 280 220">
        <path d="M24 168 C74 148 102 112 146 126 C184 138 202 74 258 52" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M222 52h36v36" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (pattern === 1) {
    return (
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-[#AFC7D8]/32" viewBox="0 0 280 220">
        <circle cx="72" cy="64" fill="currentColor" r="5" />
        <circle cx="178" cy="92" fill="currentColor" r="6" />
        <circle cx="120" cy="158" fill="currentColor" r="4" />
        <path d="M72 64 178 92 120 158 72 64" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (pattern === 2) {
    return (
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-[#C7A76C]/24" viewBox="0 0 280 220">
        <path d="M34 154h176" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M128 118h116" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="m216 100 28 18-28 18" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-[#B8C7B1]/34" viewBox="0 0 280 220">
      <rect fill="currentColor" height="42" rx="6" width="18" x="52" y="126" />
      <rect fill="currentColor" height="70" rx="6" width="18" x="90" y="98" />
      <rect fill="currentColor" height="92" rx="6" width="18" x="128" y="76" />
      <rect fill="currentColor" height="56" rx="6" width="18" x="166" y="112" />
    </svg>
  );
}

function StatIcon({ icon }: { icon: VietnamStatIcon }) {
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

  if (icon === "trending-up") {
    return (
      <svg {...commonProps}>
        <path d="m3 17 6-6 4 4 7-8" />
        <path d="M14 7h6v6" />
      </svg>
    );
  }

  if (icon === "globe") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3 3 15 0 18" />
        <path d="M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }

  if (icon === "ship") {
    return (
      <svg {...commonProps}>
        <path d="M4 17h16l-2 3H6l-2-3Z" />
        <path d="M6 17V9h12v8" />
        <path d="M9 9V5h6v4" />
        <path d="M3 21c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M6 8h12l-1 13H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}
