import { cities } from "@/data/home";
import { SectionHeading } from "./section-heading";

export function FeaturedCities() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28" id="cities">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured cities"
          title="Two gateway markets built for foreign capital."
          description="Start with Vietnam's deepest residential markets, where rental demand, infrastructure investment, and resale liquidity are easiest to underwrite."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cities.map((city) => (
            <article
              className="group overflow-hidden border border-[#ddd2c2] bg-[#fbf7ef] shadow-sm"
              key={city.name}
            >
              <div className="grid min-h-[520px] md:grid-cols-[0.95fr_1.05fr]">
                <div
                  className="min-h-72 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url('${city.image}')` }}
                  role="img"
                  aria-label={`${city.name} skyline`}
                />
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6a33]">
                      {city.market}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold text-[#15251d]">
                      {city.name}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-[#59625b]">
                      {city.description}
                    </p>
                  </div>
                  <div className="mt-10 grid grid-cols-2 border-t border-[#e2d8ca] pt-6">
                    <div>
                      <p className="text-sm text-[#777067]">Target yield</p>
                      <p className="mt-1 text-2xl font-semibold text-[#143b2c]">
                        {city.averageYield}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#777067]">From</p>
                      <p className="mt-1 text-2xl font-semibold text-[#143b2c]">
                        {city.fromPrice}
                      </p>
                    </div>
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
