import type { CurrencyCode } from "@/types/currency";

type FormatCurrencyOptions = {
  locale?: string;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number,
  currency: CurrencyCode,
  options: FormatCurrencyOptions = {},
) {
  return new Intl.NumberFormat(options.locale ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(value);
}

export function formatUsd(value: number) {
  return formatCurrency(value, "USD");
}

export function formatHkd(value: number) {
  return formatCurrency(value, "HKD", { locale: "en-HK" });
}

export function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

