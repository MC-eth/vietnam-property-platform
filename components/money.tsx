"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";

type MoneyProps = {
  usd: number;
  suffix?: string;
};

export function Money({ usd, suffix }: MoneyProps) {
  const { currency } = useAppPreferences();

  return (
    <>
      {formatCurrencyFromUsd(usd, currency)}
      {suffix ? suffix : null}
    </>
  );
}
