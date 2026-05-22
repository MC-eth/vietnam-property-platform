import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestorJourney } from "@/components/investor-journey";
import { T, TD } from "@/components/localized-text";
import { PageHeading } from "@/components/page-heading";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={<T k="howItWorks" />}
            title={<TD value="A guided investment journey for overseas buyers." />}
            description={<TD value="From property discovery to transaction coordination and owner reporting, the platform is structured around the full cross-border buying lifecycle." />}
          />
          <div className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
              href="/properties"
            >
              <T k="browseInvestmentCases" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
              href="/enquiry"
            >
              <T k="bookInvestorConsultation" />
            </Link>
          </div>
        </section>

        <InvestorJourney variant="full" />
      </main>
      <Footer />
    </>
  );
}
