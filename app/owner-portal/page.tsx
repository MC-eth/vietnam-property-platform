import { DashboardCard } from "@/components/dashboard-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";

const ownerMetrics = [
  { title: "My properties", value: "2", detail: "Ho Chi Minh City and Hanoi assets" },
  { title: "Monthly rent collected", value: "USD 3,420", detail: "Mock current month collection" },
  { title: "Occupancy status", value: "96%", detail: "Portfolio occupancy placeholder" },
  { title: "Maintenance requests", value: "3", detail: "Two open, one awaiting quote" },
];

const rentalRows = [
  ["Thu Thiem River Residence", "USD 2,050", "Occupied", "Renewal in 42 days"],
  ["West Lake Diplomatic Suite", "USD 1,370", "Occupied", "Routine inspection due"],
];

export default function OwnerPortalPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Rental management dashboard"
            title="Owner reporting mockup for managed Vietnam assets."
            description="No authentication or backend is connected yet. This shows the rental management layer the platform can grow into after purchase."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {ownerMetrics.map((metric) => (
                <DashboardCard {...metric} key={metric.title} />
              ))}
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#16231d]">Performance summary</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {["Gross yield 5.2%", "Net income USD 2,860", "HKD equivalent 26,676"].map((item) => (
                    <div className="rounded-sm bg-[#f3efe8] p-4 text-sm font-semibold text-[#16231d]" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#16231d]">Documents</h2>
                <ul className="mt-5 grid gap-3 text-sm text-[#5b645f]">
                  <li>Lease agreement placeholder</li>
                  <li>Monthly owner statement placeholder</li>
                  <li>Maintenance invoice placeholder</li>
                </ul>
              </article>
            </div>

            <div className="mt-8 overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm">
              <div className="border-b border-[#e1dbd0] p-5">
                <h2 className="text-xl font-semibold text-[#16231d]">
                  Managed rental portfolio
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead className="bg-[#f3efe8] text-[#4f5a54]">
                    <tr>
                      {["Property", "Monthly rent", "Occupancy", "Next action"].map((heading) => (
                        <th className="px-5 py-4 font-semibold" key={heading}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee8de]">
                    {rentalRows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
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
