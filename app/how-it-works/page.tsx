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
  { label: "Reserve", step: "03" },
  { label: "Own", step: "04", filled: true },
];

const stageCards = [
  {
    step: "01",
    title: "Discover Districts & Residences",
    body: "Start with district intelligence, project positioning and curated residence options before comparing individual units.",
    linkLabel: "Explore Districts",
    href: "/districts",
  },
  {
    step: "02",
    title: "Compare Units & Speak with an Advisor",
    body: "Shortlist residences side by side across price, size, location, rental assumptions and buyer suitability, then discuss your mandate with an advisor.",
    linkLabel: "View Residences",
    href: "/properties",
  },
  {
    step: "03",
    title: "Coordinate Reservation, Legal & Payment Steps",
    body: "Before committing, buyers should complete unit-level checks, foreign-buyer eligibility review, legal document review and payment milestone planning.",
    linkLabel: "Understand the Process",
    href: "/enquiry",
  },
  {
    step: "04",
    title: "Handover & Managed Ownership",
    body: "After completion, the platform vision extends to furnishing, leasing preparation, rental updates, maintenance records and owner reporting.",
    linkLabel: "Owner Support",
    href: "/enquiry",
    accent: true,
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
  "District and project research",
  "Residence and unit comparison",
  "Foreign-buyer eligibility review",
  "Legal and document coordination",
  "Payment milestone planning",
  "Handover and leasing preparation",
  "Owner reporting and document records",
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
        <section className="px-6 pt-14 sm:px-10 sm:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <BadgeLabel className="mb-4">
                  <TD value="FOUR STAGES · THE BUYER PATHWAY" />
                </BadgeLabel>
                <GoldRule />
                <h2 className={`${displaySerif.className} mt-5 text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] text-[#11302A]`}>
                  <TD value="From first enquiry to managed ownership" />
                </h2>
              </div>
              <p className="max-w-[460px] text-sm font-light leading-[1.85] text-[#4A6359] lg:justify-self-end lg:pb-2">
                <TD value="Each stage is designed around the realities of cross-border property ownership — research, comparison, local coordination and post-completion support." />
              </p>
            </div>

            <div className="mx-auto mt-12 flex max-w-[560px] items-start justify-between lg:mx-0">
              {progressSteps.map((step, index) => (
                <div className="flex flex-1 items-center last:flex-none" key={step.step}>
                  <div className="flex flex-col items-center gap-2.5">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-medium tracking-[1px] ${
                        step.filled
                          ? "border border-[#11302A] bg-[#11302A] text-[#C9A96E]"
                          : "border border-[#B08D4F]/70 text-[#8A6D3A]"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[2px] text-[#11302A]">
                      <TD value={step.label} />
                    </span>
                  </div>
                  {index < progressSteps.length - 1 ? (
                    <div aria-hidden="true" className="mx-2 mb-[22px] hidden h-px flex-1 bg-[#D8D2C3] sm:block" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-[#D8D2C3]">
              {stageCards.map((card) => (
                <article
                  className="group grid gap-4 border-b border-[#D8D2C3] py-10 sm:py-12 lg:grid-cols-[120px_1.1fr_1fr] lg:gap-10"
                  key={card.step}
                >
                  <p
                    className={`${displaySerif.className} text-[56px] font-light leading-none lg:text-[64px] ${
                      card.accent ? "text-[#B08D4F]" : "text-[#CFC8B6]"
                    }`}
                  >
                    {card.step}
                  </p>
                  <div>
                    <h3 className={`${displaySerif.className} max-w-[420px] text-[26px] font-normal leading-[1.2] text-[#11302A]`}>
                      <TD value={card.title} />
                    </h3>
                    <Link
                      className="premium-focus-ring mt-4 inline-block cursor-pointer text-[10px] font-medium uppercase tracking-[2px] text-[#B08D4F] transition-opacity duration-200 hover:opacity-80"
                      href={card.href}
                    >
                      <TD value={card.linkLabel} /> <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                  <p className="max-w-[480px] text-[13.5px] font-light leading-[1.85] text-[#3D5248] lg:pt-2">
                    <TD value={card.body} />
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <BadgeLabel className="mb-3">
                  <TD value="What We Help Coordinate" />
                </BadgeLabel>
                <GoldRule />
                <p className="mt-4 max-w-[380px] text-sm font-light leading-[1.85] text-[#4A6359]">
                  <TD value="A practical layer of support around research, documentation, transaction steps and post-completion ownership." />
                </p>
              </div>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {coordinationItems.map((item) => (
                  <li
                    className="flex items-center gap-3 border-b border-[#E0DACB] py-3 text-sm font-light text-[#123C35]"
                    key={item}
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#B08D4F]" />
                    <TD value={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Trust pillars */}
        <section className="px-6 py-16 sm:px-10 sm:py-24">
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
