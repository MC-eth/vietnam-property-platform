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
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-[#6B7280]">{td(title)}</p>
      <p className="mt-3 text-3xl font-semibold text-[#1F2937]">{value}</p>
      <p className="mt-2 text-sm text-[#6B7280]">{td(detail)}</p>
    </article>
  );
}
