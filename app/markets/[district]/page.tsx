import Link from "next/link";
import { notFound } from "next/navigation";
import { DistrictInsightPanels } from "@/components/district-insight-panels";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { PageHeading } from "@/components/page-heading";
import { PropertyCard } from "@/components/property-card";
import {
  districtInsights,
  getDistrictInsightBySlug,
  getProjectDistrictForDistrictFilter,
} from "@/data/district-insights";
import { getProperties } from "@/services/propertyService";

type DistrictPageProps = {
  params: Promise<{ district: string }>;
};

export function generateStaticParams() {
  return districtInsights.flatMap((insight) => [
    { district: insight.slug },
    ...(insight.aliases ?? []).map((district) => ({ district })),
  ]);
}

export default async function DistrictMarketPage({ params }: DistrictPageProps) {
  const { district } = await params;
  const insight = getDistrictInsightBySlug(district);

  if (!insight) {
    notFound();
  }

  const propertyDistrict =
    getProjectDistrictForDistrictFilter(insight.ctaDistrictFilter) ?? insight.districtContext;
  const properties = (await getProperties()).filter(
    (property) => property.district === propertyDistrict,
  );

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={`${insight.city} district market`}
            title={`${insight.displayName} investment profile`}
            description="District-level market context for foreign buyers comparing yield, liquidity, tenant demand, infrastructure, and ownership fit."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <DistrictInsightPanels city={insight.city} district={propertyDistrict} />

            <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
                  <T k="matchedResidences" />
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
                  <T k="residencesMappedTo" /> <TD value={insight.displayName} />
                </h2>
              </div>
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href={`/properties?district=${encodeURIComponent(insight.ctaDistrictFilter)}`}
              >
                <T k="openInvestmentScreener" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
