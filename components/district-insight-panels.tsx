import { districtInsights } from "@/data/district-insights";
import type { City } from "@/types/property";

type DistrictInsightPanelsProps = {
  city?: City;
  district?: string;
};

export function DistrictInsightPanels({ city, district }: DistrictInsightPanelsProps) {
  const insights = districtInsights.filter((insight) => {
    const cityMatches = city ? insight.city === city : true;
    const districtMatches = district ? insight.district === district : true;

    return cityMatches && districtMatches;
  });

  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
            District insights
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
            Market context behind each investment decision.
          </h2>
        </div>
        <p className="text-sm text-[#6d746f]">{insights.length} local market profiles</p>
      </div>

      <div className="mt-6 grid gap-4">
        {insights.map((insight) => (
          <details
            className="rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-5"
            key={insight.id}
            open={Boolean(district)}
          >
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a47d32]">
                    {insight.city}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#16231d]">{insight.district}</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 md:min-w-[420px]">
                  <InsightMetric label="Avg. yield" value={insight.averageYield} />
                  <InsightMetric label="Liquidity" value={insight.liquidity} />
                  <InsightMetric label="Demand" value={insight.rentalDemand} />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#123c2b]">View district context</p>
            </summary>
            <div className="mt-6 grid gap-4 border-t border-[#e1dbd0] pt-5 lg:grid-cols-2">
              <InsightText label="Buyer profile" value={insight.buyerProfile} />
              <InsightText label="Infrastructure outlook" value={insight.infrastructureOutlook} />
              <InsightText label="Price trend" value={insight.priceTrend} />
              <InsightText label="Foreign buyer popularity" value={insight.foreignBuyerPopularity} />
            </div>
            <a
              className="mt-5 inline-flex min-h-10 items-center rounded-sm border border-[#123c2b] px-4 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
              href={`/markets/${insight.id}`}
            >
              View district page
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#16231d]">{value}</p>
    </div>
  );
}

function InsightText({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-[#5b645f]">{value}</p>
    </div>
  );
}
