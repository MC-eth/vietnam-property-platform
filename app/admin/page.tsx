import { DashboardCard } from "@/components/dashboard-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";

const adminMetrics = [
  { title: "New enquiries", value: "18", detail: "Mock buyer leads this week" },
  { title: "Buyer status", value: "7 active", detail: "Qualified buyers in advisory flow" },
  { title: "Property listings", value: "6", detail: "Local mock listings available" },
  { title: "Agent assigned", value: "83%", detail: "Enquiries with matched agent" },
];

const deals = [
  ["Sarah L.", "Hong Kong", "Ho Chi Minh City", "Minh Tran", "Shortlisting"],
  ["David C.", "Singapore", "Hanoi", "Lan Nguyen", "Legal review"],
  ["Amelia W.", "Australia", "Ho Chi Minh City", "Quang Le", "Reservation"],
  ["Marcus T.", "United Kingdom", "Hanoi", "TBD", "New enquiry"],
];

export default function AdminPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Admin dashboard mockup"
            title="Internal operating view for enquiries, agents, and deal stages."
            description="This is a placeholder dashboard only. Authentication, permissions, and CRM sync can be added later."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {adminMetrics.map((metric) => (
                <DashboardCard {...metric} key={metric.title} />
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm">
              <div className="border-b border-[#e1dbd0] p-5">
                <h2 className="text-xl font-semibold text-[#16231d]">Buyer pipeline</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-[#f3efe8] text-[#4f5a54]">
                    <tr>
                      {["Buyer", "Residence", "Target city", "Agent assigned", "Deal stage"].map((heading) => (
                        <th className="px-5 py-4 font-semibold" key={heading}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee8de]">
                    {deals.map((deal) => (
                      <tr key={deal.join("-")}>
                        {deal.map((cell) => (
                          <td className="px-5 py-4 text-[#5b645f]" key={cell}>
                            {cell}
                          </td>
                        ))}
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
