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

const servicePillars = [
  "Curated Residences",
  "District Intelligence",
  "Buyer Guidance",
  "Managed Ownership",
];

const stageCards = [
  {
    step: "01",
    title: "Discover Districts & Residences",
    body: "Start with district intelligence, project positioning and curated residence options before comparing individual units.",
    linkLabel: "Explore Districts",
    href: "/districts",
    visual: "map",
  },
  {
    step: "02",
    title: "Compare Units & Speak with an Advisor",
    body: "Shortlist residences side by side across price, size, location, rental assumptions and buyer suitability, then discuss your mandate with an advisor.",
    linkLabel: "View Residences",
    href: "/properties",
    visual: "compare",
  },
  {
    step: "03",
    title: "Coordinate Reservation, Legal & Payment Steps",
    body: "Before committing, buyers should complete unit-level checks, foreign-buyer eligibility review, legal document review and payment milestone planning.",
    linkLabel: "Understand the Process",
    href: "/enquiry",
    visual: "documents",
  },
  {
    step: "04",
    title: "Handover & Managed Ownership",
    body: "After completion, the platform vision extends to furnishing, leasing preparation, rental updates, maintenance records and owner reporting.",
    linkLabel: "Owner Support",
    href: "/enquiry",
    inverted: true,
    visual: "dashboard",
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
  return <div aria-hidden="true" className={`h-[1.5px] w-10 bg-[#B08D4F] ${centered ? "mx-auto" : ""}`} />;
}

function ServiceVisual({ inverted, type }: { inverted: boolean; type: string }) {
  const shell = inverted ? "border-[#C9A96E]/22 bg-white/[0.06]" : "border-[#E5DDCC] bg-[#F8F3EA]";
  const line = inverted ? "bg-[#C9A96E]/55" : "bg-[#B08D4F]/55";
  const softLine = inverted ? "bg-white/16" : "bg-[#D6CCBA]";
  const dot = inverted ? "bg-[#C9A96E]" : "bg-[#B08D4F]";
  const text = inverted ? "text-[#D7B46A]" : "text-[#8A6D12]";

  if (type === "map") {
    return (
      <div aria-hidden="true" className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl border ${shell} p-3`}>
        <div className={`absolute left-4 top-7 h-12 w-20 rounded-full border border-[#AFC7D8]/70`} />
        <div className={`absolute bottom-4 left-5 h-1 w-16 rounded-full ${line}`} />
        <div className={`absolute right-5 top-5 h-2.5 w-2.5 rounded-full ${dot}`} />
        <div className={`absolute right-9 top-12 h-2 w-2 rounded-full ${dot}`} />
        <div className={`absolute left-8 top-4 h-10 w-px rotate-45 ${softLine}`} />
      </div>
    );
  }

  if (type === "compare") {
    return (
      <div aria-hidden="true" className={`h-24 w-32 shrink-0 rounded-2xl border ${shell} p-3`}>
        <div className={`h-3 w-16 rounded-full ${softLine}`} />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className={`h-10 rounded-xl ${inverted ? "bg-white/10" : "bg-white"}`} />
          <div className={`h-10 rounded-xl ${inverted ? "bg-[#C9A96E]/18" : "bg-[#FFF8E8]"}`} />
        </div>
        <div className={`mt-3 h-1.5 w-20 rounded-full ${line}`} />
      </div>
    );
  }

  if (type === "documents") {
    return (
      <div aria-hidden="true" className={`h-24 w-32 shrink-0 rounded-2xl border ${shell} p-3`}>
        <div className={`mx-auto h-16 w-11 rounded-md border ${inverted ? "border-white/18 bg-white/8" : "border-[#E5DDCC] bg-white"}`}>
          <div className={`mx-2 mt-3 h-1 rounded-full ${line}`} />
          <div className={`mx-2 mt-2 h-1 rounded-full ${softLine}`} />
          <div className={`mx-2 mt-2 h-1 rounded-full ${softLine}`} />
        </div>
        <div className={`mx-auto mt-2 h-1.5 w-14 rounded-full ${line}`} />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`h-24 w-32 shrink-0 rounded-2xl border ${shell} p-3`}>
      <div className={`text-[9px] font-semibold uppercase tracking-[1.6px] ${text}`}>Owner</div>
      <div className="mt-4 flex items-end gap-2">
        <div className={`h-8 w-4 rounded-t ${line}`} />
        <div className={`h-12 w-4 rounded-t ${inverted ? "bg-white/18" : "bg-[#D6CCBA]"}`} />
        <div className={`h-6 w-4 rounded-t ${line}`} />
      </div>
      <div className={`mt-3 h-1.5 w-20 rounded-full ${softLine}`} />
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={`${bodySans.className} bg-[#F2EFE7]`}>
        <section className="relative overflow-hidden bg-[#11302A] px-6 py-12 sm:px-10 sm:pb-16 sm:pt-[72px]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[300px] bg-[#0D271F] md:block [clip-path:polygon(25%_0,100%_0,100%_100%,0_100%)]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#B08D4F]/25" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.94fr_0.76fr] lg:items-center">
              <div className="max-w-[660px]">
                <BadgeLabel className="mb-5">
                  <TD value="THE PRIVATE INVESTOR JOURNEY" />
                </BadgeLabel>
                <h1 className={`${displaySerif.className} text-[38px] font-light leading-[1.1] text-[#F2EFE7] sm:text-[58px]`}>
                  <span className="mb-1.5 block">
                    <TD value="Acquire with Clarity." />
                  </span>
                  <span className="block italic text-[#C9A96E]">
                    <TD value="Own with Confidence." />
                  </span>
                </h1>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#F5C84C] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] shadow-[0_12px_30px_rgba(245,200,76,0.18)] transition hover:bg-[#E7B93D]"
                    href="/properties"
                  >
                    <TD value="Explore Residences" /> <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link
                    className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9A96E]/65 bg-white/[0.06] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#FFFDF8] backdrop-blur-sm transition hover:border-[#F5C84C] hover:bg-[#C9A96E]/18 hover:text-white"
                    href="/enquiry"
                  >
                    <TD value="Book a Private Consultation" />
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 rounded-[28px] bg-[#C9A96E]/12 blur-2xl" />
                <div className="relative overflow-hidden rounded-[26px] border border-[#C9A96E]/28 bg-[#0C2319] p-3 shadow-2xl shadow-black/25">
                  <Image
                    alt="Vietnam riverside residential skyline"
                    className="h-[360px] w-full rounded-[18px] object-cover"
                    height={720}
                    priority
                    src="/images/our-services-hero.png"
                    width={960}
                  />
                  <div className="absolute inset-3 rounded-[18px] bg-gradient-to-t from-[#092F2A]/78 via-transparent to-transparent" />
                  <div
                    aria-hidden="true"
                    className="absolute bottom-7 right-7 w-[220px] rounded-3xl border border-white/14 bg-[#092F2A]/44 p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#F5C84C]" />
                      <span className="h-px flex-1 bg-white/22" />
                      <span className="h-2 w-8 rounded-full bg-white/18" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <span className="h-12 rounded-2xl bg-white/10" />
                      <span className="h-12 rounded-2xl bg-[#C9A96E]/20" />
                      <span className="h-12 rounded-2xl bg-white/10" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <span className="block h-1.5 w-4/5 rounded-full bg-white/18" />
                      <span className="block h-1.5 w-1/2 rounded-full bg-[#C9A96E]/38" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0C2319]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[#1E3D34]">
            {servicePillars.map((pillar) => (
              <div className="py-[24px] text-center" key={pillar}>
                <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#C9A96E]">
                  <TD value={pillar} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pt-12 sm:px-10 sm:pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <BadgeLabel className="mb-4">
                <TD value="FOUR STAGES · THE BUYER PATHWAY" />
              </BadgeLabel>
              <GoldRule centered />
              <h2 className={`${displaySerif.className} mt-5 text-[32px] font-light leading-tight text-[#11302A] sm:text-[40px]`}>
                <TD value="From first enquiry to managed ownership" />
              </h2>
              <p className="mx-auto mb-10 mt-4 max-w-[500px] text-sm font-light leading-[1.85] text-[#4A6359]">
                <TD value="Each stage is designed around the realities of cross-border property ownership — research, comparison, local coordination and post-completion support." />
              </p>
            </div>

            <div className="mx-auto mb-12 flex max-w-[560px] items-start justify-between">
              {progressSteps.map((step, index) => (
                <div className="flex flex-1 items-center last:flex-none" key={step.step}>
                  <div className="flex flex-col items-center gap-2.5">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-[11px] font-medium tracking-[1px] ${
                        step.filled
                          ? "border-[1.5px] border-[#11302A] bg-[#11302A] text-[#C9A96E]"
                          : "border-[1.5px] border-[#B08D4F] bg-[#F2EFE7] text-[#B08D4F]"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[2px] text-[#11302A]">
                      <TD value={step.label} />
                    </span>
                  </div>
                  {index < progressSteps.length - 1 ? (
                    <div aria-hidden="true" className="mx-2 mb-[22px] hidden h-px flex-1 bg-[#C9C0B0] sm:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid gap-[2px] bg-[#C9C0B0] md:grid-cols-2">
              {stageCards.map((card) => (
                <article
                  className={`p-8 sm:p-10 ${card.inverted ? "bg-[#11302A]" : "bg-[#FDFCF8]"}`}
                  key={card.step}
                >
                  <div className="mb-6 flex items-start justify-between gap-5">
                    <p
                      className={`${displaySerif.className} text-[68px] font-light leading-none ${
                        card.inverted ? "text-[#1E4035]" : "text-[#E8E2D6]"
                      }`}
                    >
                      {card.step}
                    </p>
                    <ServiceVisual inverted={Boolean(card.inverted)} type={card.visual} />
                  </div>
                  <div aria-hidden="true" className="mb-[18px] h-[1.5px] w-8 bg-[#B08D4F]" />
                  <h3
                    className={`${displaySerif.className} mb-3.5 text-2xl font-normal leading-[1.25] ${
                      card.inverted ? "text-[#F2EFE7]" : "text-[#11302A]"
                    }`}
                  >
                    <TD value={card.title} />
                  </h3>
                  <p
                    className={`mb-5 text-[13.5px] font-light leading-[1.85] ${
                      card.inverted ? "text-[#7AADA0]" : "text-[#3D5248]"
                    }`}
                  >
                    <TD value={card.body} />
                  </p>
                  <Link
                    className={`premium-focus-ring text-[10px] font-medium uppercase tracking-[2px] transition-opacity duration-200 hover:opacity-85 ${
                      card.inverted ? "text-[#C9A96E]" : "text-[#B08D4F]"
                    }`}
                    href={card.href}
                  >
                    <TD value={card.linkLabel} /> <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-[24px] border border-[#DCD4C4] bg-[#FDFCF8] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                <div>
                  <BadgeLabel className="mb-3">
                    <TD value="What We Help Coordinate" />
                  </BadgeLabel>
                  <p className="text-sm leading-7 text-[#4A6359]">
                    <TD value="A practical layer of support around research, documentation, transaction steps and post-completion ownership." />
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {coordinationItems.map((item) => (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#E5DDCC] bg-[#FBF7EE] px-4 py-3 text-sm text-[#123C35]" key={item}>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B08D4F]" />
                      <TD value={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <BadgeLabel className="mb-4">
                <TD value="Built on Transparency" />
              </BadgeLabel>
              <GoldRule centered />
              <h2 className={`${displaySerif.className} mt-5 text-[30px] font-light leading-tight text-[#11302A] sm:text-4xl`}>
                <TD value="Why serious investors choose this platform" />
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-[1.85] text-[#4A6359]">
                <TD value="Overseas buyers need more than listings. They need clear documentation, professional coordination and decision support at each step." />
              </p>
            </div>
            <div className="mt-10 grid md:grid-cols-3 md:divide-x md:divide-[#DDD8CE]">
              {trustPillars.map((pillar) => (
                <article className="px-2 py-8 md:px-9" key={pillar.title}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8E2D6] text-[#8A6D3A] shadow-sm">
                    <PillarIcon type={pillar.icon} />
                  </div>
                  <h3 className="mb-2.5 mt-5 text-[15px] font-medium text-[#11302A]">
                    <TD value={pillar.title} />
                  </h3>
                  <p className="text-[13px] font-light leading-[1.85] text-[#3D5248]">
                    <TD value={pillar.body} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-[1.5px] border-[#B08D4F]/50 bg-[#11302A] px-6 py-12 text-center sm:px-10 sm:py-[72px]">
          <div className="mx-auto max-w-3xl">
            <BadgeLabel className="mb-5 !text-[#C9A96E]">
              <TD value="Private Consultation · No Obligation" />
            </BadgeLabel>
            <h2 className={`${displaySerif.className} mx-auto max-w-[540px] text-[32px] font-light leading-[1.2] text-[#F2EFE7] sm:text-[44px]`}>
              <TD value="Speak with an advisor before you shortlist" />
            </h2>
            <p className="mx-auto mb-9 mt-4 max-w-[420px] text-sm font-light leading-[1.8] text-[#7AADA0]">
              <TD value="Share your budget, preferred city and ownership goals. We will help you understand suitable districts, available residences and the next steps before you proceed." />
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#F5C84C] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] transition hover:bg-[#E7B93D]"
                href="/enquiry"
              >
                <TD value="Book a Private Consultation" />
              </Link>
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-[#6C8A7E] px-8 text-[11px] font-semibold uppercase tracking-[2px] text-[#F2EFE7] transition hover:border-[#C9A96E] hover:text-[#C9A96E]"
                href="/properties"
              >
                <TD value="Browse Residences" />
              </Link>
            </div>
            <p className="mx-auto mt-8 max-w-[520px] text-[11px] leading-[1.7] text-[#2E5045]">
              <TD value="MVP prototype. Content is illustrative only and does not constitute financial, legal, tax or investment advice. Indicative yields and returns are not guaranteed." />{" "}
              <Link className="premium-focus-ring underline decoration-[#2E5045]/60 underline-offset-2 hover:opacity-85" href="/legal-disclaimer">
                <TD value="Full disclaimer" /> <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-1.5 bg-[#0C2319] px-6 py-[18px] sm:flex-row sm:px-10">
          <p className="text-[10px] font-medium uppercase tracking-[4px] text-[#2A4A3A]">VietInvest Property</p>
          <p className="text-[10.5px] text-[#2A4A3A]">
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
