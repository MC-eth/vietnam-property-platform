import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestorJourney } from "@/components/investor-journey";
import { LearnCard } from "@/components/learn-card";
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
          <div className="absolute inset-0 bg-[#0f1f18]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f18] via-[#0f1f18]/78 to-[#0f1f18]/24" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-sm bg-[#ffdb4d] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#17231d]">
                Vietnam property investment
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                Invest in Vietnam with clarity.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                Curated HCMC and Hanoi opportunities for international buyers.
              </p>
              <div className="mt-8 rounded-sm border border-white/18 bg-white p-3 shadow-2xl">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <div className="rounded-sm border border-[#e1dbd0] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d746f]">
                      City
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#16231d]">
                      HCMC or Hanoi
                    </p>
                  </div>
                  <div className="rounded-sm border border-[#e1dbd0] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d746f]">
                      Strategy
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#16231d]">
                      Yield, growth, or remote ownership
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-14 items-center justify-center rounded-sm bg-[#123c2b] px-6 text-sm font-semibold text-white transition hover:bg-[#0d2d20]"
                    href="/properties"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>
              <Link
                className="mt-5 inline-flex text-sm font-semibold text-[#ffdb4d] transition hover:text-white"
                href="/enquiry"
              >
                Speak to Advisor
              </Link>
            </div>
            <div className="rounded-sm border border-white/20 bg-white/92 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b4e18]">
                HCMC · Hanoi
              </p>
              <p className="mt-6 text-5xl font-semibold text-[#16231d]">6</p>
              <p className="mt-3 text-sm leading-7 text-[#4f5a54]">
                Investment-screened projects with yield, risk, ownership, and
                rental management context.
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#efe7d8]">
                <div className="h-full w-3/4 rounded-full bg-[#ffdb4d]" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Why Vietnam"
              title="A focused market thesis."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {whyVietnam.map((item) => (
                <article className="rounded-sm border border-[#e1dbd0] bg-white p-8 shadow-sm" key={item}>
                  <p className="text-xl font-semibold leading-7 text-[#16231d]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Start with your investment goal"
                title="Choose your buyer path."
              />
              <p className="max-w-md text-sm leading-7 text-[#5b645f]">
                Open a pre-filtered view with matched districts and assets.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {buyerGoals.map((goal) => (
                <Link
                  className="group rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#123c2b] hover:shadow-xl"
                  href={`/properties?goal=${goal.slug}`}
                  key={goal.slug}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a47d32]">
                    Buyer path
                  </p>
                  <h2 className="mt-3 text-xl font-semibold leading-tight text-[#16231d]">
                    {goal.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#5b645f]">{goal.summary}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-[#123c2b]">
                    View recommendations
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <InvestorJourney />

        <section className="bg-[#f3efe8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle eyebrow="Featured properties" title="Selected investment cases." />
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#123c2b] px-5 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
                href="/properties"
              >
                View all properties
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
            <SectionTitle eyebrow="Services" title="Advisory support across the transaction." />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard {...service} key={service.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe8] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Learn"
                title="Investor education."
              />
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#123c2b] px-5 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
                href="/learn"
              >
                Visit Learn
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
            <SectionTitle eyebrow="FAQ" title="Common questions." />
            <div className="mt-10 divide-y divide-[#e1dbd0] rounded-sm border border-[#e1dbd0] bg-white">
              {faqs.map((faq) => (
                <article className="p-6" key={faq.question}>
                  <h2 className="text-lg font-semibold text-[#16231d]">{faq.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5b645f]">{faq.answer}</p>
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

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47d32]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#16231d] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
