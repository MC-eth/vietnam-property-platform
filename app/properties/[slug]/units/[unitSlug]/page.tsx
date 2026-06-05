import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreUnitSection } from "@/components/explore-unit-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Money } from "@/components/money";
import { RentalYieldCalculator } from "@/components/rental-yield-calculator";
import { UnitCompareWorkspace } from "@/components/unit-compare-workspace";
import { UnitWorkspaceActions } from "@/components/workspace-action-buttons";
import { T, TD } from "@/components/localized-text";
import { getProjects, getProjectBySlugFromService } from "@/services/projectService";
import type { Project, ProjectUnit } from "@/types/project";
import type { TranslationKey } from "@/constants/translations";

type UnitDetailPageProps = {
  params: Promise<{
    slug: string;
    unitSlug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.flatMap((project) =>
    project.availableUnits.map((unit) => ({
      slug: project.slug,
      unitSlug: unit.slug ?? unit.id,
    })),
  );
}

export default async function UnitDetailPage({ params }: UnitDetailPageProps) {
  const { slug, unitSlug } = await params;
  const project = await getProjectBySlugFromService(slug);

  if (!project) {
    notFound();
  }

  const unit = project.availableUnits.find((item) => (item.slug ?? item.id) === unitSlug);

  if (!unit) {
    notFound();
  }

  const projects = await getProjects();
  const images = getUnitImages(project, unit);
  const similarUnits = getSimilarUnits(project, unit, projects);

  return (
    <>
      <Header />
      <main className="bg-[#FFFDF8]">
        <section className="px-5 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Link className="text-sm font-semibold text-[#6B7280] transition hover:text-[#1F2937]" href={`/properties/${project.slug}`}>
              <T k="backToProjects" />
            </Link>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
                  <T k="unitDetails" />
                </p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#1F2937] sm:text-5xl">
                  <TD value={getUnitName(unit)} />
                </h1>
                <p className="mt-3 text-sm font-semibold text-[#6B7280]">
                  <TD value={project.projectName} /> · <TD value={project.district} /> · <TD value={project.city} />
                </p>
              </div>
            </div>
            <ExploreUnitSection images={images} project={project} unit={unit} />
            <div className="mt-4 lg:hidden">
              <UnitWorkspaceActions projectSlug={project.slug} unitId={unit.id} />
            </div>
            <UnitCompareWorkspace projects={projects} />
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8 lg:pb-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="space-y-6">
              <section className="border-b border-[#ECE7DA] pb-6">
                <p className="max-w-3xl text-lg leading-8 text-[#4B5563]">
                  <T k="unitIntroShort" />
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <UnitFact icon={<BedIcon />} label={<T k="bedrooms" />} value={`${unit.bedrooms}`} />
                  <UnitFact icon={<BathIcon />} label={<T k="bathrooms" />} value={`${unit.bathrooms}`} />
                  <UnitFact icon={<SizeIcon />} label={<T k="size" />} value={`${unit.sizeSqm} sqm`} />
                  <UnitFact icon={<FloorIcon />} label={<T k="floorLevel" />} value={<TD value={unit.floorLevel ?? unit.floorRange} />} />
                  <UnitFact icon={<ViewIcon />} label={<T k="viewType" />} value={<TD value={unit.viewType ?? unit.bestFor} />} />
                  <UnitFact icon={<CompassIcon />} label={<T k="orientation" />} value={<TD value={unit.orientation ?? "Subject to advisor review"} />} />
                  <UnitFact icon={<SofaIcon />} label={<T k="furnishingStatus" />} value={<TD value={unit.furnishingStatus} />} />
                </div>
              </section>

              <UnitHighlights />

              <TwoColumnNotes />

              <RentalYieldCalculator unit={unit} />

              {similarUnits.length > 0 ? (
                <section>
                  <h2 className="text-2xl font-semibold text-[#1F2937]">
                    <T k="similarUnits" />
                  </h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {similarUnits.map(({ project: similarProject, unit: similarUnit }) => (
                      <SimilarUnitCard key={`${similarProject.slug}-${similarUnit.id}`} project={similarProject} unit={similarUnit} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <UnitSummaryPanel project={project} unit={unit} />
          </div>
        </section>
      </main>
      <MobileCta project={project} unit={unit} />
      <Footer />
    </>
  );
}

function UnitSummaryPanel({ project, unit }: { project: Project; unit: ProjectUnit }) {
  return (
    <aside className="hidden rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-[0_18px_50px_rgba(31,41,55,0.07)] lg:sticky lg:top-24 lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A9851D]">
        <T k="unitDetails" />
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        <TD value={getUnitName(unit)} />
      </h2>
      <p className="mt-2 text-sm text-[#6B7280]">
        <TD value={project.projectName} /> · <TD value={project.district} /> · <TD value={project.city} />
      </p>

      <div className="mt-6 space-y-4 border-y border-[#ECE7DA] py-5">
        <SummaryRow label={<T k="startingPrice" />} value={<Money usd={unit.priceUsd} />} strong />
        <SummaryRow label={<T k="estimatedMonthlyRent" />} value={<><Money usd={unit.estimatedMonthlyRentUsd} />/<T k="perMonth" /></>} />
        <SummaryRow label={<T k="estimatedGrossYield" />} value={unit.estimatedGrossYield} />
        <SummaryRow label={<T k="availability" />} value={<TD value={unit.availabilityStatus} />} />
      </div>

      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] text-center">
        <CompactFact value={unit.bedrooms} label={<T k="beds" />} />
        <CompactFact value={unit.bathrooms} label={<T k="baths" />} />
        <CompactFact value={unit.sizeSqm} label="sqm" />
      </div>
      <UnitWorkspaceActions projectSlug={project.slug} unitId={unit.id} />

      <Link
        className="premium-focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
        href={`/enquiry?project=${project.slug}&unit=${unit.id}`}
      >
        <T k="enquireAboutThisUnit" />
      </Link>
      <Link
        className="premium-focus-ring mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-[#D8CDAF] bg-white px-5 text-sm font-semibold text-[#1F2937] hover:border-[#E7B93D] hover:bg-[#FFF8E8]"
        href={`/enquiry?project=${project.slug}&unit=${unit.id}`}
      >
        <T k="bookInvestorConsultation" />
      </Link>
      <p className="mt-4 text-xs leading-5 text-[#6B7280]">
        <T k="unitReservationTrustNote" />
      </p>
    </aside>
  );
}

function CompactFact({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="border-r border-[#ECE7DA] px-3 py-3 last:border-r-0">
      <p className="text-base font-semibold text-[#1F2937]">{value}</p>
      <p className="mt-1 text-xs text-[#6B7280]">{label}</p>
    </div>
  );
}

function UnitFact({ icon, label, value }: { icon: React.ReactNode; label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-white p-3.5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8E8] text-[#A9851D] ring-1 ring-[#F5C84C]/35">
        {icon}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
      <p className="mt-2 text-base font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function UnitHighlights() {
  const highlights = ["riverFacingLayout", "efficientTwoBedroomFlow", "strongLongStayAppeal"] satisfies TranslationKey[];

  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#1F2937]">
        <T k="unitHighlights" />
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {highlights.map((highlight) => (
          <div className="premium-card rounded-sm border border-[#ECE7DA] bg-white p-4 shadow-sm" key={highlight}>
            <p className="text-sm font-semibold leading-6 text-[#1F2937]">
              <T k={highlight} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TwoColumnNotes() {
  const notes = [
    {
      title: "rentalStrategy",
      copy: "typicalTenantProfileCopy",
    },
    {
      title: "foreignBuyerNotes",
      copy: "overseasBuyerUnitCopy",
    },
  ] satisfies { title: TranslationKey; copy: TranslationKey }[];

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <article className="premium-card rounded-sm border border-[#ECE7DA] bg-white p-4 shadow-sm" key={note.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A9851D]">
              <T k={note.title} />
            </p>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              <T k={note.copy} />
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#6B7280]">
        <T k="optionalFurnishingRemoteSetup" />
      </p>
    </section>
  );
}

function SimilarUnitCard({ project, unit }: { project: Project; unit: ProjectUnit }) {
  return (
    <article className="premium-card rounded-sm border border-[#ECE7DA] bg-white p-4 shadow-sm">
      <Link
        className="group grid gap-4 sm:grid-cols-[140px_1fr]"
        href={`/properties/${project.slug}/units/${unit.slug ?? unit.id}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ECE7DA]">
          <Image alt={getUnitName(unit)} className="premium-image object-cover" fill sizes="180px" src={unit.heroImage ?? unit.unitImage} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
            <TD value={project.projectName} />
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#1F2937]">
            <TD value={getUnitName(unit)} />
          </h3>
          <p className="mt-2 text-sm font-semibold text-[#1F2937]">
            <Money usd={unit.priceUsd} />
          </p>
          <p className="mt-1 text-sm text-[#6B7280]">
            {unit.bedrooms} <T k="beds" /> · {unit.sizeSqm} sqm · {unit.estimatedGrossYield}
          </p>
        </div>
      </Link>
      <div className="mt-4 border-t border-[#ECE7DA] pt-4">
        <UnitWorkspaceActions compact projectSlug={project.slug} unitId={unit.id} />
      </div>
    </article>
  );
}

function SummaryRow({ label, value, strong = false }: { label: React.ReactNode; value: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span className={`text-right font-semibold ${strong ? "text-xl text-[#1F2937]" : "text-[#1F2937]"}`}>{value}</span>
    </div>
  );
}

function MobileCta({ project, unit }: { project: Project; unit: ProjectUnit }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ECE7DA] bg-white/95 px-4 py-3 shadow-[0_-12px_30px_rgba(31,41,55,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1F2937]">
            <Money usd={unit.priceUsd} />
          </p>
          <p className="truncate text-xs text-[#6B7280]">
            <T k="estimatedGrossYield" /> {unit.estimatedGrossYield}
          </p>
        </div>
        <Link
          className="premium-focus-ring inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937]"
          href={`/enquiry?project=${project.slug}&unit=${unit.id}`}
        >
          <T k="enquire" />
        </Link>
      </div>
    </div>
  );
}

function getUnitImages(project: Project, unit: ProjectUnit) {
  const images = unit.unitImages?.length ? unit.unitImages : [unit.heroImage ?? unit.unitImage, ...project.galleryImages];

  return Array.from(new Set(images.filter(Boolean))).slice(0, 5);
}

function getUnitName(unit: ProjectUnit) {
  return unit.unitName ?? unit.unitType;
}

function getSimilarUnits(currentProject: Project, currentUnit: ProjectUnit, projects: Project[]) {
  const sameProjectUnits = currentProject.availableUnits
    .filter((unit) => unit.id !== currentUnit.id)
    .map((unit) => ({ project: currentProject, unit }));
  const otherUnits = projects
    .filter((project) => project.slug !== currentProject.slug)
    .flatMap((project) => project.availableUnits.map((unit) => ({ project, unit })));

  return [...sameProjectUnits, ...otherUnits].slice(0, 3);
}

function BedIcon() {
  return <IconPath path="M3 11V6.5A2.5 2.5 0 0 1 5.5 4h3A2.5 2.5 0 0 1 11 6.5V11M13 11V7h5a3 3 0 0 1 3 3v1M3 20v-7h18v7M3 16h18" />;
}

function BathIcon() {
  return <IconPath path="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM6 11V6.5A2.5 2.5 0 0 1 8.5 4H10M8 21v-2M16 21v-2M9 6h3" />;
}

function SizeIcon() {
  return <IconPath path="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5M3 3l6 6M21 3l-6 6M3 21l6-6M21 21l-6-6" />;
}

function FloorIcon() {
  return <IconPath path="M5 20h14M7 20V6h10v14M10 9h1M13 9h1M10 13h1M13 13h1" />;
}

function ViewIcon() {
  return <IconPath path="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Zm9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />;
}

function CompassIcon() {
  return <IconPath path="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12-2 5-4 1 2-5 4-1Z" />;
}

function SofaIcon() {
  return <IconPath path="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 12h16v6H4v-6Zm2 6v2m12-2v2" />;
}

function IconPath({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
