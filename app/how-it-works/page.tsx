import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestorJourney } from "@/components/investor-journey";
import { T, TD } from "@/components/localized-text";

const trustIndicators = [
  "Curated residences",
  "District intelligence",
  "Buyer guidance",
  "Managed ownership",
];

const trustPillars = [
  {
    icon: "review",
    title: "Independent professional review",
    description:
      "Key purchase steps should be supported by qualified local professionals, including legal and document review where required.",
  },
  {
    icon: "milestones",
    title: "Structured payment milestones",
    description:
      "Buyers should understand reservation terms, payment stages and required documents before committing to a unit.",
  },
  {
    icon: "language",
    title: "Bilingual buyer support",
    description:
      "English and Traditional Chinese support helps overseas buyers understand the process, documentation and key decisions more clearly.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="bg-[#F8F3EA]">
        <section className="relative overflow-hidden bg-[#092F2A] px-5 py-20 text-white sm:px-8 lg:py-28">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/12 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D7B46A]">
                <T k="ourServicesEyebrow" />
              </p>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#FFFDF8] sm:text-5xl lg:text-6xl">
                <TD value="A structured path to owning Vietnam property from overseas" />
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#C6D0CA] sm:text-lg">
                <TD value="From district intelligence and residence comparison to legal coordination, handover and ongoing ownership support — each step is designed to give overseas buyers more clarity and control." />
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-7 text-sm font-semibold text-[#092F2A] transition hover:bg-[#E7B93D]"
                  href="/properties"
                >
                  <T k="exploreResidences" />
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-[#D7B46A]/55 px-7 text-sm font-semibold text-[#FFFDF8] transition hover:border-[#D7B46A] hover:bg-[#D7B46A] hover:text-[#092F2A]"
                  href="/enquiry"
                >
                  <TD value="Book a Private Consultation" />
                </Link>
              </div>
            </div>

            <div className="mt-16 grid gap-px border-y border-[#D7B46A]/18 bg-[#D7B46A]/18 md:grid-cols-4">
              {trustIndicators.map((item) => (
                <div className="bg-[#062722] px-5 py-6 text-center" key={item}>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D7B46A]">
                    <TD value={item} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl rounded-sm border border-[#DFD4BF] bg-[#FFFDF8] p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A9851D]">
                <T k="ourServices" />
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#123C35] sm:text-4xl">
                <TD value="A guided service model for overseas buyers — from research and comparison to purchase coordination and managed ownership." />
              </h2>
            </div>
          </div>
        </section>

        <InvestorJourney variant="full" />

        <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center font-serif text-3xl font-semibold text-[#123C35] sm:text-4xl">
              <TD value="Built on Transparency" />
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {trustPillars.map((pillar) => (
                <article className="text-center" key={pillar.title}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm text-[#A9851D]">
                    <TrustIcon type={pillar.icon} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-tight text-[#123C35]">
                    <TD value={pillar.title} />
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#5F6B64]">
                    <TD value={pillar.description} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#092F2A] px-5 py-16 text-white sm:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-[#FFFDF8] sm:text-4xl">
              <TD value="Speak with an advisor before you shortlist" />
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#C6D0CA] sm:text-base">
              <TD value="Share your budget, preferred city and ownership goals. We will help you understand suitable districts, available residences and the next steps before you proceed." />
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-7 text-sm font-semibold text-[#092F2A] transition hover:bg-[#E7B93D]"
                href="/enquiry"
              >
                <TD value="Book a Private Consultation" />
              </Link>
              <Link
                className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-[#D7B46A]/55 px-7 text-sm font-semibold text-[#FFFDF8] transition hover:border-[#D7B46A] hover:bg-[#D7B46A] hover:text-[#092F2A]"
                href="/properties"
              >
                <TD value="Browse Residences" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TrustIcon({ type }: { type: string }) {
  if (type === "milestones") {
    return (
      <svg aria-hidden="true" className="h-9 w-9" fill="none" viewBox="0 0 24 24">
        <path d="M4 19h16M6 17V9l6-4 6 4v8M9 17v-5h6v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === "language") {
    return (
      <svg aria-hidden="true" className="h-9 w-9" fill="none" viewBox="0 0 24 24">
        <path d="M5 5h8M9 5v3m3-3c-.7 3.7-2.8 6.2-6 7.8M7.5 9.5c1.1 1.6 2.6 2.8 4.5 3.5M14 19l3.5-8L21 19m-5.8-3h4.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-9 w-9" fill="none" viewBox="0 0 24 24">
      <path d="M8 4h8l3 3v13H8V4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M16 4v4h4M4 9h5M4 13h5M4 17h5M12 14l2 2 3.5-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}
