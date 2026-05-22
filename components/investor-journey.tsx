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
    <section className={isFull ? "px-5 py-14 sm:px-8 lg:py-20" : "px-5 py-20 sm:px-8 lg:py-28"}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B93D]">
              {t("investorJourney")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
              {t("investorJourneyTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
              {t("investorJourneyDescription")}
            </p>
          </div>

          {!isFull ? (
            <Link
              className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
              href="/how-it-works"
            >
              {t("howItWorks")}
            </Link>
          ) : null}
        </div>

        <div className={isFull ? "mt-12 grid gap-5 lg:grid-cols-2" : "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
          {investorJourneyStages.map((stage) => (
            <article
              className="group rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm transition hover:border-[#c9b98f] hover:shadow-lg"
              key={stage.step}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#F5C84C] text-xs font-semibold text-[#1F2937]">
                    {stage.icon}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-[#E7B93D]">{t("stage")} {stage.step}</p>
                    <h3 className="mt-1 text-xl font-semibold leading-tight text-[#1F2937]">
                      {td(stage.title)}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#6B7280]">{td(stage.description)}</p>

              {isFull ? (
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#6B7280]">
                  {stage.details.map((detail) => (
                    <li className="flex gap-3" key={detail}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E7B93D]" />
                      <span>{td(detail)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                className="mt-6 inline-flex text-sm font-semibold text-[#1F2937] transition group-hover:text-[#E7B93D]"
                href={stage.ctaHref}
              >
                {stage.ctaHref === "/enquiry" ? t("bookInvestorConsultation") : t("browseInvestmentCases")}
              </Link>
            </article>
          ))}
        </div>

        {isFull ? (
          <div className="mt-10 rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-6">
            <p className="text-sm leading-7 text-[#6B7280]">
              {t("journeyDisclaimer")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
