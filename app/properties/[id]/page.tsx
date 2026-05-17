import Link from "next/link";
import { notFound } from "next/navigation";
import { DealProgressTracker } from "@/components/deal-progress-tracker";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestmentMetric } from "@/components/investment-metric";
import { RoiCalculator } from "@/components/roi-calculator";
import { VerifiedProjectBadge } from "@/components/verified-project-badge";
import { getPropertyById, properties } from "@/data/properties";

type PropertyDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

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
                  level={property.verifiedProject.level}
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
                <p className="text-sm text-[#5b645f]">Guide price</p>
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
                  <InvestmentMetric label="Risk rating" value={property.riskRating} />
                  <InvestmentMetric label="Best for" value={property.bestFor} />
                  <InvestmentMetric label="Ownership" value={property.foreignOwnership} />
                  <InvestmentMetric label="Completion" value={property.completionStatus} />
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
              <div className="min-h-[420px] rounded-sm bg-[linear-gradient(135deg,#d8d0c2,#f8f4ed_42%,#123c2b)] p-6">
                <div className="flex h-full min-h-[372px] items-end border border-white/60 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#123c2b]">
                    Large property image placeholder
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    className="min-h-36 rounded-sm bg-[linear-gradient(135deg,#ece5da,#ffffff_50%,#d7cbb8)]"
                    key={item}
                    aria-label={`Property image placeholder ${item}`}
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
                  <Row label="Best for" value={property.bestFor} />
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
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <RoiCalculator property={property} />
            <DealProgressTracker />
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
              <InfoCard title="Foreign buyer notes">
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
