"use client";

import Link from "next/link";
import { CURRENCIES } from "@/constants";
import { LANGUAGES, type LanguageCode, type TranslationKey } from "@/constants/translations";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { CurrencyCode } from "@/types/currency";

const navItems = [
  { href: "/properties", labelKey: "properties" },
  { href: "/districts", labelKey: "districts" },
  { href: "/how-it-works", labelKey: "howItWorks" },
  { href: "/services", labelKey: "navigationServices" },
  { href: "/learn", labelKey: "learn" },
  { href: "/enquiry", labelKey: "enquiry" },
  { href: "/buyer-dashboard", labelKey: "buyerDashboard" },
  { href: "/owner-portal", labelKey: "ownerPortal" },
  { href: "/admin", labelKey: "admin" },
] as const satisfies readonly {
  href: string;
  labelKey: TranslationKey;
}[];

export function Header() {
  const { currency, language, setCurrency, setLanguage, t } = useAppPreferences();

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE7DA] bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="VietInvest home">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F5C84C] text-sm font-semibold text-[#1F2937]">
            VI
          </span>
          <span className="text-base font-semibold text-[#1F2937] sm:text-lg">
            VietInvest Property
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[#6B7280] xl:flex">
          {navItems.map((item) => (
            <Link className="transition hover:text-[#1F2937]" href={item.href} key={item.href}>
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {LANGUAGES.map((item) => (
            <Toggle
              active={language === item.code}
              key={item.code}
              label={item.label}
              onClick={() => setLanguage(item.code as LanguageCode)}
            />
          ))}
          <span className="mx-1 h-6 w-px bg-[#ECE7DA]" />
          {CURRENCIES.map((item) => (
            <Toggle
              active={currency === item}
              key={item}
              label={item}
              onClick={() => setCurrency(item as CurrencyCode)}
            />
          ))}
        </div>

        <Link
          className="inline-flex min-h-11 items-center rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
          href="/enquiry"
        >
          {t("bookInvestorConsultation")}
        </Link>
      </div>

      <div className="border-t border-[#ECE7DA] px-5 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#6B7280]">
            {navItems.slice(0, 5).map((item) => (
              <Link className="transition hover:text-[#1F2937]" href={item.href} key={item.href}>
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            {LANGUAGES.map((item) => (
              <Toggle
                active={language === item.code}
                key={item.code}
                label={item.label}
                onClick={() => setLanguage(item.code as LanguageCode)}
              />
            ))}
            {CURRENCIES.map((item) => (
              <Toggle
                active={currency === item}
                key={item}
                label={item}
                onClick={() => setCurrency(item as CurrencyCode)}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Toggle({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`min-h-9 rounded-sm px-3 text-xs font-semibold transition ${
        active
          ? "bg-[#F5C84C] text-[#1F2937]"
          : "border border-[#ECE7DA] bg-white text-[#6B7280] hover:text-[#1F2937]"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
