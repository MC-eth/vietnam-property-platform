import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilter } from "@/components/property-filter";
import { properties } from "@/data/properties";

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Property listings"
            title="Residential investment opportunities in Vietnam's gateway cities."
            description="Browse mock property data for Ho Chi Minh City and Hanoi. Filters are visual only for this front-end MVP."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <PropertyFilter />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard property={property} key={property.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
