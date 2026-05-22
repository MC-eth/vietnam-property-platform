import Link from "next/link";
import { DealProgressTracker } from "@/components/deal-progress-tracker";
import { DealSummaryCard } from "@/components/deal-summary-card";
import { DocumentChecklist } from "@/components/document-checklist";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { NextActionCard } from "@/components/next-action-card";
import { PageHeading } from "@/components/page-heading";
import { PaymentTracker } from "@/components/payment-tracker";
import { RoleClarityCard } from "@/components/role-clarity-card";
import { activeBuyerDeal } from "@/data/deals";

const dashboardMetrics = [
  { label: "Active transaction", value: activeBuyerDeal.propertyName },
  { label: "Current stage", value: activeBuyerDeal.currentStage },
  { label: "Advisor", value: activeBuyerDeal.assignedAdvisor },
  { label: "Vietnam agent", value: activeBuyerDeal.assignedLocalAgent },
];

export default function BuyerDashboardPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={<TD value="Buyer transaction dashboard" />}
            title={<TD value="Track a Vietnam property purchase from enquiry to rental setup." />}
            description={<TD value="A mock transparency dashboard for international buyers showing deal stages, documents, payments, responsible parties, and next required actions." />}
          />
          <div className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
              href={`/properties/${activeBuyerDeal.propertyId}`}
            >
              <T k="viewInvestmentDetails" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
              href="/enquiry"
            >
              <T k="speakToAdvisor" />
            </Link>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dashboardMetrics.map((metric) => (
                <article
                  className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm"
                  key={metric.label}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                    <TD value={metric.label} />
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-[#1F2937]">
                    <TD value={metric.value} />
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <NextActionCard deal={activeBuyerDeal} />
            </div>

            <div className="mt-8">
              <DealSummaryCard deal={activeBuyerDeal} />
            </div>

            <div className="mt-8">
              <DealProgressTracker deal={activeBuyerDeal} />
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1fr]">
              <DocumentChecklist documents={activeBuyerDeal.documents} />
              <PaymentTracker payments={activeBuyerDeal.payments} />
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
              <RoleClarityCard roles={activeBuyerDeal.roles} />
              <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
                  <TD value="Transparency note" />
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
                  <TD value="Built for calm cross-border coordination." />
                </h2>
                <div className="mt-6 grid gap-4 text-sm leading-7 text-[#6B7280] md:grid-cols-2">
                  <p>
                    <TD value="This MVP uses local mock data to demonstrate how a future buyer account could connect CRM updates, advisor tasks, legal review status, payment visibility, and rental onboarding." />
                  </p>
                  <p>
                    <TD value="It does not process real payments, store real buyer documents, authenticate users, provide legal advice, or guarantee investment returns or transaction outcomes." />
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
