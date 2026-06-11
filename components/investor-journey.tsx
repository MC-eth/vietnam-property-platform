"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";
import { investorJourneyStages } from "@/data/investor-journey";

type InvestorJourneyProps = {
  variant?: "preview" | "full";
};

export function InvestorJourney({ variant = "preview" }: InvestorJourneyProps) {
  const { t, td } = useAppPreferences();
  const isFull = variant === "full";

  return (
    <section className={isFull ? "bg-[#F8F3EA] px-5 py-14 sm:px-8 lg:py-20" : "bg-[#092F2A] px-5 py-16 text-white sm:px-8 lg:py-24"}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className={isFull ? "text-xs font-semibold uppercase tracking-[0.22em] text-[#A9851D]" : "text-xs font-semibold uppercase tracking-[0.22em] text-[#D7B46A]"}>
              {t(isFull ? "serviceJourney" : "ourServices")}
            </p>
            <h2 className={isFull ? "mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#123C35] sm:text-4xl" : "mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#FFFDF8] sm:text-4xl"}>
              {t(isFull ? "serviceJourneyTitle" : "ourServicesTitle")}
            </h2>
            <p className={isFull ? "mt-4 max-w-2xl text-sm leading-7 text-[#5F6B64] sm:text-base" : "mt-4 max-w-2xl text-sm leading-7 text-[#C6D0CA] sm:text-base"}>
              {t("ourServicesDescription")}
            </p>
          </div>

          {!isFull ? (
            <Link
              className="premium-focus-ring inline-flex min-h-11 w-fit items-center rounded-sm border border-[#D7B46A]/55 bg-transparent px-5 text-sm font-semibold text-[#FFFDF8] transition hover:border-[#D7B46A] hover:bg-[#D7B46A] hover:text-[#092F2A]"
              href="/how-it-works"
            >
              {t("ourServices")}
            </Link>
          ) : null}
        </div>

        <div className={isFull ? "mt-10 grid gap-5 lg:grid-cols-2" : "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"}>
          {investorJourneyStages.map((stage) => (
            <article
              className={isFull ? "group rounded-sm border border-[#DFD4BF] bg-white p-7 shadow-sm transition hover:border-[#C8A968] hover:shadow-md" : "group rounded-sm border border-[#D7B46A]/24 bg-white/[0.06] p-6 transition hover:border-[#D7B46A]/60 hover:bg-white/[0.08]"}
              key={stage.step}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className={isFull ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#FFF7D6] text-xs font-semibold text-[#1F2937] ring-1 ring-[#ECD88C]" : "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#D7B46A] text-xs font-semibold text-[#092F2A]"}>
                    {stage.icon}
                  </span>
                  <div>
                    <p className={isFull ? "font-mono text-xs text-[#6B7280]" : "font-mono text-xs text-[#D7B46A]"}>{t("stage")} {stage.step}</p>
                    <h3 className={isFull ? "mt-1 text-xl font-semibold leading-tight text-[#123C35]" : "mt-1 text-lg font-semibold leading-tight text-[#FFFDF8]"}>
                      {td(stage.title)}
                    </h3>
                  </div>
                </div>
              </div>

              <p className={isFull ? "mt-4 text-sm leading-6 text-[#5F6B64]" : "mt-4 text-sm leading-6 text-[#C6D0CA]"}>{td(stage.description)}</p>

              {isFull ? (
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5F6B64]">
                  {stage.details.map((detail) => (
                    <li className="flex gap-3" key={detail}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A968]" />
                      <span>{td(detail)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        {isFull ? (
          <div className="mt-10 rounded-sm border border-[#DFD4BF] bg-[#FFFDF8] p-6">
            <p className="text-sm leading-7 text-[#5F6B64]">
              {t("journeyDisclaimer")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
