import Link from "next/link";
import { notFound } from "next/navigation";
import { AvailableUnitCard } from "@/components/available-unit-card";
import { DistrictPriceChart } from "@/components/district-price-chart";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectGalleryHero } from "@/components/project-gallery-hero";
import { ProjectWorkspaceActions } from "@/components/workspace-action-buttons";
import { UnitCompareWorkspace } from "@/components/unit-compare-workspace";
import { ZoomableMap } from "@/components/zoomable-map";
import { LocalizedField, T, TD } from "@/components/localized-text";
import { getDistrictPriceHistory } from "@/data/district-price-history";
import { getProjectBySlugFromService, getProjects } from "@/services/projectService";
import type {
  Project,
  ProjectInvestmentCaseItem,
  ProjectRiskConsideration,
} from "@/types/project";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlugFromService(slug);

  if (!project) {
    notFound();
  }

  const projects = await getProjects();
  const districtSlug = getProjectDistrictSlug(project.district);
  const districtPriceHistory = getDistrictPriceHistory(districtSlug);

  return (
    <>
      <Header />
      <main>
        {/* 1. Hero */}
        <ProjectGalleryHero project={project} />

        <section className="px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <Link className="text-sm font-semibold text-[#6B7280] transition hover:text-[#1F2937]" href="/properties">
              <T k="backToProjects" />
            </Link>
            <ProjectWorkspaceActions compact projectId={project.id} />
          </div>
        </section>

        {/* 2. Available Units */}
        <section className="bg-[#FFFDF8] px-5 py-16 sm:px-8 lg:py-24" id="available-units">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 border-b border-[#ECE7DA] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9851D]">
                  <T k="availableUnits" />
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
                  <T k="availableResidencesForReview" />
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#6B7280]">
                <T k="availableUnitsListedNote" />
              </p>
            </div>
            {project.availableUnits.length > 0 ? (
              <>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {project.availableUnits.map((unit) => (
                    <AvailableUnitCard key={unit.id} project={project} unit={unit} />
                  ))}
                </div>
                <UnitCompareWorkspace projects={projects} />
              </>
            ) : (
              <div className="mt-8 rounded-sm border border-[#ECE7DA] bg-white px-6 py-12 text-center shadow-sm">
                <p className="mx-auto max-w-xl text-base leading-7 text-[#4B5563]">
                  <T k="availableUnitsEmptyState" />
                </p>
                <Link
                  className="premium-focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
                  href={`/enquiry?project=${project.slug}`}
                >
                  <T k="bookInvestorConsultation" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 3. Location & Connectivity */}
        <section className="px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
                <T k="locationConnectivity" />
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <ProjectLocationMap project={project} />
              <NearbyConnectivity highlights={project.locationHighlights} />
            </div>
          </div>
        </section>

        {/* 4. District Price Trend */}
        {districtPriceHistory ? (
          <section className="px-5 pb-16 sm:px-8 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 max-w-3xl">
                <h2 className="text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">
                  <T k="districtPriceTrend" />
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                  <T k="districtPriceTrendContext" />
                </p>
              </div>
              <DistrictPriceChart history={districtPriceHistory.priceHistory} />
              <p className="mt-4 max-w-3xl text-xs leading-5 text-[#6B7280]">
                <T k="districtPriceTrendDisclaimer" />
              </p>
            </div>
          </section>
        ) : null}

        {/* 5. Investment Case */}
        <section className="px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <InvestmentCaseSection items={project.investmentCase} />
          </div>
        </section>

        {/* 6. Risks & Considerations (final substantive section) */}
        <section className="px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <RisksConsiderationsSection items={project.riskConsiderations} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionIntro({
  eyebrow,
  title,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9851D]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl">{title}</h2>
    </div>
  );
}

function InvestmentCaseSection({ items }: { items: ProjectInvestmentCaseItem[] }) {
  return (
    <section>
      <SectionIntro
        eyebrow={<T k="investmentCaseEyebrow" />}
        title={<T k="whyConsiderThisResidence" />}
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article className="border-t border-[#E7C66B]/70 pt-5" key={item.title}>
            {item.icon ? (
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8E8] text-[#A9851D] ring-1 ring-[#F5C84C]/35">
                <DetailIcon name={item.icon} />
              </span>
            ) : null}
            <h3 className="text-xl font-semibold leading-snug text-[#1F2937]">
              <LocalizedField en={item.title} zh={item.titleZh} />
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">
              <LocalizedField en={item.description} zh={item.descriptionZh} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RisksConsiderationsSection({ items }: { items: ProjectRiskConsideration[] }) {
  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-[#FBF8F0] p-6 shadow-sm sm:p-8">
      <SectionIntro
        eyebrow={<T k="dueDiligenceEyebrow" />}
        title={<T k="risksAndConsiderations" />}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            className="rounded-sm border border-[#ECE7DA] bg-white/70 p-5"
            key={item.title}
          >
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8E8] text-[#A9851D] ring-1 ring-[#F5C84C]/35">
              <DetailIcon name={item.icon ?? "default"} />
            </span>
            <h3 className="text-lg font-semibold leading-snug text-[#1F2937]">
              <LocalizedField en={item.title} zh={item.titleZh} />
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              <LocalizedField en={item.description} zh={item.descriptionZh} />
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 border-t border-[#ECE7DA] pt-5 text-xs leading-5 text-[#6B7280]">
        <T k="risksGuidanceNote" />
      </p>
    </section>
  );
}

function NearbyConnectivity({ highlights }: { highlights: string[] }) {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
        <T k="locationNearby" />
      </p>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#4B5563]">
        {highlights.map((highlight) => (
          <li className="flex gap-3" key={highlight}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E7B93D]" />
            <span>
              <TD value={highlight} />
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ProjectLocationMap({ project }: { project: Project }) {
  const mapImage = project.slug === "empire-city" ? "/mock-images/projects/empire-city-location-map.png" : null;

  return (
    <article className="overflow-hidden rounded-sm border border-[#ECE7DA]/80 bg-white shadow-[0_18px_50px_rgba(31,41,55,0.06)]">
      {/* Future integration: replace mock map panel with Google Maps / Mapbox using project coordinates. */}
      <div className="relative overflow-hidden bg-[#FFF8E8]">
        {mapImage ? (
          <ZoomableMap
            alt="Illustrative Empire City location map"
            src={mapImage}
          />
        ) : (
          <div className="relative min-h-[240px] p-5">
        <div className="absolute inset-0 opacity-55">
          <div className="absolute left-[-12%] top-[38%] h-16 w-[130%] rotate-[-9deg] border-y border-[#D8CDAF]" />
          <div className="absolute left-[18%] top-[-12%] h-[130%] w-14 rotate-[18deg] border-x border-[#D8CDAF]" />
          <div className="absolute left-[58%] top-[-18%] h-[140%] w-20 rotate-[-24deg] border-x border-[#E7B93D]/45" />
          <div className="absolute bottom-[18%] left-[-10%] h-10 w-[120%] rotate-[4deg] border-y border-[#D8CDAF]/80" />
        </div>

        <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-[#1F2937]">
              <TD value={project.projectName} />
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#6B7280]">
              <TD value={project.district} /> · <TD value={project.city} />
            </p>
          </div>

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5C84C] text-[#1F2937] shadow-lg shadow-[#1F2937]/15">
              <span className="h-3 w-3 rounded-full bg-[#1F2937]" />
            </span>
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1F2937] shadow-sm">
              <TD value={project.district} />
            </span>
          </div>
        </div>
          </div>
        )}
      </div>
      <div className="border-t border-[#ECE7DA] bg-[#FFFDF8] px-4 py-4 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
          <T k="amenities" />
        </p>
        <AmenityChips amenities={project.amenities} />
      </div>
    </article>
  );
}

function AmenityChips({ amenities }: { amenities: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2.5">
      {amenities.map((amenity) => (
        <span
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#ECE7DA] bg-white px-3 py-1.5 text-sm font-semibold text-[#4B5563]"
          key={amenity}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF8E8] text-[#A9851D] ring-1 ring-[#F5C84C]/35">
            <AmenityIcon amenity={amenity} />
          </span>
          <TD value={amenity} />
        </span>
      ))}
    </div>
  );
}

function AmenityIcon({ amenity }: { amenity: string }) {
  const lowerAmenity = amenity.toLowerCase();

  if (lowerAmenity.includes("pool") || lowerAmenity.includes("river") || lowerAmenity.includes("lake")) {
    return <IconWaves />;
  }

  if (lowerAmenity.includes("gym")) {
    return <IconDumbbell />;
  }

  if (lowerAmenity.includes("lobby")) {
    return <IconBuilding />;
  }

  if (lowerAmenity.includes("retail")) {
    return <IconShoppingBag />;
  }

  if (lowerAmenity.includes("security")) {
    return <IconShield />;
  }

  if (lowerAmenity.includes("parking")) {
    return <IconCar className="h-4 w-4" />;
  }

  if (lowerAmenity.includes("co-working")) {
    return <IconBriefcase className="h-4 w-4" />;
  }

  if (lowerAmenity.includes("park")) {
    return <IconTrees />;
  }

  return <IconSparkle className="h-4 w-4" />;
}

function DetailIcon({ name }: { name: string }) {
  switch (name) {
    case "river":
    case "lake":
    case "liquidity":
      return <IconWaves />;
    case "infrastructure":
    case "business":
    case "handover":
      return <IconBuilding />;
    case "supply":
    case "amenities":
      return <IconShoppingBag />;
    case "developer":
    case "quota":
      return <IconShield />;
    case "tenant":
    case "rental":
    case "remote":
    case "lifestyle":
    case "diplomatic":
      return <IconUsers />;
    case "pricing":
    case "payment":
      return <IconTag />;
    case "legal":
      return <IconDoc />;
    case "management":
      return <IconBriefcase className="h-4 w-4" />;
    case "location":
      return <IconPin />;
    default:
      return <IconSparkle className="h-4 w-4" />;
  }
}

function IconCar({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5 16h14M7 16v2m10-2v2M6.5 12.5l1.6-4h7.8l1.6 4M5 13.5c0-.6.4-1 1-1h12c.6 0 1 .4 1 1V16H5v-2.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconWaves({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4 9c2 0 2-1.5 4-1.5S10 9 12 9s2-1.5 4-1.5S18 9 20 9M4 14c2 0 2-1.5 4-1.5S10 14 12 14s2-1.5 4-1.5S18 14 20 14M4 19c2 0 2-1.5 4-1.5S10 19 12 19s2-1.5 4-1.5S18 19 20 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconDumbbell({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5 9v6m3-8v10m8-10v10m3-8v6M8 12h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconBuilding({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4 20h16M6 20V9h5v11m2 0V5h5v15M8 12h1m6-3h1M8 15h1m6-2h1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconShoppingBag({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 9h10l1 11H6L7 9Zm3 0V7a2 2 0 0 1 4 0v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconShield({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s7-3.5 7-10V6l-7-3-7 3v5c0 6.5 7 10 7 10Zm-3-10 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconBriefcase({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-9 0h12v11H6V7Zm0 5h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconTrees({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M8 19v-4m8 4v-5M5 15l3-8 3 8H5Zm8-1 3-9 3 9h-6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconUsers({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M16 19v-1.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3V19M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6.5 0a2.5 2.5 0 1 0-1.7-4.3M20 19v-1.5a3 3 0 0 0-2-2.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function IconTag({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M4 12.5V5a1 1 0 0 1 1-1h7.5a2 2 0 0 1 1.4.6l5.5 5.5a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L4.6 13.9A2 2 0 0 1 4 12.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="8.5" cy="8.5" fill="currentColor" r="1.1" />
    </svg>
  );
}

function IconDoc({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 0v5h5M9 13h6M9 16h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconSparkle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function getProjectDistrictSlug(district: string) {
  const knownSlugs: Record<string, string> = {
    "Ben Nghe": "district-1",
    "Cau Giay": "cau-giay",
    "Nam Tu Liem": "nam-tu-liem",
    "Phu My Hung": "district-7",
    "Tay Ho": "tay-ho",
    "Thao Dien": "thao-dien-district-2",
    "Thu Duc": "thu-duc",
    "Thu Thiem": "thu-thiem",
  };

  return knownSlugs[district] ?? district.toLowerCase().replaceAll(" ", "-");
}
