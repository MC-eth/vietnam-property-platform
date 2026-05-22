"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { DealRoles } from "@/types/deal";

type RoleClarityCardProps = {
  roles: DealRoles;
};

const roleLabels: Array<[keyof DealRoles, string, string]> = [
  ["buyerAdvisor", "Buyer advisor", "Hong Kong / international buyer coordination"],
  ["vietnamAgent", "Vietnam agent", "Local project and transaction coordination"],
  ["legalPartner", "Legal partner", "Document and eligibility review coordination"],
  ["developerContact", "Developer contact", "Reservation, SPA, and handover updates"],
  ["rentalManager", "Rental manager", "Post-handover leasing and owner reporting"],
];

export function RoleClarityCard({ roles }: RoleClarityCardProps) {
  const { t, td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("roleClarity")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        {t("roleClarityTitle")}
      </h2>
      <div className="mt-6 grid gap-3">
        {roleLabels.map(([key, label, description]) => (
          <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4" key={key}>
            <p className="text-sm font-semibold text-[#1F2937]">{td(label)}</p>
            <p className="mt-1 text-sm text-[#1F2937]">{roles[key]}</p>
            <p className="mt-2 text-xs leading-5 text-[#6B7280]">{td(description)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
