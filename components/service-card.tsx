"use client";

import { useAppPreferences } from "@/context/app-preferences-context";

type ServiceCardProps = {
  title: string;
  description: string;
  marker: string;
};

export function ServiceCard({ title, description, marker }: ServiceCardProps) {
  const { td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#eef4ef] text-sm font-semibold text-[#1F2937]">
        {marker}
      </span>
      <h2 className="mt-6 text-xl font-semibold text-[#1F2937]">{td(title)}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(description)}</p>
    </article>
  );
}
