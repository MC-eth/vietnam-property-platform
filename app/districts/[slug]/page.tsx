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
                  href="#district-timeline"
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

        <DistrictDriversSection district={district} />

        <section className="px-5 py-12 sm:px-8 lg:py-16" id="district-timeline">
          <div className="mx-auto max-w-7xl">
            <SectionIntro title={<T k="keyTimeline" />} />
            <div className="mt-8 rounded-2xl border border-[#ECE7DA] bg-white p-6 shadow-sm">
              <DistrictTimeline items={district.timeline} />
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <SectionIntro
                title={
                  district.slug === "thu-thiem" ? (
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
                <T k="exploreResidences" />
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
  variant: "strategic" | "infrastructure" | "lifestyle" | "commercial";
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
      <ul className="mt-6 grid gap-3 text-sm font-medium leading-6 text-[#374151]">
        {feature.bullets.map((bullet) => (
          <li className="flex gap-3" key={bullet}>
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B88A18]" />
            <span>
              <TD value={bullet} />
            </span>
          </li>
        ))}
      </ul>
      {feature.statusNote ? (
        <p className="mt-5 border-t border-[#ECE7DA] pt-4 text-xs leading-5 text-[#8A7B58]">
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
    <div className="relative min-h-[260px] overflow-hidden bg-[#FFF8E8] lg:h-full lg:min-h-[390px]">
      {feature.imagePath && hasImage ? (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          src={feature.imagePath}
        />
      ) : (
        <>
          <AbstractPlanningVisual density={feature.variant === "commercial" ? "strategic" : feature.variant} />
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
      variant: "infrastructure",
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
      placeholderLabel: "Future Growth Visual",
      variant: "strategic",
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

function AbstractPlanningVisual({ density }: { density: "hero" | "strategic" | "infrastructure" | "lifestyle" }) {
  const isHero = density === "hero";

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
      {density === "infrastructure" ? (
        <div className="absolute left-[10%] top-[44%] h-px w-[84%] -rotate-3 border-t-2 border-dashed border-[#B88A18]/35" />
      ) : null}
      {density === "lifestyle" ? (
        <div className="absolute bottom-[16%] right-[10%] h-20 w-20 rounded-full border border-[#B88A18]/25 bg-white/22" />
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
