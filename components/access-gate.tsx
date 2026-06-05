"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth, type UserRole } from "@/hooks/use-auth";
import { useAppPreferences } from "@/context/app-preferences-context";

type AccessGateProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export function AccessGate({ allowedRoles, children }: AccessGateProps) {
  const { isLoggedIn, openLoginModal, userRole } = useAuth();
  const { t } = useAppPreferences();
  const canAccess = isLoggedIn && userRole && allowedRoles.includes(userRole);

  if (canAccess) {
    return <>{children}</>;
  }

  return (
    <main className="stone-surface px-5 py-20 sm:px-8 lg:py-28">
      <section className="mx-auto max-w-3xl rounded-sm border border-[#ECE7DA] bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
          {t("accessRestricted")}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1F2937] sm:text-4xl">
          {t("signInToContinue")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6B7280]">
          {t("accessRestrictedDescription")}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D]"
            onClick={() => openLoginModal()}
            type="button"
          >
            {t("signIn")}
          </button>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#ECE7DA] bg-white px-6 text-sm font-semibold text-[#1F2937] transition hover:border-[#F5C84C]"
            href="/properties"
          >
            {t("browseInvestmentCases")}
          </Link>
        </div>
      </section>
    </main>
  );
}
