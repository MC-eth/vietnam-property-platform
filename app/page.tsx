import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomepageInvestmentDiscovery } from "@/components/homepage-investment-discovery";
import { InvestorJourney } from "@/components/investor-journey";
import { T, TD } from "@/components/localized-text";
import { ProjectCard } from "@/components/project-card";
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
        <section
          className="relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9EA] via-[#FFFDF8] to-white" />
          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                <T k="heroEyebrow" />
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] text-[#1F2937] sm:text-6xl lg:text-7xl">
                <T k="heroTitle" />
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6B7280]">
                <T k="heroSubtitle" />
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm bg-[#E7B93D] px-6 text-sm font-semibold text-[#1F2937] hover:bg-[#D8AA2F]"
                  href="/enquiry"
                >
                  <T k="bookInvestorConsultation" />
                </Link>
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-[#D8CDAF] bg-white/80 px-6 text-sm font-semibold text-[#1F2937] hover:border-[#BFAF86]"
                  href="/properties"
                >
                  <T k="browseInvestmentCases" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(31,41,55,0.14)]">
                <div
                  className="hero-ken-burns min-h-[360px] bg-cover bg-center sm:min-h-[520px]"
                  style={{ backgroundImage: "url('/mock-images/heroes/hcmc-sky-view.png')" }}
                  aria-label="Aerial view of Ho Chi Minh City"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-white/70 bg-white/88 p-5 shadow-sm backdrop-blur md:right-auto md:w-80">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                  HCMC · Hanoi
                </p>
                <p className="mt-3 text-sm leading-7 text-[#1F2937]">
                  <TD value="Investment-screened residences with yield, demand, foreign-buyer status, and rental management context." />
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#ECE7DA] pt-4 text-xs text-[#6B7280]">
                  <span>Thu Thiem</span>
                  <span>Tay Ho</span>
                </div>
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
