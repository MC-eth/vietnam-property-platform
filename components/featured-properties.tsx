"use client";

import { properties } from "@/data/home";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import { TD } from "./localized-text";
import { SectionHeading } from "./section-heading";

export function FeaturedProperties() {
  const { currency, t, td } = useAppPreferences();

  return (
    <section className="bg-[#eee5d6] px-5 py-20 sm:px-8 lg:py-28" id="properties">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={<TD value="Featured properties" />}
            title={<TD value="Mock investment shortlist." />}
            description={<TD value="Representative listings only. Each card is structured for future listing data without connecting a backend yet." />}
          />
          <a
            className="inline-flex min-h-12 w-fit items-center border border-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C]"
            href="#"
          >
            {t("browseInvestmentCases")}
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <article
              className="group overflow-hidden border border-[#d7ccba] bg-[#FFFDF8] shadow-sm"
              key={property.title}
            >
              <div
                className="relative min-h-72 bg-cover bg-center"
                style={{ backgroundImage: `url('${property.image}')` }}
                role="img"
                aria-label={td(property.title)}
              >
                <span className="absolute left-4 top-4 bg-[#FFFDF8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1F2937]">
                  {td(property.badge)}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-[#8a6a33]">
                  {td(property.city)} · {td(property.district)}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#15251d]">
                  {td(property.title)}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-[#59625b]">
                  <div>
                    <p>{t("price")}</p>
                    <p className="mt-1 text-xl font-semibold text-[#1F2937]">
                      {formatCurrencyFromUsd(parseUsdPrice(property.price), currency)}
                    </p>
                  </div>
                  <div>
                    <p>{t("estimatedRentalYield")}</p>
                    <p className="mt-1 text-xl font-semibold text-[#1F2937]">
                      {property.yield}
                    </p>
                  </div>
                  <div>
                    <p>{td("Bedrooms")}</p>
                    <p className="mt-1 font-semibold text-[#15251d]">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div>
                    <p>{td("Size")}</p>
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

function parseUsdPrice(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}
