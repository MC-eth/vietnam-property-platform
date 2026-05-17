import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LearnCard } from "@/components/learn-card";
import { PageHeading } from "@/components/page-heading";
import { learnArticles } from "@/data/learn";

const guideTopics = [
  "Foreign ownership quota checks",
  "Legal coordination before reservation",
  "Rental yield and vacancy assumptions",
  "USD and HKD capital planning",
  "Agent matching and viewing process",
  "Post-sale rental management setup",
];

export default function LearnPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Learn"
            title="Investor education for Vietnam property buyers."
            description="A knowledge hub for Hong Kong and international investors comparing Vietnam residential opportunities."
          />
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {learnArticles.map((article) => (
              <LearnCard {...article} key={article.title} />
            ))}
          </div>
        </section>

        <section className="bg-[#f3efe8] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
                Foreign investor checklist
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#16231d]">
                What buyers should understand before selecting a project.
              </h2>
              <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {guideTopics.map((topic) => (
                  <div
                    className="rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-4 text-sm font-semibold text-[#16231d]"
                    key={topic}
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
