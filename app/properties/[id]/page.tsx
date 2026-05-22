import Link from "next/link";
import { notFound } from "next/navigation";
import { DealProgressTracker } from "@/components/deal-progress-tracker";
import { DistrictInsightPanels } from "@/components/district-insight-panels";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestmentMetric } from "@/components/investment-metric";
import { InvestmentScoreBadge } from "@/components/investment-score-badge";
import { Money } from "@/components/money";
import { RoiCalculator } from "@/components/roi-calculator";
import { T, TD } from "@/components/localized-text";
import { VerifiedProjectBadge } from "@/components/verified-project-badge";
import { activeBuyerDeal } from "@/data/deals";
import { getProperties, getPropertyById } from "@/services/propertyService";

type PropertyDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const properties = await getProperties();

  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-10 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <Link className="text-sm font-semibold text-[#1F2937]" href="/properties">
              <T k="backToProperties" />
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <VerifiedProjectBadge
                  checks={property.verifiedProject.checks}
                  level={property.verifiedProject.level}
                  showChecks
                  summary={property.verifiedProject.summary}
                />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E7B93D]">
                  <TD value={property.city} /> · <TD value={property.district} />
                </p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl">
                  {property.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B7280]">
                  <TD value={property.overview} />
                </p>
              </div>
              <div className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm">
                <InvestmentScoreBadge score={property.investmentScore} />
                <p className="mt-5 text-sm text-[#6B7280]"><T k="guidePrice" /></p>
                <p className="mt-2 text-3xl font-semibold text-[#1F2937]">
                  <Money usd={property.priceUsd} />
                </p>
                <p className="mt-4 text-sm text-[#6B7280]">
                  <T k="estimatedRentalYield" />:{" "}
                  <span className="font-semibold text-[#1F2937]">
                    {property.estimatedYield}
                  </span>
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <InvestmentMetric label={<T k="rentalDemand" />} value={<TD value={property.rentalDemand} />} />
                  <InvestmentMetric label={<T k="liquidity" />} value={<TD value={property.liquidity} />} />
                  <InvestmentMetric
                    label={<T k="monthlyRent" />}
                    value={<Money usd={property.roiDefaults.rentMonthlyUsd} />}
                  />
                  <InvestmentMetric label={<T k="riskRating" />} value={<TD value={property.riskRating} />} />
                  <InvestmentMetric label={<T k="ownership" />} value={<TD value={property.foreignOwnership} />} />
                </div>
                <Link
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
                  href={`/enquiry?property=${property.id}`}
                >
                  <T k="enquireProperty" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="grid gap-5">
              <div
                className="min-h-[420px] overflow-hidden rounded-sm bg-cover bg-center"
                style={{ backgroundImage: `url('${property.image}')` }}
              >
                <div className="flex h-full min-h-[420px] items-end bg-gradient-to-t from-[#1F2937]/38 via-[#1F2937]/8 to-transparent p-6">
                  <p className="rounded-sm bg-white/92 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1F2937] shadow-sm">
                    <TD value={property.city} /> · <TD value={property.district} />
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    className="min-h-36 rounded-sm bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url('${property.image}')` }}
                    key={item}
                    aria-label={`Property image ${item}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <InfoCard title={<T k="propertyOverview" />}>
                <dl className="grid gap-4 text-sm">
                  <Row label={<T k="city" />} value={<TD value={property.city} />} />
                  <Row label={<T k="district" />} value={<TD value={property.district} />} />
                  <Row label={<T k="type" />} value={<TD value={property.type} />} />
                  <Row
                    label={<T k="estimatedMonthlyRent" />}
                    value={<Money usd={property.roiDefaults.rentMonthlyUsd} />}
                  />
                  <Row label={<T k="bestFor" />} value={<TD value={property.bestFor} />} />
                  <Row label={<T k="rentalDemand" />} value={<TD value={property.rentalDemand} />} />
                  <Row label={<T k="exitLiquidity" />} value={<TD value={property.liquidity} />} />
                  <Row label={<T k="developerQuality" />} value={<TD value={property.developerQuality} />} />
                  <Row label={<T k="riskRating" />} value={<TD value={property.riskRating} />} />
                  <Row label={<T k="completion" />} value={<TD value={property.completionStatus} />} />
                  <Row label={<T k="foreignOwnership" />} value={<TD value={property.foreignOwnership} />} />
                </dl>
              </InfoCard>
              <InfoCard title={<T k="estimatedRentalIncome" />}>
                <p className="text-2xl font-semibold text-[#1F2937]">
                  <Money usd={property.roiDefaults.rentMonthlyUsd} />/<T k="perMonth" />
                </p>
              </InfoCard>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 sm:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <InfoCard title={<T k="investmentSummary" />}>
              <p className="text-sm leading-7 text-[#6B7280]"><TD value={property.overview} /></p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ScoreFactor label={<T k="estimatedRentalYield" />} value={property.investmentScore.factors.rentalYield} />
                <ScoreFactor label={<T k="rentalDemand" />} value={property.investmentScore.factors.rentalDemand} />
                <ScoreFactor label={<T k="exitLiquidity" />} value={property.investmentScore.factors.liquidity} />
                <ScoreFactor
                  label={<T k="developerQuality" />}
                  value={property.investmentScore.factors.developerQuality}
                />
                <ScoreFactor
                  label={<T k="foreignOwnership" />}
                  value={property.investmentScore.factors.foreignOwnership}
                />
                <ScoreFactor label={<T k="riskRating" />} value={property.investmentScore.factors.riskRating} />
              </div>
            </InfoCard>

            <InfoCard title={<T k="targetBuyerType" />}>
              <PillList items={property.targetBuyerTypes} />
              <p className="mt-5 text-sm leading-7 text-[#6B7280]">
                <TD value="Best for" /> <TD value={property.bestFor} /> <TD value="with a" /> <TD value={property.investmentScore.label} /> <TD value="score profile." />
              </p>
            </InfoCard>

            <InfoCard title={<T k="whyThisProperty" />}>
              <List items={property.whyInvest} />
            </InfoCard>

            <InfoCard title={<T k="keyRisks" />}>
              <List items={property.keyRisks} />
            </InfoCard>

            <InfoCard title={<T k="exitLiquidity" />}>
              <p className="text-2xl font-semibold text-[#1F2937]"><TD value={property.liquidity} /></p>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                <TD value="Liquidity rating reflects district depth, resale audience, ticket size, and how easy the unit type may be to reposition for future buyers." />
              </p>
            </InfoCard>

            <InfoCard title={<T k="developerQuality" />}>
              <p className="text-2xl font-semibold text-[#1F2937]"><TD value={property.developerQuality} /></p>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                <TD value={property.developer.profile} />
              </p>
            </InfoCard>
          </div>
        </section>

        <section className="px-5 pb-12 sm:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl">
            <DistrictInsightPanels city={property.city} district={property.district} />
          </div>
        </section>

        <section className="px-5 pb-12 sm:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <RoiCalculator property={property} />
            <DealProgressTracker deal={activeBuyerDeal} />
          </div>
        </section>

        <section className="bg-[#FFFDF8] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <InfoCard title={<T k="investmentHighlights" />}>
              <List items={property.investmentHighlights} />
            </InfoCard>
            <InfoCard title={<T k="priceAndPaymentPlan" />}>
              <List items={property.paymentPlan} />
            </InfoCard>
            <InfoCard title={<T k="locationDetails" />}>
              <p className="text-sm leading-7 text-[#6B7280]"><TD value={property.locationDetails} /></p>
            </InfoCard>
            <InfoCard title={<T k="developerInformation" />}>
              <h2 className="text-lg font-semibold text-[#1F2937]">
                {property.developer.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                <TD value={property.developer.profile} />
              </p>
            </InfoCard>
            <div className="lg:col-span-2">
              <InfoCard title={<T k="foreignOwnershipNotes" />}>
                <List items={property.foreignBuyerNotes} />
              </InfoCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#1F2937]">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-[#ECE7DA] pb-3">
      <dt className="text-[#6B7280]">{label}</dt>
      <dd className="text-right font-semibold text-[#1F2937]">{value}</dd>
    </div>
  );
}

function ScoreFactor({ label, value }: { label: React.ReactNode; value: number }) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#1F2937]">{value.toFixed(1)}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e4ddd2]">
        <div
          className="h-full rounded-full bg-[#F5C84C]"
          style={{ width: `${Math.min(value * 10, 100)}%` }}
        />
      </div>
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className="rounded-sm border border-[#F5C84C]/55 bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]"
          key={item}
        >
          <TD value={item} />
        </span>
      ))}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-sm leading-7 text-[#6B7280]">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E7B93D]" />
          <span><TD value={item} /></span>
        </li>
      ))}
    </ul>
  );
}
