import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestorJourney } from "@/components/investor-journey";
import { LearnCard } from "@/components/learn-card";
import { T, TD } from "@/components/localized-text";
import { PropertyCard } from "@/components/property-card";
import { ServiceCard } from "@/components/service-card";
import { buyerGoals } from "@/data/buyer-goals";
import { learnArticles } from "@/data/learn";
import { getFeaturedProperties } from "@/services/propertyService";

const whyVietnam = [
  "Urban income growth",
  "Deep tenant pools",
  "Infrastructure upside",
];

const services = [
  {
    marker: "01",
    title: "Property sourcing",
    description: "Curated residential opportunities in Ho Chi Minh City and Hanoi based on buyer mandate.",
  },
  {
    marker: "02",
    title: "Foreign buyer guidance",
    description: "Ownership quota checks, document preparation guidance, and transaction process support.",
  },
  {
    marker: "03",
    title: "Rental management",
    description: "Future-ready post-sale setup for tenant placement, reporting, and maintenance coordination.",
  },
];

const faqs = [
  {
    question: "Can foreigners buy property in Vietnam?",
    answer:
      "Foreign buyers can generally buy eligible residential units subject to building-level foreign ownership quotas and legal review.",
  },
  {
    question: "Which cities does the MVP cover?",
    answer: "The first version focuses on Ho Chi Minh City and Hanoi.",
  },
  {
    question: "Is rental management live yet?",
    answer:
      "Not yet. The owner portal and rental management areas are placeholders for future app functionality.",
  },
];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      <Header />
      <main>
        <section
          className="relative overflow-hidden bg-cover bg-center px-5 py-20 sm:px-8 lg:py-28"
          style={{ backgroundImage: "url('/images/generated/vietnam-investment-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#FFFDF8]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/86 to-[#FFFDF8]/42" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-sm border border-[#ECE7DA] bg-white/92 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#1F2937]">
                <T k="heroEyebrow" />
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-[#1F2937] sm:text-6xl">
                <T k="heroTitle" />
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B7280]">
                <T k="heroSubtitle" />
              </p>
              <div className="mt-8 rounded-sm border border-[#ECE7DA] bg-white p-3 shadow-lg">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <div className="rounded-sm border border-[#ECE7DA] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                      <T k="city" />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1F2937]">
                      <T k="hcmcOrHanoi" />
                    </p>
                  </div>
                  <div className="rounded-sm border border-[#ECE7DA] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                      <T k="strategy" />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1F2937]">
                      <T k="heroStrategy" />
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-14 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                    href="/properties"
                  >
                    <T k="browseInvestmentCases" />
                  </Link>
                </div>
              </div>
              <Link
                className="mt-5 inline-flex text-sm font-semibold text-[#1F2937] transition hover:text-[#E7B93D]"
                href="/enquiry"
              >
                <T k="speakToAdvisor" />
              </Link>
            </div>
            <div className="rounded-sm border border-[#ECE7DA] bg-white/92 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F2937]">
                HCMC · Hanoi
              </p>
              <p className="mt-6 text-5xl font-semibold text-[#1F2937]">6</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                <TD value="Investment-screened projects with yield, risk, ownership, and rental management context." />
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ECE7DA]">
                <div className="h-full w-3/4 rounded-full bg-[#F5C84C]" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow={<TD value="Why Vietnam" />}
              title={<TD value="A focused market thesis." />}
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {whyVietnam.map((item) => (
                <article className="rounded-sm border border-[#ECE7DA] bg-white p-8 shadow-sm" key={item}>
                  <p className="text-xl font-semibold leading-7 text-[#1F2937]">
                    <TD value={item} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionTitle
                eyebrow={<TD value="Ho Chi Minh City" />}
                title={<TD value="Aerial view of Vietnam's growth market." />}
              />
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#6B7280]">
                <TD value="A high-level view of the market helps overseas buyers understand scale, infrastructure, riverfront districts, and long-term rental corridors before comparing individual projects." />
              </p>
              <Link
                className="mt-7 inline-flex min-h-11 items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href="/properties?city=Ho%20Chi%20Minh%20City"
              >
                <T k="browseInvestmentCases" />
              </Link>
            </div>
            <div
              className="min-h-[360px] rounded-sm bg-cover bg-center shadow-xl"
              style={{ backgroundImage: "url('/images/generated/hcmc-sky-view.png')" }}
              aria-label="Aerial view of Ho Chi Minh City"
            />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow={<TD value="Start with your investment goal" />}
                title={<TD value="Choose your buyer path." />}
              />
              <p className="max-w-md text-sm leading-7 text-[#6B7280]">
                <TD value="Open a pre-filtered view with matched districts and assets." />
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {buyerGoals.map((goal) => (
                <Link
                  className="group rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F5C84C] hover:shadow-xl"
                  href={`/properties?goal=${goal.slug}`}
                  key={goal.slug}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E7B93D]">
                    <TD value="Buyer path" />
                  </p>
                  <h2 className="mt-3 text-xl font-semibold leading-tight text-[#1F2937]">
                    <TD value={goal.title} />
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#6B7280]">
                    <TD value={goal.summary} />
                  </p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-[#1F2937]">
                <T k="browseInvestmentCases" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <InvestorJourney />

        <section className="bg-[#FFFDF8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle eyebrow={<TD value="Featured properties" />} title={<TD value="Selected investment cases." />} />
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href="/properties"
              >
                <T k="browseInvestmentCases" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard property={property} key={property.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={<T k="navigationServices" />} title={<TD value="Advisory support across the transaction." />} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard {...service} key={service.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow={<T k="learn" />}
                title={<TD value="Investor education." />}
              />
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href="/learn"
              >
                <T k="learn" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {learnArticles.map((article) => (
                <LearnCard {...article} key={article.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionTitle eyebrow={<TD value="FAQ" />} title={<TD value="Common questions." />} />
            <div className="mt-10 divide-y divide-[#ECE7DA] rounded-sm border border-[#ECE7DA] bg-white">
              {faqs.map((faq) => (
                <article className="p-6" key={faq.question}>
                  <h2 className="text-lg font-semibold text-[#1F2937]"><TD value={faq.question} /></h2>
                  <p className="mt-3 text-sm leading-7 text-[#6B7280]"><TD value={faq.answer} /></p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B93D]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
