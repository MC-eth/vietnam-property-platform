import Link from "next/link";
import { investorJourneyStages } from "@/data/investor-journey";

type InvestorJourneyProps = {
  variant?: "preview" | "full";
};

export function InvestorJourney({ variant = "preview" }: InvestorJourneyProps) {
  const isFull = variant === "full";

  return (
    <section className={isFull ? "px-5 py-14 sm:px-8 lg:py-20" : "px-5 py-20 sm:px-8 lg:py-28"}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47d32]">
              Investor journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#16231d] sm:text-4xl">
              From discovery to managed ownership.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5b645f] sm:text-base">
              The platform is designed to support overseas buyers across discovery,
              advisor coordination, transaction tracking, and post-purchase reporting.
            </p>
          </div>

          {!isFull ? (
            <Link
              className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#123c2b] px-5 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
              href="/how-it-works"
            >
              See full journey
            </Link>
          ) : null}
        </div>

        <div className={isFull ? "mt-12 grid gap-5 lg:grid-cols-2" : "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
          {investorJourneyStages.map((stage) => (
            <article
              className="group rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm transition hover:border-[#c9b98f] hover:shadow-lg"
              key={stage.step}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#123c2b] text-xs font-semibold text-white">
                    {stage.icon}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-[#a47d32]">Stage {stage.step}</p>
                    <h3 className="mt-1 text-xl font-semibold leading-tight text-[#16231d]">
                      {stage.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#5b645f]">{stage.description}</p>

              {isFull ? (
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5b645f]">
                  {stage.details.map((detail) => (
                    <li className="flex gap-3" key={detail}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a47d32]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                className="mt-6 inline-flex text-sm font-semibold text-[#123c2b] transition group-hover:text-[#a47d32]"
                href={stage.ctaHref}
              >
                {stage.ctaLabel}
              </Link>
            </article>
          ))}
        </div>

        {isFull ? (
          <div className="mt-10 rounded-sm border border-[#e1dbd0] bg-[#f8f4ed] p-6">
            <p className="text-sm leading-7 text-[#5b645f]">
              This workflow is an MVP prototype using mock content. It is intended to
              show informational support, advisor coordination, and local partner
              workflow concepts only. Buyers should seek qualified legal, tax, and
              financial advice before making investment decisions.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
