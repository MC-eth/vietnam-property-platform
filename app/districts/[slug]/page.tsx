import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { PropertyCard } from "@/components/property-card";
import { districtMarkets, getDistrictMarketBySlug } from "@/data/districts";
import { getProperties } from "@/services/propertyService";

type DistrictMarketPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return districtMarkets.map((district) => ({ slug: district.slug }));
}

export default async function DistrictMarketPage({ params }: DistrictMarketPageProps) {
  const { slug } = await params;
  const district = getDistrictMarketBySlug(slug);

  if (!district) {
    notFound();
  }

  const recommendedProperties = (await getProperties()).filter((property) =>
    district.relatedPropertyDistricts.includes(property.district),
  );

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <Link className="text-sm font-semibold text-[#1F2937]" href="/districts">
                <T k="districtInsights" />
              </Link>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B93D]">
                <TD value={district.city} /> <TD value="market brief" />
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl">
                <TD value={district.name} />
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B7280]">
                <TD value={district.positioning} />
              </p>
            </div>
            <div className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
                <T k="bestFor" />
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {district.bestFor.map((item) => (
                  <span
                    className="rounded-sm border border-[#F5C84C]/60 bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]"
                    key={item}
                  >
                    <TD value={item} />
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[#6B7280]">
                <TD value="Indicative district positioning only. Project-level ownership, quota, payment terms, and legal documents remain subject to due diligence." />
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={<TD value="Market snapshot" />}
              title={<TD value="Selected project range and investment signals." />}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SnapshotCard label={<TD value="Average gross yield range" />} value={district.snapshot.averageGrossYieldRange} />
              <SnapshotCard label={<T k="rentalDemand" />} value={<TD value={district.snapshot.rentalDemand} />} />
              <SnapshotCard label={<T k="liquidity" />} value={<TD value={district.snapshot.liquidity} />} />
              <SnapshotCard label={<T k="foreignBuyerPopularity" />} value={<TD value={district.snapshot.foreignBuyerPopularity} />} />
              <SnapshotCard label={<T k="infrastructureOutlook" />} value={<TD value={district.snapshot.infrastructureOutlook} />} />
              <SnapshotCard
                label={<T k="riskLevel" />}
                tone={district.snapshot.riskLevel === "Medium-high" ? "risk" : undefined}
                value={<TD value={district.snapshot.riskLevel} />}
              />
            </div>
          </div>
        </section>

        <section className="bg-[#FFFDF8] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
              <SectionIntro
                eyebrow={<TD value="Investment thesis" />}
                title={<><TD value="Why investors may consider" /> <TD value={district.name} />.</>}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ThesisItem label={<TD value="Tenant demand" />} value={<TD value={district.investmentThesis.tenantDemand} />} />
                <ThesisItem
                  label={<TD value="Expat and business demand" />}
                  value={<TD value={district.investmentThesis.expatBusinessDemand} />}
                />
                <ThesisItem label={<TD value="Infrastructure" />} value={<TD value={district.investmentThesis.infrastructure} />} />
                <ThesisItem
                  label={<TD value="Developer activity" />}
                  value={<TD value={district.investmentThesis.developerActivity} />}
                />
                <ThesisItem label={<TD value="Resale liquidity" />} value={<TD value={district.investmentThesis.resaleLiquidity} />} />
                <ThesisItem
                  label={<TD value="Foreign buyer suitability" />}
                  value={<TD value={district.investmentThesis.foreignBuyerSuitability} />}
                />
              </div>
            </article>

            <div className="grid gap-5">
              <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1F2937]"><TD value="Buyer fit" /></h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {district.buyerFit.map((fit) => (
                    <span
                      className="rounded-sm bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]"
                      key={fit}
                    >
                      <TD value={fit} />
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1F2937]"><TD value="Risks & watchpoints" /></h2>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#6B7280]">
                  {district.risks.map((risk) => (
                    <li className="flex gap-3" key={risk}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E7B93D]" />
                      <span><TD value={risk} /></span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <SectionIntro
                eyebrow={<TD value="Recommended properties" />}
                title={<><TD value="Current mock opportunities mapped to" /> <TD value={district.name} />.</>}
              />
              <Link
                className="inline-flex min-h-11 w-fit items-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href={`/properties?city=${encodeURIComponent(district.city)}`}
              >
                <T k="browseInvestmentCases" />
              </Link>
            </div>

            {recommendedProperties.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {recommendedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-sm border border-[#ECE7DA] bg-white p-6 text-sm leading-7 text-[#6B7280] shadow-sm">
                <TD value="No local mock properties are currently mapped to this district. Future backend data can connect live inventory, agent availability, and CRM qualification status here." />
              </div>
            )}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                href={`/properties?city=${encodeURIComponent(district.city)}`}
              >
                <T k="browseInvestmentCases" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
                href="/enquiry"
              >
                <T k="bookInvestorConsultation" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#FFFDF8]"
                href={`/enquiry?district=${district.slug}`}
              >
                <T k="bookInvestorConsultation" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: React.ReactNode; title: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#1F2937] sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function SnapshotCard({
  label,
  value,
  tone,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "risk";
}) {
  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
        {label}
      </p>
      <p className={`mt-4 text-xl font-semibold leading-7 ${tone === "risk" ? "text-[#9b2f24]" : "text-[#1F2937]"}`}>
        {value}
      </p>
    </article>
  );
}

function ThesisItem({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4">
      <h3 className="text-sm font-semibold text-[#1F2937]">{label}</h3>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">{value}</p>
    </div>
  );
}
