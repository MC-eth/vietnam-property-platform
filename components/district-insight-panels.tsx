"use client";

import { districtInsights } from "@/data/district-insights";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { City } from "@/types/property";

type DistrictInsightPanelsProps = {
  city?: City;
  district?: string;
};

export function DistrictInsightPanels({ city, district }: DistrictInsightPanelsProps) {
  const { t, td } = useAppPreferences();
  const insights = districtInsights.filter((insight) => {
    const cityMatches = city ? insight.city === city : true;
    const districtMatches = district ? insight.district === district : true;

    return cityMatches && districtMatches;
  });

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
            {t("districtInsights")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
            {t("localMarketContext")}
          </h2>
        </div>
        <p className="text-sm text-[#6B7280]">
          {t("districtInsightsCount", { count: insights.length })}
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {insights.map((insight) => (
          <details
            className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-5"
            key={insight.id}
            open={Boolean(district)}
          >
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E7B93D]">
                    {td(insight.city)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#1F2937]">
                    {td(insight.district)}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 md:min-w-[420px]">
                  <InsightMetric label={t("estimatedRentalYield")} value={insight.averageYield} />
                  <InsightMetric label={t("liquidity")} value={td(insight.liquidity)} />
                  <InsightMetric label={t("rentalDemand")} value={td(insight.rentalDemand)} />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1F2937]">
                {t("viewMarketInsights")}
              </p>
            </summary>
            <div className="mt-6 grid gap-4 border-t border-[#ECE7DA] pt-5 lg:grid-cols-2">
              <InsightText label={t("buyerProfile")} value={td(insight.buyerProfile)} />
              <InsightText label={t("infrastructureOutlook")} value={td(insight.infrastructureOutlook)} />
              <InsightText label={t("priceTrend")} value={td(insight.priceTrend)} />
              <InsightText label={t("foreignBuyerPopularity")} value={td(insight.foreignBuyerPopularity)} />
            </div>
            <a
              className="mt-5 inline-flex min-h-10 items-center rounded-sm border border-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F5C84C] hover:text-[#1F2937]"
              href={`/markets/${insight.id}`}
            >
              {t("viewMarketInsights")}
            </a>
          </details>
        ))}
      </div>
    </section>
  );
}

function InsightMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-white p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#1F2937]">{value}</p>
    </div>
  );
}

function InsightText({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-[#6B7280]">{value}</p>
    </div>
  );
}
