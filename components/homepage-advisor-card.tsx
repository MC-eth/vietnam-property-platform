"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";

export function HomepageAdvisorCard() {
  const { t } = useAppPreferences();

  return (
    <article className="rounded-2xl bg-[#172033] p-5 text-white shadow-[0_22px_70px_rgba(23,32,51,0.18)]">
      <h3 className="max-w-sm text-xl font-semibold leading-tight">
        {t("needHelpChoosingLocation")}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/72">
        {t("advisorHelpShort")}
      </p>
      <Link
        className="premium-focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
        href="/enquiry"
      >
        {t("bookInvestorConsultation")}
      </Link>
    </article>
  );
}
