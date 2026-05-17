import Link from "next/link";
import { InvestmentMetric } from "@/components/investment-metric";
import { VerifiedProjectBadge } from "@/components/verified-project-badge";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-sm border border-[#e1dbd0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative min-h-56 bg-[linear-gradient(135deg,#d8d0c2,#f6f2eb_48%,#123c2b)]">
        <div className="absolute inset-5 border border-white/55" />
        <span className="absolute left-4 top-4 rounded-sm bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#123c2b]">
          {property.city}
        </span>
        <span className="absolute bottom-4 left-4 rounded-sm bg-[#123c2b] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
          {property.verifiedProject.level}
        </span>
      </div>
      <div className="p-5">
        <VerifiedProjectBadge level={property.verifiedProject.level} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#a47d32]">{property.district}</p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-[#16231d]">
              {property.title}
            </h2>
          </div>
          <p className="shrink-0 text-right text-sm font-semibold text-[#123c2b]">
            {property.price}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InvestmentMetric label="Estimated yield" value={property.estimatedYield} />
          <InvestmentMetric label="Risk rating" value={property.riskRating} />
          <InvestmentMetric label="Best for" value={property.bestFor} />
          <InvestmentMetric label="Foreign ownership" value={property.foreignOwnership} />
          <InvestmentMetric label="Completion" value={property.completionStatus} />
          <InvestmentMetric label="Type" value={property.type} />
        </div>

        <Link
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-[#123c2b] px-4 text-sm font-semibold text-[#123c2b] transition hover:bg-[#123c2b] hover:text-white"
          href={`/properties/${property.id}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
