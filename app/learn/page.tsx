import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";

const learnTopics = [
  {
    slug: "foreign-ownership",
    title: "Foreign Ownership",
    description: "What overseas buyers can and cannot own in Vietnam.",
    count: "4 guides",
    visual: "ownership",
  },
  {
    slug: "foreigner-quota",
    title: "Foreigner Quota",
    description: "How building-level quota checks affect reservation timing.",
    count: "3 guides",
    visual: "quota",
  },
  {
    slug: "buying-process",
    title: "Buying Process",
    description: "The steps from shortlist to reservation and handover.",
    count: "5 guides",
    visual: "process",
  },
  {
    slug: "taxes-fees",
    title: "Taxes & Fees",
    description: "Indicative costs to review before committing capital.",
    count: "3 guides",
    visual: "fees",
  },
  {
    slug: "agency-culture",
    title: "Agency Culture",
    description: "How local agents, advisors and developers usually interact.",
    count: "2 guides",
    visual: "agency",
  },
  {
    slug: "rental-management",
    title: "Rental Management",
    description: "How overseas owners can coordinate leasing remotely.",
    count: "4 guides",
    visual: "rental",
  },
  {
    slug: "district-guides",
    title: "District Guides",
    description: "Compare lifestyle, tenant demand and district positioning.",
    count: "6 guides",
    visual: "district",
  },
  {
    slug: "legal-due-diligence",
    title: "Legal & Due Diligence",
    description: "Documents and checks to complete before reservation.",
    count: "4 guides",
    visual: "legal",
  },
];

const learnArticles = [
  {
    category: "Foreign Ownership",
    title: "Can foreigners buy property in Vietnam?",
    excerpt: "A practical introduction to ownership structures, eligible residential assets and advisor review.",
    readTime: "6 min read",
    image: "/mock-images/districts/hcmc-sky-view.png",
    featured: true,
  },
  {
    category: "Ownership Rules",
    title: "Understanding foreign ownership quota",
    excerpt: "Why quota is checked at building and unit level before reservation.",
    readTime: "5 min read",
    image: "/mock-images/projects/thu-thiem-river-residence.jpg",
    featured: true,
  },
  {
    category: "Buying Costs",
    title: "Hidden buying costs in HCMC",
    excerpt: "Service charges, furnishing budgets, taxes and transaction assumptions to review.",
    readTime: "7 min read",
    image: "/mock-images/units/luxury-lobby.svg",
  },
  {
    category: "Owner Setup",
    title: "How rental management works",
    excerpt: "A simple view of leasing, furnishing, reporting and remote owner coordination.",
    readTime: "5 min read",
    image: "/mock-images/units/rooftop-pool.svg",
  },
  {
    category: "Districts",
    title: "District 1 vs Thu Thiem vs Thao Dien",
    excerpt: "How CBD prestige, riverside growth and expat lifestyle demand compare.",
    readTime: "8 min read",
    image: "/mock-images/districts/thu-thiem-district-vision.jpg",
  },
  {
    category: "Legal Checks",
    title: "Common legal checks before reservation",
    excerpt: "Documents, quota, payment milestones and unit-level checks to clarify early.",
    readTime: "6 min read",
    image: "/mock-images/floorplans/floorplan-3d-2br.svg",
  },
];

const learnFaqs = [
  {
    question: "Can foreigners own freehold property in Vietnam?",
    answer:
      "Foreign buyers typically need to review the ownership structure, property type and project-level eligibility. Unit-level legal checks should be completed before reservation.",
  },
  {
    question: "What is the foreign ownership quota?",
    answer:
      "It is an indicative limit on foreign ownership within eligible residential buildings or landed housing areas. Availability can change and should be confirmed before payment.",
  },
  {
    question: "Do I need a Vietnam company to buy?",
    answer:
      "Many overseas buyers purchase as individuals, but the correct structure depends on the asset, buyer profile and legal advice.",
  },
  {
    question: "Can I manage the property remotely?",
    answer:
      "Remote ownership is possible when leasing, furnishing, reporting and maintenance are coordinated through a reliable local setup.",
  },
  {
    question: "Is rental income taxable?",
    answer:
      "Rental income may be subject to local tax rules. Buyers should obtain professional tax advice before relying on projected net returns.",
  },
  {
    question: "Can I pay using overseas funds?",
    answer:
      "Payment routes, currency handling and bank documentation should be confirmed early with the advisor, bank and legal team.",
  },
];

export default function LearnPage() {
  const featuredArticles = learnArticles.filter((article) => article.featured);
  const secondaryArticles = learnArticles.filter((article) => !article.featured);

  return (
    <>
      <Header />
      <main className="bg-[#FFFDF8]">
        <section className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,200,76,0.18),transparent_28%),linear-gradient(135deg,#FFF8E8_0%,#FFFDF8_52%,#F7F0E2_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#A9851D]">
                <T k="learn" />
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight text-[#1F2937] sm:text-7xl">
                <T k="learn" />
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#5F6B7A] sm:text-lg">
                <TD value="Investment knowledge, ownership guidance, and practical buying insights for overseas buyers." />
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Ownership rules", "Buying process", "Rental management"].map((item) => (
                  <span className="rounded-full border border-[#D8CDAF] bg-white/80 px-4 py-2 text-xs font-semibold text-[#1F2937] shadow-sm" key={item}>
                    <TD value={item} />
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[330px] overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_28px_80px_rgba(31,41,55,0.10)] lg:min-h-[440px]">
              <Image
                alt=""
                className="object-cover object-center"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                src="/mock-images/heroes/vietnam-investment-hero.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1F2937]/28 via-transparent to-[#F5C84C]/16" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/78 p-5 shadow-sm backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
                  <TD value="Knowledge base" />
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1F2937]">
                  <TD value="Practical guidance for cross-border buyers." />
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16" id="topics">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="By Topics"
              intro="Explore key topics for overseas buyers."
              ctaHref="/learn?search=topics"
              ctaLabel="Search all learning topics"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {learnTopics.map((topic) => (
                <Link
                  className="group overflow-hidden rounded-3xl border border-[#ECE7DA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#E7B93D] hover:shadow-[0_18px_50px_rgba(31,41,55,0.08)]"
                  href={`/learn?topic=${topic.slug}`}
                  key={topic.slug}
                >
                  <TopicVisual visual={topic.visual} />
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9851D]">
                      <TD value={topic.count} />
                    </p>
                    <h2 className="mt-3 text-lg font-semibold leading-tight text-[#1F2937]">
                      <TD value={topic.title} />
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      <TD value={topic.description} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16" id="articles">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Articles"
              intro="Practical guides and market insights for overseas buyers."
              ctaHref="/learn?search=articles"
              ctaLabel="Search all articles"
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {featuredArticles.map((article) => (
                <ArticleCard article={article} featured key={article.title} />
              ))}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {secondaryArticles.map((article) => (
                <ArticleCard article={article} key={article.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16" id="faq">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="FAQ"
              intro="Short answers to common overseas-buyer questions."
              ctaHref="/learn?search=faqs"
              ctaLabel="Search all FAQs"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="grid gap-3">
                {learnFaqs.map((faq) => (
                  <details className="group rounded-2xl border border-[#ECE7DA] bg-white p-5 shadow-sm open:border-[#E7B93D]/70" key={faq.question}>
                    <summary className="cursor-pointer list-none text-base font-semibold text-[#1F2937]">
                      <span className="flex items-center justify-between gap-4">
                        <TD value={faq.question} />
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D8CDAF] text-[#A9851D] transition group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6B7280]">
                      <TD value={faq.answer} />
                    </p>
                    <Link className="mt-4 inline-flex text-sm font-semibold text-[#A9851D] hover:text-[#1F2937]" href="/learn?search=faqs">
                      <TD value="Learn more" />
                    </Link>
                  </details>
                ))}
              </div>
              <div className="overflow-hidden rounded-[30px] border border-[#ECE7DA] bg-white shadow-[0_20px_60px_rgba(31,41,55,0.07)]">
                <div className="relative aspect-[4/3] bg-[#FFF8E8]">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    src="/mock-images/units/premium-living-room.svg"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
                    <TD value="Need a specific answer?" />
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
                    <TD value="Search our knowledge base or contact us." />
                  </h2>
                  <LinkButton href="/learn?search=knowledge-base" label="Search the full knowledge base" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({
  ctaHref,
  ctaLabel,
  intro,
  title,
}: {
  ctaHref: string;
  ctaLabel: string;
  intro: string;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <h2 className="text-3xl font-semibold text-[#1F2937]">
          <TD value={title} />
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
          <TD value={intro} />
        </p>
      </div>
      <LinkButton href={ctaHref} label={ctaLabel} />
    </div>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="premium-focus-ring inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] shadow-sm transition hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
      href={href}
    >
      <TD value={label} />
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function TopicVisual({ visual }: { visual: string }) {
  return (
    <div className="relative h-36 overflow-hidden bg-[#FFF8E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(245,200,76,0.34),transparent_30%),linear-gradient(135deg,#FFFDF8_0%,#F3E5C5_48%,#E8F0EF_100%)]" />
      <div className="absolute inset-0 opacity-[0.20] [background-image:linear-gradient(rgba(184,138,24,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(184,138,24,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -left-10 bottom-5 h-20 w-40 -rotate-6 rounded-full bg-[#AFC7D8]/35" />
      <div className="absolute right-5 top-5 h-12 w-12 rounded-2xl border border-[#C7A76C]/35 bg-white/45" />
      <div className="absolute bottom-6 right-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#C7A76C]/45 bg-white/70 text-[#A9851D] shadow-sm">
        <TopicIcon visual={visual} />
      </div>
    </div>
  );
}

function TopicIcon({ visual }: { visual: string }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (visual === "quota" || visual === "legal") {
    return (
      <svg {...commonProps}>
        <path d="M7 4h10l2 4v12H5V8l2-4Z" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (visual === "rental" || visual === "district") {
    return (
      <svg {...commonProps}>
        <path d="M3 20h18" />
        <path d="M6 20V8l6-4 6 4v12" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  if (visual === "process" || visual === "agency") {
    return (
      <svg {...commonProps}>
        <path d="M5 7h14" />
        <path d="M5 12h14" />
        <path d="M5 17h14" />
        <path d="M8 4v16" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3v18" />
      <path d="M6 8h12" />
      <path d="M8 21h8" />
      <path d="M7 8l-3 6h6L7 8Z" />
      <path d="M17 8l-3 6h6l-3-6Z" />
    </svg>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: (typeof learnArticles)[number];
  featured?: boolean;
}) {
  return (
    <article className={`group overflow-hidden rounded-3xl border border-[#ECE7DA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#E7B93D] hover:shadow-[0_18px_50px_rgba(31,41,55,0.08)] ${featured ? "lg:grid lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
      <div className={`relative overflow-hidden bg-[#F8F3E8] ${featured ? "min-h-[260px]" : "aspect-[4/3]"}`}>
        <Image
          alt=""
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
          fill
          sizes={featured ? "(min-width: 1024px) 28vw, 100vw" : "(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"}
          src={article.image}
        />
      </div>
      <div className={featured ? "p-6 sm:p-7" : "p-5"}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9851D]">
          <TD value={article.category} />
        </p>
        <h3 className={`${featured ? "text-2xl" : "text-lg"} mt-3 font-semibold leading-tight text-[#1F2937]`}>
          <TD value={article.title} />
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#6B7280]">
          <TD value={article.excerpt} />
        </p>
        <div className="mt-5 flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-[#8A7B58]">
            <TD value={article.readTime} />
          </span>
          <Link className="font-semibold text-[#A9851D] hover:text-[#1F2937]" href="/learn?search=articles">
            <TD value="Read article" />
          </Link>
        </div>
      </div>
    </article>
  );
}
