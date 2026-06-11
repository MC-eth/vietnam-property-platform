import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const bodySans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Our Services | VietInvest Property",
  description:
    "A structured service path for overseas Vietnam property buyers — research, comparison, purchase coordination and managed ownership.",
};

const journeySteps = [
  { label: "Discover", step: "01" },
  { label: "Compare", step: "02" },
  { label: "Reserve", step: "03" },
  { label: "Own", step: "04" },
];

const stageCards = [
  {
    step: "01",
    title: "Discover & Shortlist",
    body: "Understand key districts, project positioning and suitable residence options before you commit time or capital.",
    href: "/districts",
  },
  {
    step: "02",
    title: "Compare & Assess",
    body: "Compare units, pricing, rental assumptions and ownership considerations with structured buyer tools.",
    href: "/properties",
  },
  {
    step: "03",
    title: "Reserve & Coordinate",
    body: "We help coordinate the reservation process, eligibility checks, legal review and payment milestones with local parties.",
    href: "/enquiry",
  },
  {
    step: "04",
    title: "Handover & Ownership",
    body: "After handover, our platform vision extends to leasing preparation, rental updates and owner reporting.",
    href: "/owner-portal",
    inverted: true,
  },
];

const trustPillars = [
  {
    icon: "review",
    title: "Independent legal review",
    description:
      "Key purchase steps should be supported by qualified local professionals, including legal and document review where required.",
  },
  {
    icon: "milestones",
    title: "Milestone-based payments",
    description:
      "Buyers should understand reservation terms, payment stages and required documents before committing to a unit.",
  },
  {
    icon: "language",
    title: "Bilingual advisory support",
    description:
      "English and Traditional Chinese support helps overseas buyers understand the process, documentation and key decisions more clearly.",
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#B08D4F]">{children}</p>
  );
}

function SectionHeader({ badge, title }: { badge: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge>{badge}</Badge>
      <div className="mx-auto mt-4 h-px w-8 bg-[#B08D4F]" />
      <h2 className={`${displaySerif.className} mt-5 text-3xl font-light leading-tight text-[#11302A] sm:text-4xl`}>
        {title}
      </h2>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={`${bodySans.className} bg-[#F2EFE7] font-light`}>
        {/* A. Hero */}
        <section className="relative overflow-hidden bg-[#11302A] px-5 py-16 sm:px-8 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[44%] bg-[#0D271F] lg:block [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <Badge>
                <TD value="The Investor Journey" />
              </Badge>
              <h1 className={`${displaySerif.className} mt-6 text-4xl font-light leading-[1.08] text-[#F2EFE7] sm:text-5xl lg:text-[60px]`}>
                <span className="block">
                  <TD value="Find it. Own it." />
                </span>
                <span className="block italic text-[#B08D4F]">
                  <TD value="Manage it." />
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-[#9DB3A8]">
                <TD value="A structured private-client journey for overseas buyers — from district research to managed ownership in Vietnam's gateway cities." />
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#B08D4F] px-8 text-sm font-medium text-[#11302A] transition-opacity duration-200 hover:opacity-85"
                  href="/enquiry"
                >
                  <TD value="Begin your journey" /> <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-[#B08D4F]/55 px-8 text-sm font-medium text-[#F2EFE7] transition-opacity duration-200 hover:opacity-85"
                  href="/properties"
                >
                  <TD value="Browse residences" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* B. Stats bar */}
        <section className="bg-[#0D271F] px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { label: "Curated units", value: "120+" },
              { label: "Indicative yield", value: "4.6–5.8%" },
              { label: "Gateway cities", value: "2" },
              { label: "Advisor response", value: "24h" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`${displaySerif.className} text-4xl font-light text-[#B08D4F]`}>{stat.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[3px] text-[#9DB3A8]">
                  <TD value={stat.label} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* C. Journey stages */}
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              badge={<TD value="The Investor Journey" />}
              title={<TD value="From first enquiry to managed ownership" />}
            />

            <div className="mx-auto mt-12 flex max-w-3xl items-center justify-between">
              {journeySteps.map((step, index) => (
                <div className="flex flex-1 items-center last:flex-none" key={step.step}>
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-medium ${
                        index === journeySteps.length - 1
                          ? "bg-[#11302A] text-[#B08D4F]"
                          : "border border-[#B08D4F] text-[#8A6D3A]"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[11px] uppercase tracking-[3px] text-[#6B7280]">
                      <TD value={step.label} />
                    </span>
                  </div>
                  {index < journeySteps.length - 1 ? (
                    <div aria-hidden="true" className="mx-3 mb-6 hidden h-px flex-1 bg-[#B08D4F]/40 sm:block" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-[2px] bg-[#FDFCF8] md:grid-cols-2">
              {stageCards.map((card) => (
                <article
                  className={`border-t border-transparent p-8 transition-colors duration-200 hover:border-[#B08D4F] sm:p-10 ${
                    card.inverted ? "bg-[#11302A]" : "bg-[#FBF9F2]"
                  }`}
                  key={card.step}
                >
                  <p
                    className={`${displaySerif.className} text-[56px] font-light leading-none ${
                      card.inverted ? "text-[#1C4338]" : "text-[#E2DDD0]"
                    }`}
                  >
                    {card.step}
                  </p>
                  <div className="mt-4 h-px w-6 bg-[#B08D4F]" />
                  <h3
                    className={`${displaySerif.className} mt-4 text-2xl font-light ${
                      card.inverted ? "text-[#F2EFE7]" : "text-[#11302A]"
                    }`}
                  >
                    <TD value={card.title} />
                  </h3>
                  <p className={`mt-3 text-sm leading-[1.75] ${card.inverted ? "text-[#9DB3A8]" : "text-[#5F6B64]"}`}>
                    <TD value={card.body} />
                  </p>
                  <Link
                    aria-label={`${card.title} — view`}
                    className="premium-focus-ring mt-5 inline-block text-lg text-[#B08D4F] transition-opacity duration-200 hover:opacity-85"
                    href={card.href}
                  >
                    →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* D. Trust pillars */}
        <section className="bg-[#FDFCF8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              badge={<TD value="Built on Transparency" />}
              title={<TD value="Why buyers trust this process" />}
            />
            <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#E4DECE]">
              {trustPillars.map((pillar) => (
                <article className="text-center lg:px-10" key={pillar.title}>
                  <div className="group mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#EBE7DC] text-[#8A6D3A] transition-colors duration-200 hover:bg-[#D9D0BE]">
                    <TrustIcon type={pillar.icon} />
                  </div>
                  <h3 className={`${displaySerif.className} mt-5 text-xl font-normal text-[#11302A]`}>
                    <TD value={pillar.title} />
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-[1.75] text-[#5F6B64]">
                    <TD value={pillar.description} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* E. CTA banner */}
        <section className="border-t border-[#B08D4F]/40 bg-[#11302A] px-5 py-16 text-center sm:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge>
              <T k="ourServicesEyebrow" />
            </Badge>
            <h2 className={`${displaySerif.className} mt-5 text-3xl font-light leading-tight text-[#F2EFE7] sm:text-4xl`}>
              <TD value="Ready to explore Vietnam property investment?" />
            </h2>
            <p className="mt-4 text-sm leading-[1.75] text-[#9DB3A8]">
              <TD value="A 30-minute private call. No obligation." />
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#B08D4F] px-8 text-sm font-medium text-[#11302A] transition-opacity duration-200 hover:opacity-85"
                href="/enquiry"
              >
                <TD value="Book a consultation" />
              </Link>
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-[#B08D4F]/55 px-8 text-sm font-medium text-[#F2EFE7] transition-opacity duration-200 hover:opacity-85"
                href="/properties"
              >
                <TD value="Browse residences" />
              </Link>
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-xs leading-[1.75] text-[#6E8479]">
              <T k="journeyDisclaimer" />
            </p>
          </div>
        </section>

        {/* F. Footer strip */}
        <div className="flex flex-col items-center justify-between gap-2 bg-[#0C2319] px-5 py-5 text-[11px] uppercase tracking-[3px] text-[#9DB3A8] sm:flex-row sm:px-8">
          <p>VietInvest Property</p>
          <p>
            © 2026 · <TD value="All rights reserved" />
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function TrustIcon({ type }: { type: string }) {
  if (type === "milestones") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M4 19h16M6 17V9l6-4 6 4v8M9 17v-5h6v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === "language") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M5 5h8M9 5v3m3-3c-.7 3.7-2.8 6.2-6 7.8M7.5 9.5c1.1 1.6 2.6 2.8 4.5 3.5M14 19l3.5-8L21 19m-5.8-3h4.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M8 4h8l3 3v13H8V4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M16 4v4h4M4 9h5M4 13h5M4 17h5M12 14l2 2 3.5-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}
