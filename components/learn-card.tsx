"use client";

import { useAppPreferences } from "@/context/app-preferences-context";

type LearnCardProps = {
  category: string;
  title: string;
  summary: string;
  readTime: string;
};

export function LearnCard({ category, title, summary, readTime }: LearnCardProps) {
  const { td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {td(category)}
      </p>
      <h2 className="mt-5 text-xl font-semibold leading-tight text-[#1F2937]">
        {td(title)}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#6B7280]">{td(summary)}</p>
      <p className="mt-5 text-sm font-semibold text-[#1F2937]">{td(readTime)}</p>
    </article>
  );
}
