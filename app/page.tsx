import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomepageInvestmentDiscovery } from "@/components/homepage-investment-discovery";
import { InvestorJourney } from "@/components/investor-journey";
import { T, TD } from "@/components/localized-text";
import { ProjectCard } from "@/components/project-card";
import { UniversalSearch } from "@/components/universal-search";
import { getProjects } from "@/services/projectService";

const whyVietnam = [
  {
    title: "Urban income growth",
    description: "Rising income supports long-term residential demand.",
  },
  {
    title: "Deep tenant pools",
    description:
      "HCMC and Hanoi attract professionals, expats, and corporate tenants.",
  },
  {
    title: "Infrastructure upside",
    description:
      "Metro lines, bridges, and new urban zones are reshaping access and rental demand.",
  },
];

export default async function Home() {
  const projects = await getProjects();
  const featuredResidences = projects.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[560px] overflow-visible px-5 py-20 text-white sm:min-h-[640px] sm:px-8 lg:min-h-[720px] lg:py-24">
          <Image
            alt=""
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/mock-images/heroes/vietnam-investment-hero.jpg"
          />
          <div className="absolute inset-0 bg-[#0F172A]/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,200,76,0.22),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.36),rgba(15,23,42,0.78))]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center pt-4">
            <div className="w-full text-center">
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-7xl xl:text-[80px]">
                <span className="block">
                  <TD value="Find it. Own it." />
                </span>
                <span className="block text-[#F5C84C]">
                  <TD value="Manage it all." />
                </span>
              </h1>
              <div className="mt-6 sm:mt-7">
                <UniversalSearch />
              </div>
            </div>
          </div>
        </section>

        <HomepageInvestmentDiscovery projects={projects} />

        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow={<TD value="Why Vietnam" />}
              title={<TD value="A focused market thesis." />}
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {whyVietnam.map((item) => (
                <article className="premium-card rounded-sm border border-[#ECE7DA] bg-white p-7 shadow-sm" key={item.title}>
                  <p className="text-xl font-semibold leading-7 text-[#1F2937]">
                    <TD value={item.title} />
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                    <TD value={item.description} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle eyebrow={<TD value="Featured Residences" />} title={<TD value="Selected investment residences." />} />
              <Link
                className="premium-focus-ring inline-flex min-h-11 w-fit items-center rounded-sm border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] hover:border-[#F5C84C]"
                href="/properties"
              >
                <T k="browseInvestmentCases" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredResidences.map((project) => (
                <ProjectCard project={project} variant="homepage" key={project.id} />
              ))}
            </div>
          </div>
        </section>

        <InvestorJourney />
      </main>
      <Footer />
    </>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
