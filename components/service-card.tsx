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
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-7 shadow-sm transition hover:border-[#D8CDAF] hover:shadow-md">
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FFFDF8] text-sm font-semibold text-[#1F2937] ring-1 ring-[#ECE7DA]">
        {marker}
      </span>
      <h2 className="mt-6 text-xl font-semibold text-[#1F2937]">{td(title)}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">{td(description)}</p>
    </article>
  );
}
