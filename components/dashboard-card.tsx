"use client";

import { useAppPreferences } from "@/context/app-preferences-context";

type DashboardCardProps = {
  title: string;
  value: string;
  detail: string;
};

export function DashboardCard({ title, value, detail }: DashboardCardProps) {
  const { td } = useAppPreferences();

  return (
    <article className="premium-card rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{td(title)}</p>
      <p className="mt-4 text-3xl font-semibold leading-none text-[#1F2937]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#6B7280]">{td(detail)}</p>
    </article>
  );
}
