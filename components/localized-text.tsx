"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import type { TranslationKey } from "@/constants/translations";

type LocalizedTextProps = {
  k: TranslationKey;
  replacements?: Record<string, string | number>;
};

export function T({ k, replacements }: LocalizedTextProps) {
  const { t } = useAppPreferences();

  return <>{t(k, replacements)}</>;
}

export function TD({ value }: { value: string }) {
  const { td } = useAppPreferences();

  return <>{td(value)}</>;
}

// Renders explicit bilingual content stored in data (English + Traditional Chinese),
// selecting by the active language. Use for project-specific copy that lives in data
// rather than the keyed translation dictionary.
export function LocalizedField({ en, zh }: { en: string; zh: string }) {
  const { language } = useAppPreferences();

  return <>{language === "zh-Hant" ? zh : en}</>;
}
