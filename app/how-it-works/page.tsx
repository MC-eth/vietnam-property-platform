import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TD } from "@/components/localized-text";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const bodySans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Our Services | VietInvest Property",
  description:
    "A structured service path for overseas Vietnam property buyers — research, comparison, purchase coordination and managed ownership.",
};

const progressSteps = [
  { label: "Discover", step: "01" },
  { label: "Compare", step: "02" },
  { label: "Purchase", step: "03" },
  { label: "Own", step: "04" },
];

const stageCards = [
  {
    step: "01",
    title: "Discover Districts & Residences",
    body: "Understand district positioning, project quality and suitable residence options before comparing individual units.",
    linkLabel: "Explore Districts",
    href: "/districts",
  },
  {
    step: "02",
    title: "Compare Units & Assess Fit",
    body: "Compare shortlisted units across price, size, location, rental assumptions and buyer fit, with advisor support where needed.",
    linkLabel: "View Residences",
    href: "/properties",
  },
  {
    step: "03",
    title: "Coordinate Purchase & Legal Steps",
    body: "Coordinate reservation, buyer-eligibility, legal-review and payment steps with the relevant local parties.",
    linkLabel: "Understand the Process",
    href: "/enquiry",
  },
  {
    step: "04",
    title: "Handover & Managed Ownership",
    body: "We support handover, furnishing and leasing preparation, while the future ownership platform is designed to bring rental updates, maintenance records and owner documents into one view.",
    linkLabel: "Learn About Ownership Support",
    href: "/enquiry",
  },
];

const trustPillars = [
  {
    icon: "certificate",
    title: "Independent Professional Review",
    body: "Key purchase steps should be supported by qualified local professionals, including legal and document review where required.",
  },
  {
    icon: "shield",
    title: "Milestone-Based Payments",
    body: "Buyers should understand reservation terms, payment stages and required documents before committing to a unit.",
  },
  {
    icon: "globe",
    title: "Bilingual Advisory Support",
    body: "English and Traditional Chinese support helps overseas buyers understand the process, documentation and key decisions more clearly.",
  },
];

const coordinationItems = [
  { label: "District & project research" },
  { label: "Residence & unit comparison" },
  { label: "Foreign-buyer eligibility review" },
  { label: "Legal & document coordination" },
  { label: "Payment milestone planning" },
  { label: "Handover & leasing preparation" },
  { label: "Ownership records & reporting", status: "Platform roadmap" },
];

function BadgeLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[10px] font-medium uppercase tracking-[3.5px] text-[#B08D4F] ${className}`}>
      {children}
    </p>
  );
}

function GoldRule({ centered = false }: { centered?: boolean }) {
  return <div aria-hidden="true" className={`h-px w-10 bg-[#B08D4F] ${centered ? "mx-auto" : ""}`} />;
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={`${bodySans.className} bg-[#F2EFE7]`}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#11302A] px-6 py-10 sm:px-10 sm:py-14 lg:py-0">
          <div aria-hidden="true" className="absolute right-[4%] top-[12%] h-[360px] w-[360px] rounded-full bg-[#C9A96E]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1480px] gap-8 lg:min-h-[640px] lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
            <div className="max-w-[620px]">
              <BadgeLabel className="mb-5 tracking-[2.8px] text-[#C9A96E]">
                <TD value="THE PRIVATE INVESTOR JOURNEY" />
              </BadgeLabel>
              <h1 className={`${displaySerif.className} text-[clamp(2.75rem,6vw,4.9rem)] font-light leading-[1.03] tracking-[-0.01em] text-[#F4EFE4]`}>
                <span className="block">
                  <TD value="Invest with Clarity." />
                </span>
                <span className="mt-2 block text-[#C9A96E]">
                  <TD value="Own with Confidence." />
                </span>
              </h1>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-[#F5C84C] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] shadow-[0_14px_32px_rgba(245,200,76,0.18)] transition-colors duration-200 hover:bg-[#E7B93D]"
                  href="/properties"
                >
                  <TD value="Explore Residences" /> <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-[#F4EFE4]/58 bg-[#0C2319]/20 px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#FFFDF6] transition-colors duration-200 hover:border-[#F5C84C] hover:bg-[#F5C84C]/12 hover:text-white"
                  href="/enquiry"
                >
                  <TD value="Book a Private Consultation" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:min-h-[360px] lg:min-h-[500px]">
              <Image
                alt="Premium riverside residences overlooking Ho Chi Minh City"
                className="object-cover object-[58%_50%]"
                fill
                priority
                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 54vw, 100vw"
                src="/images/our-services-hero-clean.png"
              />
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#11302A]/72 to-transparent" />
            </div>
          </div>
        </section>

        {/* Stages — editorial rows */}
        <section className="px-6 pb-12 pt-12 sm:px-10 sm:pb-14 sm:pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl text-center">
              <div>
                <BadgeLabel className="mb-4">
                  <TD value="FOUR STAGES · THE BUYER PATHWAY" />
                </BadgeLabel>
                <GoldRule centered />
                <h2 className={`${displaySerif.className} mx-auto mt-5 max-w-4xl text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] text-[#11302A]`}>
                  <TD value="From Market Insight to Managed Ownership" />
                </h2>
              </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-[900px] items-start justify-center overflow-x-auto px-1 pb-2 sm:overflow-visible sm:px-0 lg:mt-9">
              {progressSteps.map((step, index) => (
                <div className="flex min-w-[138px] flex-1 items-center justify-center last:flex-none sm:min-w-0" key={step.step}>
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B08D4F]/75 bg-[#FFFDF8] text-[12px] font-semibold tracking-[1px] text-[#11302A] shadow-sm transition-colors duration-200">
                      {step.step}
                    </span>
                    <span className="text-[10.5px] font-medium uppercase tracking-[1.8px] text-[#11302A]">
                      <TD value={step.label} />
                    </span>
                  </div>
                  {index < progressSteps.length - 1 ? (
                    <div aria-hidden="true" className="mx-3 mb-[26px] h-px min-w-10 flex-1 bg-[#B08D4F]/45 sm:min-w-0" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#D8D2C3]">
              {stageCards.map((card) => (
                <article
                  className="grid gap-3 border-b border-[#D8D2C3] py-6 sm:py-7 lg:grid-cols-[0.11fr_0.36fr_0.53fr] lg:gap-8"
                  key={card.step}
                >
                  <p className={`${displaySerif.className} text-[48px] font-light leading-none text-[#BFB59F] lg:text-[60px]`}>
                    {card.step}
                  </p>
                  <div>
                    <h3 className={`${displaySerif.className} max-w-[420px] text-[26px] font-normal leading-[1.2] text-[#11302A]`}>
                      <TD value={card.title} />
                    </h3>
                    <Link
                      className="premium-focus-ring group -ml-2 mt-4 inline-flex min-h-10 cursor-pointer items-center rounded-full px-2 text-[14px] font-medium tracking-normal text-[#7F6128] underline decoration-[#B08D4F]/42 underline-offset-4 transition-colors duration-200 hover:text-[#11302A] hover:decoration-[#11302A]/55"
                      href={card.href}
                    >
                      <TD value={card.linkLabel} /> <span aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
                    </Link>
                  </div>
                  <p className="max-w-[590px] text-[15.5px] font-light leading-[1.72] text-[#2F4A40] lg:pt-1">
                    <TD value={card.body} />
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 border-b border-[#D8D2C3] pb-8">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <BadgeLabel className="mb-3">
                    <TD value="What We Help Coordinate" />
                  </BadgeLabel>
                  <GoldRule />
                  <p className="mt-4 max-w-[390px] text-[15px] font-light leading-[1.75] text-[#4A6359]">
                    <TD value="Practical support across research, documentation, transaction steps and post-completion ownership." />
                  </p>
                  <p className="mt-4 max-w-[430px] text-[12.5px] font-light leading-[1.7] text-[#68776F]">
                    <TD value="Support is delivered through platform tools, advisor coordination and qualified local partners, depending on the service required." />
                  </p>
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  {coordinationItems.map((item) => (
                    <li
                      className="flex items-start gap-3 border-b border-[#E0DACB] py-3.5 text-[14px] font-light leading-snug text-[#123C35]"
                      key={item.label}
                    >
                      <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#B08D4F]/45 bg-[#FFFDF8] text-[10px] font-semibold text-[#8A6D3A]">✓</span>
                      <span>
                        <TD value={item.label} />
                        {item.status ? (
                          <span className="mt-1 block w-fit rounded-full border border-[#B08D4F]/35 bg-[#FFFDF8] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[1.3px] text-[#8A6D3A]">
                            <TD value={item.status} />
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trust pillars */}
        <section className="border-t border-[#B08D4F]/20 px-6 pb-16 pt-8 sm:px-10 sm:pb-24 sm:pt-12">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <BadgeLabel className="mb-4">
                <TD value="Built on Transparency" />
              </BadgeLabel>
              <GoldRule />
              <h2 className={`${displaySerif.className} mt-5 text-[clamp(1.9rem,3.5vw,2.6rem)] font-light leading-[1.15] text-[#11302A]`}>
                <TD value="Why serious investors choose this platform" />
              </h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-[1.85] text-[#4A6359]">
                <TD value="Overseas buyers need more than listings. They need clear documentation, professional coordination and decision support at each step." />
              </p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#D8D2C3]">
              {trustPillars.map((pillar) => (
                <article className="md:px-10 md:first:pl-0 md:last:pr-0" key={pillar.title}>
                  <span className="inline-flex text-[#8A6D3A]">
                    <PillarIcon type={pillar.icon} />
                  </span>
                  <h3 className="mb-2.5 mt-4 text-[15px] font-medium text-[#11302A]">
                    <TD value={pillar.title} />
                  </h3>
                  <p className="max-w-[320px] text-[13px] font-light leading-[1.85] text-[#3D5248]">
                    <TD value={pillar.body} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="bg-[#11302A] px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <BadgeLabel className="mb-5 !text-[#C9A96E]">
                  <TD value="Private Consultation · No Obligation" />
                </BadgeLabel>
                <h2 className={`${displaySerif.className} max-w-[560px] text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] text-[#F2EFE7]`}>
                  <TD value="Speak with an advisor before you shortlist" />
                </h2>
                <p className="mt-5 max-w-[440px] text-sm font-light leading-[1.8] text-[#7AADA0]">
                  <TD value="Share your budget, preferred city and ownership goals. We will help you understand suitable districts, available residences and the next steps before you proceed." />
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-[#F5C84C] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] transition-colors duration-200 hover:bg-[#E7B93D] sm:w-auto lg:w-[280px]"
                  href="/enquiry"
                >
                  <TD value="Book a Private Consultation" />
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-[#6C8A7E] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#F2EFE7] transition-colors duration-200 hover:border-[#C9A96E] hover:text-[#C9A96E] sm:w-auto lg:w-[280px]"
                  href="/properties"
                >
                  <TD value="Browse Residences" />
                </Link>
              </div>
            </div>
            <p className="mt-12 max-w-[640px] border-t border-white/10 pt-6 text-[11px] leading-[1.7] text-[#5C7A6E]">
              <TD value="MVP prototype. Content is illustrative only and does not constitute financial, legal, tax or investment advice. Indicative yields and returns are not guaranteed." />{" "}
              <Link className="premium-focus-ring cursor-pointer underline decoration-[#5C7A6E]/60 underline-offset-2 transition-opacity duration-200 hover:opacity-80" href="/legal-disclaimer">
                <TD value="Full disclaimer" /> <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        {/* Footer strip */}
        <div className="flex flex-col items-center justify-between gap-1.5 bg-[#0C2319] px-6 py-[18px] sm:flex-row sm:px-10">
          <p className="text-[10px] font-medium uppercase tracking-[4px] text-[#3E6A55]">VietInvest Property</p>
          <p className="text-[10.5px] text-[#3E6A55]">
            © 2026 · <TD value="All rights reserved" />
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PillarIcon({ type }: { type: string }) {
  if (type === "shield") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 21s7-3.5 7-10V6l-7-3-7 3v5c0 6.5 7 10 7 10Zm-3-10 2 2 4-4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M8 4h8l3 3v13H8V4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      <path
        d="M16 4v4h4M4 9h5M4 13h5M4 17h5M12 14l2 2 3.5-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
