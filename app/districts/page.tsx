import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { PageHeading } from "@/components/page-heading";
import { districtMarkets } from "@/data/districts";
import { getProperties } from "@/services/propertyService";
import type { City } from "@/types/property";

const cities: City[] = ["Ho Chi Minh City", "Hanoi"];

export default async function DistrictsPage() {
  const properties = await getProperties();

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={<T k="districtInsights" />}
            title={<TD value="Vietnam district market briefs for foreign investors." />}
            description={<TD value="Compare selected HCMC and Hanoi districts by indicative yield, tenant demand, liquidity, foreign buyer fit, infrastructure outlook, and key watchpoints." />}
          />
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-12">
            {cities.map((city) => (
              <div key={city}>
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
                      <TD value={city} />
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-[#1F2937]">
                      <TD value="District market snapshots" />
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-[#6B7280]">
                    <TD value="Illustrative market data only. Figures are selected project ranges and should be reviewed with advisor and local due diligence." />
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {districtMarkets
                    .filter((district) => district.city === city)
                    .map((district) => {
                      const matchedCount = properties.filter((property) =>
                        district.relatedPropertyDistricts.includes(property.district),
                      ).length;

                      return (
                        <Link
                          className="group rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#F5C84C] hover:shadow-xl"
                          href={`/districts/${district.slug}`}
                          key={district.slug}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E7B93D]">
                            <TD value={district.city} />
                          </p>
                          <h3 className="mt-3 text-xl font-semibold leading-tight text-[#1F2937]">
                            <TD value={district.name} />
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                            <TD value={district.positioning} />
                          </p>
                          <div className="mt-5 grid gap-3 text-sm">
                            <SnapshotRow
                              label={<TD value="Yield range" />}
                              value={district.snapshot.averageGrossYieldRange}
                            />
                            <SnapshotRow
                              label={<T k="rentalDemand" />}
                              value={<TD value={district.snapshot.rentalDemand} />}
                            />
                            <SnapshotRow
                              label={<TD value="Matched assets" />}
                              value={`${matchedCount}`}
                            />
                          </div>
                          <span className="mt-6 inline-flex text-sm font-semibold text-[#1F2937]">
                            <T k="viewMarketInsights" />
                          </span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SnapshotRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#ECE7DA] pt-3">
      <span className="text-[#6B7280]">{label}</span>
      <span className="text-right font-semibold text-[#1F2937]">{value}</span>
    </div>
  );
}
