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
