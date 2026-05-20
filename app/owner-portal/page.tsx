import { DashboardCard } from "@/components/dashboard-card";
import { DealProgressTracker } from "@/components/deal-progress-tracker";
import { DealSummaryCard } from "@/components/deal-summary-card";
import { DocumentChecklist } from "@/components/document-checklist";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InvestmentInsightPanel } from "@/components/investment-insight-panel";
import { OwnerRentalDashboard } from "@/components/owner-rental-dashboard";
import { PageHeading } from "@/components/page-heading";
import { activeBuyerDeal, buyerDeals } from "@/data/deals";
import { mockInvestmentInsights, rentalSummaries } from "@/data/rentals";

const ownerMetrics = [
  { title: "Active deals", value: "3", detail: "Across Ho Chi Minh City and Hanoi" },
  { title: "Current stage", value: "Reservation", detail: "Active Thu Thiem deal" },
  { title: "Documents pending", value: "4", detail: "SPA, transfer, legal, rental docs" },
  { title: "Managed assets", value: "2", detail: "Rental reporting mockup after handover" },
];

export default function OwnerPortalPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Buyer and owner operating dashboard"
            title="Transparent cross-border deal progress from enquiry to rental setup."
            description="Mock dashboard only. This shows how the platform can later connect buyer accounts, CRM stages, legal documents, agent updates, and rental management reporting."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {ownerMetrics.map((metric) => (
                <DashboardCard {...metric} key={metric.title} />
              ))}
            </div>

            <div className="mt-8">
              <DealSummaryCard deal={activeBuyerDeal} />
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <DealProgressTracker deal={activeBuyerDeal} />
              <DocumentChecklist documents={activeBuyerDeal.documents} />
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <OwnerRentalDashboard rentals={rentalSummaries} />
              <InvestmentInsightPanel insights={mockInvestmentInsights} />
            </div>

            <div className="mt-8 overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm">
              <div className="border-b border-[#e1dbd0] p-5">
                <h2 className="text-xl font-semibold text-[#16231d]">
                  Buyer deal pipeline
                </h2>
                <p className="mt-2 text-sm text-[#6d746f]">
                  Mock internal view of different buyer transaction statuses.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[840px] border-collapse text-left text-sm">
                  <thead className="bg-[#f3efe8] text-[#4f5a54]">
                    <tr>
                      {["Buyer", "Property", "Current stage", "Advisor", "Local agent", "Next action"].map((heading) => (
                        <th className="px-5 py-4 font-semibold" key={heading}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee8de]">
                    {buyerDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td className="px-5 py-4 font-semibold text-[#16231d]">
                          {deal.buyerName}
                        </td>
                        <td className="px-5 py-4 text-[#5b645f]">{deal.propertyName}</td>
                        <td className="px-5 py-4 text-[#123c2b]">{deal.currentStage}</td>
                        <td className="px-5 py-4 text-[#5b645f]">{deal.assignedAdvisor}</td>
                        <td className="px-5 py-4 text-[#5b645f]">{deal.assignedLocalAgent}</td>
                        <td className="px-5 py-4 text-[#5b645f]">{deal.nextAction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
