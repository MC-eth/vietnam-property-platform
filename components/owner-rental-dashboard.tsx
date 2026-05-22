"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { RentalSummary } from "@/types/rental";

type OwnerRentalDashboardProps = {
  rentals: RentalSummary[];
};

export function OwnerRentalDashboard({ rentals }: OwnerRentalDashboardProps) {
  const { currency, t, td } = useAppPreferences();

  return (
    <section className="rounded-sm border border-[#ECE7DA] bg-white shadow-sm">
      <div className="border-b border-[#ECE7DA] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
          {t("ownerPortal")}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
          {t("ownerRentalDashboardTitle")}
        </h2>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-2">
        {rentals.map((rental) => (
          <article className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-5" key={rental.propertyId}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#1F2937]">{rental.propertyName}</h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  {t("leaseExpiry")}: {td(rental.leaseExpiry)}
                </p>
              </div>
              <span className="rounded-sm bg-[#F5C84C] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1F2937]">
                {td(rental.occupancyStatus)}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric
                label={t("monthlyRent")}
                value={formatCurrencyFromUsd(rental.monthlyRentCollectedUsd, currency)}
              />
              <Metric label={t("netYield")} value={`${rental.netYieldPercent.toFixed(1)}%`} />
              <Metric label={t("maintenance")} value={`${rental.maintenanceRequestsOpen} ${t("open")}`} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DocumentList title={t("rentalStatements")} items={rental.rentalStatements} />
              <DocumentList title={t("uploadedDocuments")} items={rental.uploadedDocuments} />
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
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function DocumentList({ title, items }: { title: string; items: string[] }) {
  const { td } = useAppPreferences();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
        {title}
      </p>
      <ul className="mt-3 grid gap-2 text-sm text-[#6B7280]">
        {items.map((item) => (
          <li className="rounded-sm bg-white px-3 py-2" key={item}>
            {td(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
