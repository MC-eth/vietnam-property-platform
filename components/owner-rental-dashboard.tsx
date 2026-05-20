import { formatUsd } from "@/lib/formatters";
import type { RentalSummary } from "@/types/rental";

type OwnerRentalDashboardProps = {
  rentals: RentalSummary[];
};

export function OwnerRentalDashboard({ rentals }: OwnerRentalDashboardProps) {
  return (
    <section className="rounded-sm border border-[#e1dbd0] bg-white shadow-sm">
      <div className="border-b border-[#e1dbd0] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
          Owner rental dashboard
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-[#16231d]">
          Managed portfolio income and operations.
        </h2>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-2">
        {rentals.map((rental) => (
          <article className="rounded-sm border border-[#eee8de] bg-[#fbfaf7] p-5" key={rental.propertyId}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#16231d]">{rental.propertyName}</h3>
                <p className="mt-2 text-sm text-[#6d746f]">Lease expiry: {rental.leaseExpiry}</p>
              </div>
              <span className="rounded-sm bg-[#123c2b] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                {rental.occupancyStatus}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric label="Monthly rent" value={formatUsd(rental.monthlyRentCollectedUsd)} />
              <Metric label="Net yield" value={`${rental.netYieldPercent.toFixed(1)}%`} />
              <Metric label="Maintenance" value={`${rental.maintenanceRequestsOpen} open`} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DocumentList title="Rental statements" items={rental.rentalStatements} />
              <DocumentList title="Uploaded documents" items={rental.uploadedDocuments} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[#16231d]">{value}</p>
    </div>
  );
}

function DocumentList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a817c]">
        {title}
      </p>
      <ul className="mt-3 grid gap-2 text-sm text-[#5b645f]">
        {items.map((item) => (
          <li className="rounded-sm bg-white px-3 py-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

