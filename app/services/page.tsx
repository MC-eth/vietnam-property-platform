import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";
import { ServiceCard } from "@/components/service-card";

const services = [
  {
    marker: "01",
    title: "Property sourcing",
    description:
      "Shortlist Vietnam residential properties based on city, budget, yield target, buyer eligibility, and exit strategy.",
  },
  {
    marker: "02",
    title: "Foreign buyer guidance",
    description:
      "Explain ownership quota, documentation, transaction flow, and the practical steps for overseas buyers.",
  },
  {
    marker: "03",
    title: "Legal coordination",
    description:
      "Coordinate with local legal professionals for contract review, title checks, and buyer-side documentation.",
  },
  {
    marker: "04",
    title: "Payment and FX support",
    description:
      "Prepare the front-end structure for payment schedules, FX planning, and future banking partner workflows.",
  },
  {
    marker: "05",
    title: "Local agent matching",
    description:
      "Match qualified overseas buyers with trusted local Vietnam agents for property visits and transaction support.",
  },
  {
    marker: "06",
    title: "Rental management after purchase",
    description:
      "Future service layer for furnishing, tenant placement, rent collection, maintenance, and owner reporting.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Services"
            title="A premium advisory framework for foreign buyers."
            description="The MVP separates the major service lines so they can later connect to agents, legal partners, FX providers, and rental managers."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard {...service} key={service.title} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
