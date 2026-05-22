"use client";

import { journeySteps } from "@/data/home";
import { TD } from "./localized-text";
import { SectionHeading } from "./section-heading";

export function BuyerJourney() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28" id="journey">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow={<TD value="Foreign buyer journey" />}
          title={<TD value="A clear path from market entry to managed ownership." />}
          description={<TD value="Foreign buyers need more than listings. The journey is designed around eligibility, paperwork, underwriting, and post-completion performance." />}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {journeySteps.map((item) => (
            <article
              className="border border-[#ddd2c2] bg-[#FFFDF8] p-6 shadow-sm"
              key={item.step}
            >
              <p className="font-mono text-sm text-[#8a6a33]">{item.step}</p>
              <h3 className="mt-8 text-xl font-semibold text-[#15251d]">
                <TD value={item.title} />
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#59625b]">
                <TD value={item.description} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
