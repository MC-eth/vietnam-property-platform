"use client";

import Link from "next/link";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { TranslationKey } from "@/constants/translations";

const footerLinks = [
  {
    groupKey: "platform",
    links: [
      { href: "/properties", labelKey: "browseProperties" },
      { href: "/districts", labelKey: "districtInsights" },
      { href: "/how-it-works", labelKey: "howItWorks" },
      { href: "/services", labelKey: "navigationServices" },
      { href: "/learn", labelKey: "learn" },
      { href: "/buyer-dashboard", labelKey: "buyerDashboard" },
      { href: "/enquiry", labelKey: "buyerEnquiry" },
    ],
  },
  {
    groupKey: "markets",
    links: [
      { href: "/properties", labelKey: "hoChiMinhCity" },
      { href: "/properties", labelKey: "hanoi" },
      { href: "/owner-portal", labelKey: "ownerPortal" },
    ],
  },
  {
    groupKey: "internal",
    links: [
      { href: "/admin", labelKey: "adminDashboard" },
      { href: "/services", labelKey: "agentMatching" },
      { href: "/services", labelKey: "rentalManagement" },
    ],
  },
] as const satisfies readonly {
  groupKey: TranslationKey;
  links: readonly { href: string; labelKey: TranslationKey }[];
}[];

export function Footer() {
  const { t } = useAppPreferences();

  return (
    <footer className="border-t border-[#ECE7DA] bg-[#FFFDF8] px-5 py-12 text-[#1F2937] sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="VietInvest home">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F5C84C] text-sm font-semibold text-[#1F2937]">
              VI
            </span>
            <span className="text-lg font-semibold">VietInvest Property</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#6B7280]">
            {t("footerOverview")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map(({ groupKey, links }) => (
            <div key={groupKey}>
              <h2 className="text-sm font-semibold text-[#1F2937]">{t(groupKey)}</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#6B7280]">
                {links.map((link) => (
                  <li key={link.labelKey}>
                    <Link className="transition hover:text-[#1F2937]" href={link.href}>
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#ECE7DA] pt-6 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
        <p>{t("footerRights")}</p>
        <p>{t("footerMockNotice")}</p>
      </div>
      <div className="mx-auto mt-6 max-w-7xl border-t border-[#ECE7DA] pt-6">
        <p className="max-w-5xl text-xs leading-6 text-[#6B7280]">
          {t("legalDisclaimer")}
        </p>
        <Link
          className="mt-3 inline-flex text-xs font-semibold text-[#1F2937] transition hover:text-[#E7B93D]"
          href="/disclaimer"
        >
          {t("fullDisclaimer")}
        </Link>
      </div>
    </footer>
  );
}
