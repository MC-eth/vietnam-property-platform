import Link from "next/link";
import { notFound } from "next/navigation";
import { DistrictInsightPanels } from "@/components/district-insight-panels";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";
import { PropertyCard } from "@/components/property-card";
import { districtInsights } from "@/data/district-insights";
import { getProperties } from "@/services/propertyService";

type DistrictPageProps = {
  params: Promise<{ district: string }>;
};

export function generateStaticParams() {
  return districtInsights.map((insight) => ({ district: insight.id }));
}

export default async function DistrictMarketPage({ params }: DistrictPageProps) {
  const { district } = await params;
  const insight = districtInsights.find((item) => item.id === district);

  if (!insight) {
    notFound();
  }

  const properties = (await getProperties()).filter(
    (property) => property.district === insight.district,
  );

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={`${insight.city} district market`}
            title={`${insight.district} investment profile`}
            description="District-level market context for foreign buyers comparing yield, liquidity, tenant demand, infrastructure, and ownership fit."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <DistrictInsightPanels city={insight.city} district={insight.district} />

            <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
                  Matched properties
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
                  Properties currently mapped to {insight.district}
                </h2>
              </div>
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#123c2b] px-5 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
                href={`/properties?city=${encodeURIComponent(insight.city)}`}
              >
                Open investment screener
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

