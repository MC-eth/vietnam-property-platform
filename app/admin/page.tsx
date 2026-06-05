import { DashboardCard } from "@/components/dashboard-card";
import { AccessGate } from "@/components/access-gate";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { PageHeading } from "@/components/page-heading";
import { getAvailableAgents } from "@/services/agentService";
import { getEnquiries } from "@/services/enquiryService";
import { getProperties } from "@/services/propertyService";
import { getUsers } from "@/services/userService";
import type { Agent } from "@/types/agent";
import type { City } from "@/types/property";

export default async function AdminPage() {
  const [agents, enquiries, properties, users] = await Promise.all([
    getAvailableAgents(),
    getEnquiries(),
    getProperties(),
    getUsers(),
  ]);

  const buyerUsers = users.filter((user) => user.role === "buyer");
  const assignedEnquiries = enquiries.filter((enquiry) => enquiry.status === "Advisor assigned");
  const assignmentRate =
    enquiries.length > 0 ? Math.round((assignedEnquiries.length / enquiries.length) * 100) : 0;

  const adminMetrics = [
    { title: "New enquiries", value: String(enquiries.length), detail: "JSON mock buyer leads" },
    { title: "Buyer profiles", value: String(buyerUsers.length), detail: "Mock user profiles" },
    { title: "Property listings", value: String(properties.length), detail: "JSON mock listings" },
    { title: "Agent assigned", value: `${assignmentRate}%`, detail: `${agents.length} active local agents` },
  ];

  return (
    <>
      <Header />
      <AccessGate allowedRoles={["admin"]}>
        <main>
          <section className="stone-surface px-5 py-16 sm:px-8 lg:py-24">
            <PageHeading
              eyebrow={<T k="adminDashboard" />}
              title={<TD value="Internal operating view for enquiries, agents, and deal stages." />}
              description={<TD value="This is a placeholder dashboard only. Authentication, permissions, and CRM sync can be added later." />}
            />
          </section>
        <section className="px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {adminMetrics.map((metric) => (
                <DashboardCard {...metric} key={metric.title} />
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-sm border border-[#ECE7DA] bg-white shadow-sm">
              <div className="border-b border-[#ECE7DA] p-5">
                <h2 className="text-xl font-semibold text-[#1F2937]"><TD value="Buyer pipeline" /></h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-[#FFFDF8] text-[#6B7280]">
                    <tr>
                      {["Buyer", "Residence", "Target city", "Agent assigned", "Deal stage"].map((heading) => (
                        <th className="px-5 py-4 font-semibold" key={heading}>
                          <TD value={heading} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE7DA]">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="px-5 py-4 text-[#6B7280]">
                          {enquiry.buyer.fullName}
                        </td>
                        <td className="px-5 py-4 text-[#6B7280]">
                          {enquiry.buyer.countryOfResidence}
                        </td>
                        <td className="px-5 py-4 text-[#6B7280]">
                          <TD value={enquiry.targetCity} />
                        </td>
                        <td className="px-5 py-4 text-[#6B7280]">
                          {getAssignedAgentName(enquiry.targetCity, agents)}
                        </td>
                        <td className="px-5 py-4 text-[#6B7280]">
                          <TD value={enquiry.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        </main>
      </AccessGate>
      <Footer />
    </>
  );
}

function getAssignedAgentName(targetCity: City | "Both cities", agents: Agent[]) {
  if (targetCity === "Both cities") {
    return "Advisor assignment pending";
  }

  return agents.find((agent) => agent.markets.includes(targetCity))?.name ?? "TBD";
}
