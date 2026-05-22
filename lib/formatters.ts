import type { CurrencyCode } from "@/types/currency";
import { HKD_PER_USD } from "@/constants";

type FormatCurrencyOptions = {
  locale?: string;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number,
  currency: CurrencyCode,
  options: FormatCurrencyOptions = {},
) {
  const formatted = new Intl.NumberFormat(options.locale ?? "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  })
    .format(value)
    .replace(/\s+/g, " ");

  return formatted;
}

export function formatUsd(value: number) {
  return formatCurrency(value, "USD");
}

export function formatHkd(value: number) {
  return formatCurrency(value, "HKD", { locale: "en-HK" });
}

export function convertUsdToCurrency(valueUsd: number, currency: CurrencyCode) {
  return currency === "HKD" ? valueUsd * HKD_PER_USD : valueUsd;
}

export function formatCurrencyFromUsd(valueUsd: number, currency: CurrencyCode) {
  return formatCurrency(convertUsdToCurrency(valueUsd, currency), currency, {
    locale: currency === "HKD" ? "en-HK" : "en-US",
  });
}

export function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}
