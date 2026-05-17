import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LearnCard } from "@/components/learn-card";
import { PropertyCard } from "@/components/property-card";
import { ServiceCard } from "@/components/service-card";
import { learnArticles } from "@/data/learn";
import { featuredProperties } from "@/data/properties";

const whyVietnam = [
  "Young demographics and expanding middle-class housing demand",
  "Deep international tenant pools in Ho Chi Minh City and Hanoi",
  "Infrastructure-led growth across major urban districts",
];

const howItWorks = [
  "Tell us your budget, city preference, and investment goal",
  "Review curated properties with foreign buyer notes",
  "Connect with a matched local agent and legal coordinator",
  "Prepare for rental setup and owner reporting after purchase",
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47d32]">
                International Vietnam property investment
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-[#16231d] sm:text-6xl">
                Invest in Vietnam Property with Confidence
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b645f]">
                Curated, yield-led property opportunities in Ho Chi Minh City
                and Hanoi for Hong Kong and international investors
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            </div>
            <div className="rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-xl">
              <div className="min-h-80 rounded-sm bg-[linear-gradient(135deg,#d9d1c3,#f8f4ed_45%,#123c2b)] p-6">
                <div className="flex h-full min-h-72 flex-col justify-between border border-white/60 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#123c2b]">
                    HCMC · Hanoi
                  </p>
                  <div>
                    <p className="text-4xl font-semibold text-[#16231d]">6</p>
                    <p className="mt-2 text-sm text-[#4f5a54]">
                      Verified project profiles with yield, risk, and ownership notes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Why Vietnam"
              title="Urban growth, rental demand, and relative value in one market."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {whyVietnam.map((item) => (
                <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm" key={item}>
                  <p className="text-base leading-7 text-[#4f5a54]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="How It Works" title="A simple buyer path built for overseas investors." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, index) => (
                <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm" key={step}>
                  <p className="font-mono text-sm text-[#a47d32]">0{index + 1}</p>
                  <p className="mt-6 text-sm leading-7 text-[#4f5a54]">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="Featured Properties" title="Investment-led opportunities, not generic listings." />
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

        <section className="bg-[#f3efe8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Services" title="Front-end structure for the core advisory workflow." />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard {...service} key={service.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Learn"
                title="Education for foreign investors entering Vietnam."
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

        <section className="bg-[#f3efe8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionTitle eyebrow="FAQ" title="Common first questions for international buyers." />
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
