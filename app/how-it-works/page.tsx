import type { Metadata } from "next";
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
    body: "Begin with market intelligence, not listings. Our curated district profiles across Ho Chi Minh City and Hanoi give you the context to invest with conviction — before you compare a single unit.",
    linkLabel: "Explore Districts",
    href: "/districts",
  },
  {
    step: "02",
    title: "Compare Units & Speak with an Advisor",
    body: "Shortlist residences side-by-side on pricing, indicative yield, and location. Submit your mandate and a dedicated bilingual advisor will guide your selection — on your schedule, in your language.",
    linkLabel: "View Residences",
    href: "/properties",
  },
  {
    step: "03",
    title: "Reserve with Legal & Payment Coordination",
    body: "Before you commit, every unit undergoes independent legal document review, foreign buyer eligibility confirmation, and structured payment milestone planning — so you enter the reservation with complete clarity.",
    linkLabel: "Understand the Process",
    href: "/enquiry",
  },
  {
    step: "04",
    title: "Handover & Managed Ownership",
    body: "From completion to rental income — we coordinate furnishing, leasing preparation, and tenant onboarding. Ongoing owner reporting covers rent receipts, occupancy rates, and key documents in a single dashboard view.",
    linkLabel: "See Owner Reporting",
    href: "/enquiry",
    inverted: true,
  },
];

const trustPillars = [
  {
    icon: "certificate",
    title: "Independent Legal Review",
    body: "Every reservation is subject to independent document review by qualified Vietnamese counsel — not an agent's assurance. You receive a clear summary before signing anything.",
  },
  {
    icon: "shield",
    title: "Milestone-Based Payments",
    body: "Funds are released only against defined contractual milestones. No lump-sum transfers, no ambiguity — capital moves in step with legally verified progress through the transaction.",
  },
  {
    icon: "globe",
    title: "Bilingual Advisory Support",
    body: "Full English and Traditional Chinese advisory coverage across every stage of the buying lifecycle — from initial enquiry through post-handover owner reporting. Nothing lost in translation.",
  },
];

const testimonials = [
  {
    quote:
      "The legal review process gave me confidence I hadn't found with other Vietnam platforms. I knew exactly what I was signing.",
    attribution: "— Anonymous · HK-based Investor",
  },
  {
    quote:
      "Having a bilingual advisor walk me through the payment milestones made a genuinely complex process feel straightforward.",
    attribution: "— Anonymous · Singapore-based Buyer",
  },
  {
    quote:
      "District intelligence was the starting point I didn't know I needed. It changed which areas I was even considering.",
    attribution: "— Anonymous · London-based Investor",
  },
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

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={`${bodySans.className} bg-[#F2EFE7]`}>
        {/* 2. Hero */}
        <section className="relative overflow-hidden bg-[#11302A] px-6 py-12 sm:px-10 sm:pb-16 sm:pt-[72px]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[260px] bg-[#0D271F] md:block [clip-path:polygon(25%_0,100%_0,100%_100%,0_100%)]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#B08D4F]/25" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-[600px]">
              <BadgeLabel className="mb-5">
                <TD value="The Private Investor Journey" />
              </BadgeLabel>
              <h1 className={`${displaySerif.className} text-[38px] font-light leading-[1.1] text-[#F2EFE7] sm:text-[58px]`}>
                <span className="mb-1.5 block">
                  <TD value="Acquire with intelligence." />
                </span>
                <span className="mb-7 block italic text-[#C9A96E]">
                  <TD value="Own with confidence." />
                </span>
              </h1>
              <p className="mb-9 max-w-[460px] text-[15px] font-light leading-[1.85] text-[#8FADA6]">
                <TD value="A structured, end-to-end advisory pathway for overseas buyers — from district intelligence and unit comparison to legal coordination and managed rental ownership in Vietnam's most sought-after residential markets." />
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex items-center justify-center rounded-full bg-[#B08D4F] px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] transition-opacity duration-200 hover:opacity-85"
                  href="/enquiry"
                >
                  <TD value="Begin Your Journey" /> <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <Link
                  className="premium-focus-ring inline-flex items-center justify-center rounded-full border-[1.5px] border-[#3D5E54] px-8 py-[13px] text-[11px] font-semibold uppercase tracking-[2px] text-[#C5D5CF] transition-opacity duration-200 hover:opacity-85"
                  href="/properties"
                >
                  <TD value="Browse Residences" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats bar */}
        <section className="bg-[#0C2319]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[#1E3D34]">
            {[
              { label: "Curated Residences", value: "120+" },
              { label: "Indicative Gross Yield", value: "4.6–5.8%" },
              { label: "Gateway Cities", value: "2" },
              { label: "Advisor Response", value: "24h" },
            ].map((stat) => (
              <div className="py-[22px] text-center" key={stat.label}>
                <p className={`${displaySerif.className} text-[34px] font-light leading-tight text-[#C9A96E]`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[3px] text-[#4A7A68]">
                  <TD value={stat.label} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Stages */}
        <section className="px-6 pt-12 sm:px-10 sm:pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <BadgeLabel className="mb-4">
                <TD value="Four Stages · The Investment Pathway" />
              </BadgeLabel>
              <GoldRule centered />
              <h2 className={`${displaySerif.className} mt-5 text-[32px] font-light leading-tight text-[#11302A] sm:text-[40px]`}>
                <TD value="From first enquiry to rental income." />
              </h2>
              <p className="mx-auto mb-10 mt-4 max-w-[500px] text-sm font-light leading-[1.85] text-[#4A6359]">
                <TD value="Every stage is structured around the realities of cross-border property ownership — with local legal, advisory, and management support built in from the outset." />
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
                  className={`p-9 sm:p-11 ${card.inverted ? "bg-[#11302A]" : "bg-[#FDFCF8]"}`}
                  key={card.step}
                >
                  <p
                    className={`${displaySerif.className} text-[72px] font-light leading-none ${
                      card.inverted ? "text-[#1E4035]" : "text-[#E8E2D6]"
                    }`}
                  >
                    {card.step}
                  </p>
                  <div aria-hidden="true" className="mb-[18px] mt-3 h-[1.5px] w-8 bg-[#B08D4F]" />
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
          </div>
        </section>

        {/* 5. Trust pillars */}
        <section className="px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <BadgeLabel className="mb-4">
                <TD value="Built on Transparency" />
              </BadgeLabel>
              <GoldRule centered />
              <h2 className={`${displaySerif.className} mt-5 text-[30px] font-light leading-tight text-[#11302A] sm:text-4xl`}>
                <TD value="Why serious investors choose this platform." />
              </h2>
            </div>
            <div className="mt-10 grid md:grid-cols-3 md:divide-x md:divide-[#DDD8CE]">
              {trustPillars.map((pillar) => (
                <article className="px-2 py-8 md:px-9" key={pillar.title}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8E2D6] text-[#8A6D3A]">
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

        {/* 6. Testimonials */}
        <section className="border-y border-[#DDD8CE] bg-[#FDFCF8] px-6 py-12 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <BadgeLabel className="mb-4">
                <TD value="Investor Voices" />
              </BadgeLabel>
              <GoldRule centered />
            </div>
            <div className="grid gap-[2px] bg-[#DDD8CE] md:grid-cols-3">
              {testimonials.map((item) => (
                <figure className="bg-[#FDFCF8] px-[30px] py-8" key={item.attribution}>
                  <p aria-hidden="true" className={`${displaySerif.className} mb-3.5 text-4xl leading-[0.8] text-[#C9A96E]`}>
                    &ldquo;
                  </p>
                  <blockquote className={`${displaySerif.className} mb-[18px] text-[17px] font-light italic leading-[1.65] text-[#11302A]`}>
                    <TD value={item.quote} />
                  </blockquote>
                  <figcaption className="text-[10px] uppercase tracking-[2px] text-[#8A9990]">
                    <TD value={item.attribution} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA banner */}
        <section className="border-t-[1.5px] border-[#B08D4F]/50 bg-[#11302A] px-6 py-12 text-center sm:px-10 sm:py-[72px]">
          <div className="mx-auto max-w-3xl">
            <BadgeLabel className="mb-5 !text-[#C9A96E]">
              <TD value="Private Consultation · No Obligation" />
            </BadgeLabel>
            <h2 className={`${displaySerif.className} mx-auto max-w-[540px] text-[32px] font-light leading-[1.2] text-[#F2EFE7] sm:text-[44px]`}>
              <TD value="Speak with an advisor within 24 hours." />
            </h2>
            <p className="mx-auto mb-9 mt-4 max-w-[420px] text-sm font-light leading-[1.8] text-[#7AADA0]">
              <TD value="A structured, private 30-minute consultation — no obligation, no sales pressure. Tailored to your investment mandate and timeline." />
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="premium-focus-ring inline-flex items-center justify-center rounded-full bg-[#B08D4F] px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[2px] text-[#11302A] transition-opacity duration-200 hover:opacity-85"
                href="/enquiry"
              >
                <TD value="Book a Consultation" />
              </Link>
              <Link
                className="premium-focus-ring inline-flex items-center justify-center rounded-full border-[1.5px] border-[#3D5E54] px-8 py-[13px] text-[11px] font-semibold uppercase tracking-[2px] text-[#C5D5CF] transition-opacity duration-200 hover:opacity-85"
                href="/properties"
              >
                <TD value="Browse Residences" />
              </Link>
            </div>
            <p className="mx-auto mt-8 max-w-[520px] text-[11px] leading-[1.7] text-[#2E5045]">
              <TD value="MVP prototype. Content is illustrative only. Not financial, legal, tax or investment advice. Indicative yields and returns are not guaranteed." />{" "}
              <Link className="premium-focus-ring underline decoration-[#2E5045]/60 underline-offset-2 hover:opacity-85" href="/legal-disclaimer">
                <TD value="Full disclaimer" /> <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        {/* 8. Footer strip */}
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
