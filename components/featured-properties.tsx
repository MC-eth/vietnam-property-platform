import { properties } from "@/data/home";
import { SectionHeading } from "./section-heading";

export function FeaturedProperties() {
  return (
    <section className="bg-[#eee5d6] px-5 py-20 sm:px-8 lg:py-28" id="properties">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Featured properties"
            title="Mock investment shortlist."
            description="Representative listings only. Each card is structured for future listing data without connecting a backend yet."
          />
          <a
            className="inline-flex min-h-12 w-fit items-center border border-[#143b2c] px-5 text-sm font-semibold text-[#143b2c] transition hover:bg-[#143b2c] hover:text-white"
            href="#"
          >
            Compare all listings
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article
              className="group overflow-hidden border border-[#d7ccba] bg-[#fbf7ef] shadow-sm"
              key={property.title}
            >
              <div
                className="relative min-h-72 bg-cover bg-center"
                style={{ backgroundImage: `url('${property.image}')` }}
                role="img"
                aria-label={property.title}
              >
                <span className="absolute left-4 top-4 bg-[#fbf7ef] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#143b2c]">
                  {property.badge}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-[#8a6a33]">
                  {property.city} · {property.district}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#15251d]">
                  {property.title}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-[#59625b]">
                  <div>
                    <p>Price</p>
                    <p className="mt-1 text-xl font-semibold text-[#143b2c]">
                      {property.price}
                    </p>
                  </div>
                  <div>
                    <p>Projected yield</p>
                    <p className="mt-1 text-xl font-semibold text-[#143b2c]">
                      {property.yield}
                    </p>
                  </div>
                  <div>
                    <p>Bedrooms</p>
                    <p className="mt-1 font-semibold text-[#15251d]">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div>
                    <p>Size</p>
                    <p className="mt-1 font-semibold text-[#15251d]">
                      {property.size}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
