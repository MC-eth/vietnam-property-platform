"use client";

import { useAppPreferences } from "@/context/app-preferences-context";

export function WhatsAppButton() {
  const { t } = useAppPreferences();

  return (
    <a
      aria-label={t("whatsappAdvisor")}
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#F5C84C] px-5 text-sm font-semibold text-[#1F2937] shadow-xl shadow-[#F5C84C]/25 transition hover:bg-[#E7B93D]"
      href="https://wa.me/85200000000?text=I%20would%20like%20to%20discuss%20Vietnam%20property%20investment"
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-[#1F2937]">
        W
      </span>
      {t("bookInvestorConsultation")}
    </a>
  );
}
