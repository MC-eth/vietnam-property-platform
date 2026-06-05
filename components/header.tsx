"use client";

import Link from "next/link";
import { useState } from "react";
import { CURRENCIES } from "@/constants";
import { LANGUAGES, type LanguageCode, type TranslationKey } from "@/constants/translations";
import { useAppPreferences } from "@/context/app-preferences-context";
import { useAuth } from "@/hooks/use-auth";
import type { CurrencyCode } from "@/types/currency";

const publicNavItems = [
  { href: "/properties", labelKey: "properties" },
  { href: "/districts", labelKey: "districts" },
  { href: "/how-it-works", labelKey: "howItWorks" },
  { href: "/learn", labelKey: "learn" },
] as const satisfies readonly {
  href: string;
  labelKey: TranslationKey;
}[];

const buyerNavItems = [
  { href: "/buyer-dashboard", labelKey: "buyerDashboard" },
  { href: "/owner-portal", labelKey: "ownerPortal" },
] as const satisfies readonly {
  href: string;
  labelKey: TranslationKey;
}[];

const adminNavItems = [
  { href: "/admin", labelKey: "admin" },
] as const satisfies readonly {
  href: string;
  labelKey: TranslationKey;
}[];

export function Header() {
  const { currency, language, setCurrency, setLanguage, t } = useAppPreferences();
  const { isLoggedIn, openLoginModal, userRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const roleNavItems = userRole === "buyer" ? buyerNavItems : userRole === "admin" ? adminNavItems : [];
  const visibleNavItems = [...publicNavItems, ...roleNavItems];

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE7DA]/80 bg-[#FFFDF8]/88 shadow-[0_8px_30px_rgba(31,41,55,0.03)] backdrop-blur-xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="VietInvest home">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#F5C84C] text-xs font-semibold text-[#1F2937]">
            VI
          </span>
          <span className="text-sm font-semibold tracking-[0.01em] text-[#1F2937] sm:text-base">
            VietInvest Property
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#6B7280] xl:flex">
          {visibleNavItems.map((item) => (
            <Link className="transition duration-200 hover:text-[#1F2937]" href={item.href} key={item.href}>
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

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button
                className="premium-focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
                onClick={() => openLoginModal()}
                type="button"
              >
                <UserIcon />
                {t("signIn")}
              </button>
            )}
          </div>
          <button
            className="premium-focus-ring inline-flex min-h-10 items-center rounded-sm border border-[#ECE7DA] bg-white/90 px-3 text-sm font-semibold text-[#1F2937] hover:border-[#D8CDAF] xl:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            {isMobileMenuOpen ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-[#ECE7DA] bg-[#FFFDF8]/96 px-5 py-5 shadow-sm backdrop-blur-xl xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-5">
            <nav className="grid gap-1 text-sm font-semibold text-[#1F2937]">
              {visibleNavItems.map((item) => (
                <Link
                  className="rounded-sm px-1 py-2 transition duration-200 hover:text-[#6B7280]"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
            <div className="sm:hidden">
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <button
                  className="premium-focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#F5C84C] px-4 text-sm font-semibold text-[#1F2937] hover:bg-[#E7B93D]"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  type="button"
                >
                  <UserIcon />
                  {t("signIn")}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, userName, userRole } = useAuth();
  const { t } = useAppPreferences();
  const dashboardHref = userRole === "admin" ? "/admin" : "/buyer-dashboard";
  const dashboardLabel = userRole === "admin" ? t("adminPanel") : t("dashboard");

  return (
    <div className="relative">
      <button
        className="premium-focus-ring inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#ECE7DA] bg-white/90 px-4 text-sm font-semibold text-[#1F2937] hover:border-[#D8CDAF]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <UserIcon />
        {userName}
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-2 w-56 rounded-sm border border-[#ECE7DA] bg-white p-2 shadow-xl">
          <Link
            className="block rounded-sm px-3 py-2 text-sm font-semibold text-[#1F2937] transition hover:bg-[#FFFDF8]"
            href={dashboardHref}
            onClick={() => setIsOpen(false)}
          >
            {dashboardLabel}
          </Link>
          <button
            className="block w-full rounded-sm px-3 py-2 text-left text-sm font-semibold text-[#6B7280] transition hover:bg-[#FFFDF8] hover:text-[#1F2937]"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            type="button"
          >
            {t("logout")}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
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
      className={`min-h-9 rounded-sm px-3 text-xs font-semibold transition duration-200 ${
        active
          ? "bg-[#F5C84C] text-[#1F2937]"
          : "border border-[#ECE7DA] bg-white text-[#6B7280] hover:border-[#D8CDAF] hover:text-[#1F2937]"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
