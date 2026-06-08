import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DistrictTimeline } from "@/components/district-timeline";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { districtInsights, getDistrictInsightBySlug } from "@/data/district-insights";
import { getProjects } from "@/services/projectService";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { DistrictFutureAdvantage, DistrictGrowthDriver } from "@/types/district";
import type { Project } from "@/types/project";

type DistrictInsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return districtInsights.flatMap((district) => [
    { slug: district.slug },
    ...(district.aliases ?? []).map((slug) => ({ slug })),
  ]);
}

export default async function DistrictInsightPage({ params }: DistrictInsightPageProps) {
  const { slug } = await params;
  const district = getDistrictInsightBySlug(slug);

  if (!district) {
    notFound();
  }

  const projects = await getProjects();
  const selectedResidences = district.selectedResidenceSlugs
    .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
    .filter((project): project is Project => Boolean(project));
  const filterHref = `/properties?district=${encodeURIComponent(district.ctaDistrictFilter)}`;
  const heroQuickFacts = district.heroQuickFacts ?? [
    { label: "District role", value: district.basicInfo.districtRole },
    { label: "Rental profile", value: district.rentalDemand },
    { label: "Residences", value: `${selectedResidences.length}` },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#FFFDF8]">
        <section className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(245,200,76,0.20),transparent_28%),linear-gradient(135deg,#FFF8E8_0%,#FFFDF8_52%,#F7F0E2_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Link className="text-sm font-semibold text-[#A9851D]" href="/districts">
                <T k="districtInsights" />
              </Link>
              <h1 className="mt-8 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-6xl">
                <TD value={district.displayName} />
              </h1>
              <HeroQuickFacts facts={heroQuickFacts} />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                  href={filterHref}
                >
                  <T k="exploreResidences" />
                </Link>
                <a
                  className="premium-focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8CDAF] bg-white/80 px-6 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D]"
                  href="#key-timeline"
                >
                  <T k="viewTimeline" />
                </a>
              </div>
            </div>

            <DistrictHeroVisual
              alt={district.districtHeroVisualAlt}
              caption={district.districtHeroVisualCaption}
              imagePath={district.districtHeroVisualImage}
            />
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-[#ECE7DA] bg-white p-6 shadow-sm lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B88A18]">
                <T k="masterPlanContext" />
              </p>
              <div className="mt-5 grid gap-5 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                    <T k="urbanZone" />
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1F2937]">
                    <TD value={district.urbanZoneDisplayName} />
                  </h2>
                </div>
                <div>
                  <p className="text-base leading-7 text-[#374151]">
                    <TD value={district.masterPlanShortContext ?? district.masterPlanContext} />
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                    <TD value={district.planningDisclaimer ?? "Planning context only. Investment outcomes are not guaranteed."} />
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 px-1 text-[11px] leading-5 text-[#9A8D74]">
              <T k="basedOnPublicMasterPlan" />
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16" id="key-timeline">
          <div className="mx-auto max-w-7xl">
            <SectionIntro title={<T k="keyTimeline" />} />
            <div className="mt-8 rounded-2xl border border-[#ECE7DA] bg-white p-6 shadow-sm">
              <DistrictTimeline items={district.timeline} />
            </div>
          </div>
        </section>

        <DistrictDriversSection district={district} />

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <SectionIntro
                title={
                  district.selectedResidencesTitle ? (
                    <TD value={district.selectedResidencesTitle} />
                  ) : district.slug === "thu-thiem" ? (
                    <T k="selectedResidencesThuThiem" />
                  ) : (
                    <T k="selectedResidencesInThisDistrict" />
                  )
                }
              />
              <Link
                className="premium-focus-ring inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] transition hover:border-[#E7B93D]"
                href={filterHref}
              >
                {district.exploreResidencesCtaLabel ? (
                  <TD value={district.exploreResidencesCtaLabel} />
                ) : (
                  <T k="exploreResidences" />
                )}
              </Link>
            </div>

            {selectedResidences.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {selectedResidences.map((project) => (
                  <ResidencePreviewCard project={project} key={project.id} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-[#ECE7DA] bg-white p-6 text-sm text-[#6B7280] shadow-sm">
                <T k="noResidencesForDistrict" />
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

function DistrictHeroVisual({
  alt,
  caption,
  imagePath,
}: {
  alt?: string;
  caption?: string;
  imagePath?: string;
}) {
  const hasImage = hasLocalImage(imagePath);

  return (
    <figure>
      <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden rounded-[28px] border border-white/80 bg-white/70 shadow-[0_28px_80px_rgba(31,41,55,0.12)] backdrop-blur sm:min-h-[360px] lg:min-h-[440px]">
        {imagePath && hasImage ? (
          <Image
            alt={alt ?? ""}
            className="object-cover object-[center_44%]"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            src={imagePath}
          />
        ) : (
          <AbstractPlanningVisual density="hero" />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 px-2 text-xs leading-5 text-[#7A6F5A]">
          <TD value={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

function HeroQuickFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <div className="mt-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
        <T k="atAGlance" />
      </p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {facts.map((fact) => (
          <div
            className="rounded-2xl border border-[#E7B93D]/35 bg-white/78 px-4 py-3 shadow-sm backdrop-blur"
            key={`${fact.label}-${fact.value}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A6F5A]">
              <TD value={fact.label} />
            </p>
            <p className="mt-1.5 text-sm font-semibold leading-5 text-[#1F2937]">
              <TD value={fact.value} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistrictDriversSection({
  district,
}: {
  district: {
    districtHeroVisualImage?: string;
    futureAdvantages: DistrictFutureAdvantage[];
    growthDrivers?: DistrictGrowthDriver[];
    infrastructureConceptImage?: string;
    lifestyleCommercialConceptImage?: string;
    strategicDiagramImage?: string;
  };
}) {
  const drivers =
    district.growthDrivers ??
    district.futureAdvantages.slice(0, 4).map((advantage, index) => ({
      bullets: [],
      description: advantage.description,
      icon: advantage.icon ?? "building",
      id: advantage.category ?? `district-driver-${index}`,
      title: advantage.title,
    }));
  const features = drivers.map((driver, index) => {
    const visualConfig = getDriverVisualConfig(index, district);

    return {
      ...driver,
      ...visualConfig,
    };
  });

  return (
    <section className="px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          subtitle={<T k="districtDriversFutureVisionSubtitle" />}
          title={<T k="districtDriversFutureVision" />}
        />
        <div className="mt-9 grid gap-6">
          {features.map((feature, index) => (
            <DistrictDriverFeatureCard feature={feature} index={index} key={feature.id} />
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-[#8A7B58]">
          <T k="growthDriversSourceNote" />
        </p>
      </div>
    </section>
  );
}

type DriverFeature = DistrictGrowthDriver & {
  imagePath?: string;
  placeholderLabel: string;
  variant: "transport" | "lifestyle" | "commercial" | "industry";
};

function DistrictDriverFeatureCard({ feature, index }: { feature: DriverFeature; index: number }) {
  const visual = <DriverVisual feature={feature} />;
  const text = (
    <div className="p-6 sm:p-7 lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B88A18]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#1F2937]">
        <TD value={feature.title} />
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4B5563]">
        <TD value={feature.description} />
      </p>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#A9851D]">
        <T k="keyExamples" />
      </p>
      <ul className="mt-3 grid gap-2.5 text-sm font-medium leading-6 text-[#374151]">
        {feature.bullets.map((bullet) => {
          const example = typeof bullet === "string" ? { status: undefined, text: bullet } : bullet;

          return (
            <li className="flex gap-3" key={example.text}>
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B88A18]" />
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {example.status ? (
                  <span className="inline-flex shrink-0 rounded-full border border-[#D8CDAF] bg-[#FFF8E8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A6B16]">
                    <TD value={example.status} />
                  </span>
                ) : null}
                <span>
                  <TD value={example.text} />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      {feature.whyItMatters ? (
        <div className="mt-5 rounded-2xl border border-[#ECE7DA] bg-[#FFFDF8] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A9851D]">
            <T k="whyItMatters" />
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4B5563]">
            <TD value={feature.whyItMatters} />
          </p>
        </div>
      ) : null}
      {feature.statusNote ? (
        <p className="mt-4 border-t border-[#ECE7DA] pt-4 text-xs leading-5 text-[#8A7B58]">
          <TD value={feature.statusNote} />
        </p>
      ) : null}
    </div>
  );
  const shouldReverse = index % 2 === 1;

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#ECE7DA] bg-white shadow-[0_20px_60px_rgba(31,41,55,0.07)]">
      <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
        <div className={shouldReverse ? "lg:order-2" : undefined}>{text}</div>
        <div className={shouldReverse ? "lg:order-1" : undefined}>{visual}</div>
      </div>
    </article>
  );
}

function DriverVisual({ feature }: { feature: DriverFeature }) {
  const hasImage = hasLocalImage(feature.imagePath);

  return (
    <div className="relative min-h-[240px] overflow-hidden bg-[#FFF8E8] lg:h-full lg:min-h-[350px]">
      {feature.imagePath && hasImage ? (
        <>
          <Image
            alt=""
            className="object-cover object-[center_42%]"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={feature.imagePath}
          />
          {feature.variant === "commercial" ? (
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/78 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-xs leading-5 text-[#6B7280]">
                <T k="districtHeroVisualCaption" />
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <AbstractPlanningVisual density={feature.variant} />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold text-[#1F2937]">
              <TD value={feature.placeholderLabel} />
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function getDriverVisualConfig(
  index: number,
  district: {
    districtHeroVisualImage?: string;
    infrastructureConceptImage?: string;
    lifestyleCommercialConceptImage?: string;
    strategicDiagramImage?: string;
  },
): Pick<DriverFeature, "imagePath" | "placeholderLabel" | "variant"> {
  const configs: Pick<DriverFeature, "imagePath" | "placeholderLabel" | "variant">[] = [
    {
      imagePath: district.infrastructureConceptImage,
      placeholderLabel: "Transport Concept Visual",
      variant: "transport",
    },
    {
      imagePath: district.lifestyleCommercialConceptImage,
      placeholderLabel: "Lifestyle Concept Visual",
      variant: "lifestyle",
    },
    {
      imagePath: district.districtHeroVisualImage,
      placeholderLabel: "Commercial Positioning Visual",
      variant: "commercial",
    },
    {
      imagePath: district.strategicDiagramImage,
      placeholderLabel: "Industry Direction Visual",
      variant: "industry",
    },
  ];

  return configs[index] ?? configs[0];
}

function SectionIntro({ subtitle, title }: { subtitle?: React.ReactNode; title: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold leading-tight text-[#1F2937]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">{subtitle}</p>
      ) : null}
    </div>
  );
}

function AbstractPlanningVisual({ density }: { density: "hero" | "transport" | "lifestyle" | "commercial" | "industry" }) {
  const isHero = density === "hero";
  const isTransport = density === "transport";
  const isLifestyle = density === "lifestyle";
  const isCommercial = density === "commercial";
  const isIndustry = density === "industry";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* TODO: Replace with original planning-style visual asset. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(245,200,76,0.36),transparent_26%),linear-gradient(135deg,#FFFDF8_0%,#F6E8C8_45%,#EAF3F4_100%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(184,138,24,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(184,138,24,0.18)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className={`${isHero ? "top-[50%] h-[32%]" : "top-[52%] h-[28%]"} absolute -left-[14%] w-[132%] -rotate-6 rounded-[999px] bg-[#9DC7D4]/35 blur-sm`} />
      <div className={`${isHero ? "top-[58%] h-[12%]" : "top-[60%] h-[10%]"} absolute -left-[10%] w-[124%] -rotate-6 rounded-[999px] border border-white/70`} />
      <div className="absolute left-[16%] top-[22%] h-2 w-2 rounded-full bg-[#B88A18]/60 shadow-[0_0_0_10px_rgba(245,200,76,0.12)]" />
      <div className="absolute right-[22%] top-[30%] h-2 w-2 rounded-full bg-[#B88A18]/55 shadow-[0_0_0_12px_rgba(245,200,76,0.10)]" />
      <div className="absolute bottom-[24%] left-[42%] h-2 w-2 rounded-full bg-[#B88A18]/50 shadow-[0_0_0_9px_rgba(245,200,76,0.10)]" />
      <div className="absolute left-[17%] top-[23%] h-px w-[56%] rotate-[8deg] bg-[#B88A18]/25" />
      <div className="absolute bottom-[25%] left-[43%] h-px w-[34%] -rotate-[20deg] border-t border-dashed border-[#B88A18]/35" />
      {isTransport ? (
        <>
          <div className="absolute left-[10%] top-[44%] h-px w-[84%] -rotate-3 border-t-2 border-dashed border-[#B88A18]/45" />
          <div className="absolute left-[18%] top-[43%] h-4 w-4 rounded-full border-2 border-[#B88A18] bg-white" />
          <div className="absolute left-[52%] top-[40%] h-4 w-4 rounded-full border-2 border-[#B88A18] bg-white" />
          <div className="absolute right-[16%] top-[37%] h-4 w-4 rounded-full border-2 border-[#B88A18] bg-white" />
          <div className="absolute bottom-[34%] left-[22%] h-12 w-32 rounded-full border border-[#B88A18]/30 bg-white/20" />
        </>
      ) : null}
      {isLifestyle ? (
        <>
          <div className="absolute bottom-[16%] right-[10%] h-20 w-20 rounded-full border border-[#B88A18]/25 bg-white/22" />
          <div className="absolute left-[12%] bottom-[14%] h-16 w-28 rounded-t-full bg-[#B8C7B1]/45" />
          <div className="absolute right-[34%] top-[18%] h-12 w-20 rounded-sm border border-white/70 bg-white/35" />
          <div className="absolute right-[37%] top-[24%] h-px w-14 bg-[#B88A18]/35" />
        </>
      ) : null}
      {isCommercial ? (
        <>
          <div className="absolute bottom-[20%] left-[16%] h-28 w-12 rounded-t-sm bg-[#1F2A37]/35" />
          <div className="absolute bottom-[20%] left-[32%] h-40 w-16 rounded-t-sm bg-[#1F2A37]/45" />
          <div className="absolute bottom-[20%] right-[28%] h-32 w-14 rounded-t-sm bg-[#1F2A37]/35" />
          <div className="absolute right-[18%] top-[18%] h-20 w-20 rounded-full border border-[#B88A18]/30 bg-white/20" />
        </>
      ) : null}
      {isIndustry ? (
        <>
          <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-[#B88A18]" />
          <div className="absolute left-[48%] top-[18%] h-3 w-3 rounded-full bg-[#B88A18]/80" />
          <div className="absolute right-[20%] top-[42%] h-3 w-3 rounded-full bg-[#B88A18]/70" />
          <div className="absolute bottom-[24%] left-[34%] h-3 w-3 rounded-full bg-[#B88A18]/60" />
          <div className="absolute left-[20%] top-[30%] h-px w-[28%] -rotate-12 bg-[#B88A18]/35" />
          <div className="absolute left-[49%] top-[20%] h-px w-[30%] rotate-[24deg] bg-[#B88A18]/35" />
          <div className="absolute left-[35%] bottom-[27%] h-px w-[42%] -rotate-[18deg] border-t border-dashed border-[#B88A18]/40" />
        </>
      ) : null}
    </div>
  );
}

function hasLocalImage(imagePath?: string) {
  if (!imagePath) {
    return false;
  }

  return existsSync(join(process.cwd(), "public", imagePath.replace(/^\//, "")));
}

function ResidencePreviewCard({ project }: { project: Project }) {
  const startingPrice = Math.min(...project.availableUnits.map((unit) => unit.priceUsd));

  return (
    <Link
      className="premium-card group overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#E7B93D]"
      href={`/properties/${project.slug}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F3E8]">
        <Image
          alt=""
          className="premium-image object-cover transition duration-700 group-hover:scale-[1.035]"
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={project.heroImage}
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
          <TD value={project.district} />
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-[#1F2937]">
          <TD value={project.projectName} />
        </h3>
        <div className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]"><T k="startingPrice" /></span>
            <span className="font-semibold text-[#1F2937]">{formatCurrencyFromUsd(startingPrice, "USD")}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#6B7280]"><T k="availableUnits" /></span>
            <span className="font-semibold text-[#1F2937]">{project.availableUnits.length}</span>
          </div>
        </div>
        <span className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937]">
          <T k="viewResidence" />
        </span>
      </div>
    </Link>
  );
}
