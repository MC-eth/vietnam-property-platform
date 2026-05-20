import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestorJourney } from "@/components/investor-journey";
import { PageHeading } from "@/components/page-heading";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="How it works"
            title="A guided investment journey for overseas buyers."
            description="From property discovery to transaction coordination and owner reporting, the platform is structured around the full cross-border buying lifecycle."
          />
          <div className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#123c2b] px-6 text-sm font-semibold text-white transition hover:bg-[#0d2d20]"
              href="/properties"
            >
              Browse Properties
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#123c2b] px-6 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
              href="/enquiry"
            >
              Speak to Advisor
            </Link>
          </div>
        </section>

        <InvestorJourney variant="full" />
      </main>
      <Footer />
    </>
  );
}
