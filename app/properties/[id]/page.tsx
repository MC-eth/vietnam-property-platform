import Link from "next/link";
import { notFound } from "next/navigation";
import { DealProgressTracker } from "@/components/deal-progress-tracker";
import { DistrictInsightPanels } from "@/components/district-insight-panels";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestmentMetric } from "@/components/investment-metric";
import { InvestmentScoreBadge } from "@/components/investment-score-badge";
import { RoiCalculator } from "@/components/roi-calculator";
import { VerifiedProjectBadge } from "@/components/verified-project-badge";
import { activeBuyerDeal } from "@/data/deals";
import { formatUsd } from "@/lib/formatters";
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
            <Link className="text-sm font-semibold text-[#123c2b]" href="/properties">
              Back to properties
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <VerifiedProjectBadge
                  checks={property.verifiedProject.checks}
                  level={property.verifiedProject.level}
                  showChecks
                  summary={property.verifiedProject.summary}
                />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47d32]">
                  {property.city} · {property.district}
                </p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#16231d] sm:text-5xl">
                  {property.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#5b645f]">
                  {property.overview}
                </p>
              </div>
              <div className="rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm">
                <InvestmentScoreBadge score={property.investmentScore} />
                <p className="mt-5 text-sm text-[#5b645f]">Guide price</p>
                <p className="mt-2 text-3xl font-semibold text-[#123c2b]">
                  {property.price}
                </p>
                <p className="mt-4 text-sm text-[#5b645f]">
                  Estimated rental yield:{" "}
                  <span className="font-semibold text-[#16231d]">
                    {property.estimatedYield}
                  </span>
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <InvestmentMetric label="Rental demand" value={property.rentalDemand} />
                  <InvestmentMetric label="Liquidity" value={property.liquidity} />
                  <InvestmentMetric
                    label="Monthly rent"
                    value={formatUsd(property.roiDefaults.rentMonthlyUsd)}
                  />
                  <InvestmentMetric label="Risk rating" value={property.riskRating} />
                  <InvestmentMetric label="Ownership" value={property.foreignOwnership} />
                </div>
                <Link
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#123c2b] px-5 text-sm font-semibold text-white transition hover:bg-[#0d2d20]"
                  href={`/enquiry?property=${property.id}`}
                >
                  Enquire About This Property
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
                <div className="flex h-full min-h-[420px] items-end bg-gradient-to-t from-[#0f1f18]/72 via-[#0f1f18]/10 to-transparent p-6">
                  <p className="rounded-sm bg-white/92 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#123c2b] shadow-sm">
                    {property.city} · {property.district}
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
              <InfoCard title="Property overview">
                <dl className="grid gap-4 text-sm">
                  <Row label="City" value={property.city} />
                  <Row label="District" value={property.district} />
                  <Row label="Type" value={property.type} />
                  <Row
                    label="Estimated monthly rent"
                    value={formatUsd(property.roiDefaults.rentMonthlyUsd)}
                  />
                  <Row label="Best for" value={property.bestFor} />
                  <Row label="Rental demand" value={property.rentalDemand} />
                  <Row label="Exit liquidity" value={property.liquidity} />
                  <Row label="Developer quality" value={property.developerQuality} />
                  <Row label="Risk rating" value={property.riskRating} />
                  <Row label="Completion" value={property.completionStatus} />
                  <Row label="Foreign ownership" value={property.foreignOwnership} />
                </dl>
              </InfoCard>
              <InfoCard title="Estimated rental income">
                <p className="text-2xl font-semibold text-[#123c2b]">
                  {property.estimatedRentalIncome}
                </p>
              </InfoCard>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 sm:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <InfoCard title="Investment summary">
              <p className="text-sm leading-7 text-[#5b645f]">{property.overview}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ScoreFactor label="Rental yield" value={property.investmentScore.factors.rentalYield} />
                <ScoreFactor label="Rental demand" value={property.investmentScore.factors.rentalDemand} />
                <ScoreFactor label="Exit liquidity" value={property.investmentScore.factors.liquidity} />
                <ScoreFactor
                  label="Developer quality"
                  value={property.investmentScore.factors.developerQuality}
                />
                <ScoreFactor
                  label="Foreign ownership"
                  value={property.investmentScore.factors.foreignOwnership}
                />
                <ScoreFactor label="Risk rating" value={property.investmentScore.factors.riskRating} />
              </div>
            </InfoCard>

            <InfoCard title="Target buyer type">
              <PillList items={property.targetBuyerTypes} />
              <p className="mt-5 text-sm leading-7 text-[#5b645f]">
                Best for {property.bestFor.toLowerCase()} with a {property.investmentScore.label.toLowerCase()} score profile.
              </p>
            </InfoCard>

            <InfoCard title="Why this property">
              <List items={property.whyInvest} />
            </InfoCard>

            <InfoCard title="Key risks">
              <List items={property.keyRisks} />
            </InfoCard>

            <InfoCard title="Exit liquidity">
              <p className="text-2xl font-semibold text-[#123c2b]">{property.liquidity}</p>
              <p className="mt-4 text-sm leading-7 text-[#5b645f]">
                Liquidity rating reflects district depth, resale audience, ticket size, and how easy the unit type may be to reposition for future buyers.
              </p>
            </InfoCard>

            <InfoCard title="Developer quality">
              <p className="text-2xl font-semibold text-[#123c2b]">{property.developerQuality}</p>
              <p className="mt-4 text-sm leading-7 text-[#5b645f]">
                {property.developer.profile}
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

        <section className="bg-[#f3efe8] px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <InfoCard title="Investment highlights">
              <List items={property.investmentHighlights} />
            </InfoCard>
            <InfoCard title="Price and payment plan">
              <List items={property.paymentPlan} />
            </InfoCard>
            <InfoCard title="Location details">
              <p className="text-sm leading-7 text-[#5b645f]">{property.locationDetails}</p>
            </InfoCard>
            <InfoCard title="Developer information">
              <h2 className="text-lg font-semibold text-[#16231d]">
                {property.developer.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5b645f]">
                {property.developer.profile}
              </p>
            </InfoCard>
            <div className="lg:col-span-2">
              <InfoCard title="Foreign ownership notes">
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
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#16231d]">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-[#eee8de] pb-3">
      <dt className="text-[#6d746f]">{label}</dt>
      <dd className="text-right font-semibold text-[#16231d]">{value}</dd>
    </div>
  );
}

function ScoreFactor({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a817c]">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#16231d]">{value.toFixed(1)}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e4ddd2]">
        <div
          className="h-full rounded-full bg-[#123c2b]"
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
          className="rounded-sm border border-[#d7bd7d]/55 bg-[#fbfaf7] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b4e18]"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-sm leading-7 text-[#5b645f]">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a47d32]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
