import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { getDistrictInsightBySlug } from "@/data/district-insights";
import { districtMarkets } from "@/data/districts";
import type { DistrictMarket } from "@/types/district";
import type { City } from "@/types/property";

const cities: City[] = ["Ho Chi Minh City", "Hanoi"];

export default function DistrictsPage() {
  const comparisonDistricts = districtMarkets.slice(0, 8);

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#FFFDF8] px-5 py-16 sm:px-8 lg:py-24">
          <div className="absolute inset-0 opacity-60">
            <Image
              alt=""
              className="hero-ken-burns object-cover"
              fill
              priority
              src="/mock-images/heroes/hcmc-sky-view.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/92 to-[#FFFDF8]/40" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B88A18]">
                <T k="investmentDistricts" />
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
                <T k="districtsHeroTitle" />
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#4B5563]">
                <T k="districtsHeroSubtitle" />
              </p>
            </div>
            <div className="premium-card hidden overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm lg:block">
              <div className="relative aspect-[16/10]">
                <Image
                  alt=""
                  className="premium-image object-cover"
                  fill
                  src="/mock-images/projects/thu-thiem-river-residence.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-16">
            {cities.map((city) => (
              <div key={city}>
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B88A18]">
                      <TD value={city} />
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-[#1F2937]">
                      <TD value="Residential investment districts" />
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-7 text-[#6B7280]">
                    <TD value="Indicative market notes for demonstration only. Recent projects are selected examples and subject to verification before public launch." />
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {districtMarkets
                    .filter((district) => district.city === city)
                    .map((district) => (
                      <DistrictCard district={district} key={district.slug} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B88A18]">
                  <T k="compareDistricts" />
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#1F2937]">
                  <TD value="Quick context before choosing a project." />
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#6B7280]">
                <TD value="A quick view of where each area fits in an overseas buyer mandate." />
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparisonDistricts.map((district) => (
                <Link
                  className="premium-card rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#F5C84C]"
                  href={`/districts/${getDistrictInsightHref(district.slug)}`}
                  key={district.slug}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B88A18]">
                    <TD value={district.positioningTag} />
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#1F2937]">
                    <TD value={district.displayName ?? district.name} />
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <CompactMetric label={<T k="rentalDemand" />} value={<TD value={district.snapshot.rentalDemand} />} />
                    <CompactMetric label={<T k="liquidity" />} value={<TD value={district.snapshot.liquidity} />} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#1F2937]">
                    <TD value={district.bestMatchedBuyer} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DistrictCard({ district }: { district: DistrictMarket }) {
  const districtInsight = getDistrictInsightBySlug(getDistrictInsightHref(district.slug));

  return (
    <Link
      className="premium-card group overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm"
      href={`/districts/${getDistrictInsightHref(district.slug)}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F3E8]">
        <Image
          alt=""
          className="premium-image object-cover transition duration-700 group-hover:scale-[1.035]"
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={district.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/65 via-[#1F2937]/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <TD value={district.city} />
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
            <TD value={district.displayName ?? district.name} />
          </h3>
        </div>
      </div>

      <div className="p-5">
        {districtInsight ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#B88A18]">
            <TD value={districtInsight.urbanZoneDisplayName} />
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#F5C84C]/70 bg-[#FFF8DF] px-3 py-1.5 text-xs font-semibold text-[#1F2937]">
            <TD value={district.positioningTag} />
          </span>
          {district.slug === "district-1" ? (
            <span className="rounded-full border border-[#ECE7DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B7280]">
              <TD value="CBD benchmark" />
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {district.bestFor.slice(0, 2).map((item) => (
            <span className="rounded-full border border-[#ECE7DA] bg-[#FFFDF8] px-3 py-1.5 text-xs font-semibold text-[#1F2937]" key={item}>
              <TD value={item} />
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm leading-6 text-[#4B5563]">
          <TD value={districtInsight?.shortPositioning ?? district.positioning} />
        </p>

        <div className="mt-5 grid gap-3 text-sm">
          <SnapshotRow label={<T k="rentalDemand" />} value={<TD value={district.snapshot.rentalDemand} />} />
          <SnapshotRow
            label={<T k="selectedResidences" />}
            value={`${districtInsight?.selectedResidenceSlugs.length ?? district.relatedPropertyDistricts.length}`}
          />
        </div>

        <p className="mt-5 border-t border-[#ECE7DA] pt-4 text-sm leading-6 text-[#1F2937]">
          <span className="font-semibold text-[#6B7280]"><T k="recentProjects" />: </span>
          <TD value={district.recentProjects.slice(0, 3).join(" · ")} />
        </p>

        <span className="mt-5 inline-flex min-h-10 items-center justify-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition group-hover:bg-[#E7B93D]">
          <T k="viewDistrictInsights" />
        </span>
      </div>
    </Link>
  );
}

function getDistrictInsightHref(slug: string) {
  const insightSlugs: Record<string, string> = {
    "binh-thanh-district": "binh-thanh",
    "binh-chanh": "binh-chanh",
    "can-gio": "can-gio",
    "cu-chi-hoc-mon": "cu-chi-hoc-mon",
    "district-1": "district-1-cbd",
    "district-9-thu-duc-growth-corridor": "thu-duc-district-9",
    "thao-dien-district-2": "thao-dien",
    "nha-be": "nha-be",
    "thu-duc-city": "thu-duc-district-9",
    "thu-thiem-district-2": "thu-thiem",
  };

  return insightSlugs[slug] ?? slug;
}

function SnapshotRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#ECE7DA] pt-3">
      <span className="text-[#6B7280]">{label}</span>
      <span className="text-right font-semibold text-[#1F2937]">{value}</span>
    </div>
  );
}

function CompactMetric({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-white px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{label}</p>
      <p className="mt-1 font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}
