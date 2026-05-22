"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/constants";
import {
  DEFAULT_LANGUAGE,
  type LanguageCode,
  translate,
  translateDisplay,
  type TranslationKey,
} from "@/constants/translations";
import type { CurrencyCode } from "@/types/currency";

type AppPreferencesContextValue = {
  language: LanguageCode;
  currency: CurrencyCode;
  setLanguage: (language: LanguageCode) => void;
  setCurrency: (currency: CurrencyCode) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
  td: (value: string) => string;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "vietinvest-language";
const CURRENCY_STORAGE_KEY = "vietinvest-currency";
const PREFERENCES_EVENT = "vietinvest-preferences-change";

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<LanguageCode>(
    subscribeToPreferenceChanges,
    getStoredLanguage,
    () => DEFAULT_LANGUAGE,
  );
  const currency = useSyncExternalStore<CurrencyCode>(
    subscribeToPreferenceChanges,
    getStoredCurrency,
    () => DEFAULT_CURRENCY,
  );

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      language,
      currency,
      setLanguage: (nextLanguage) => {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
        window.dispatchEvent(new Event(PREFERENCES_EVENT));
      },
      setCurrency: (nextCurrency) => {
        window.localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
        window.dispatchEvent(new Event(PREFERENCES_EVENT));
      },
      t: (key, replacements) => translate(language, key, replacements),
      td: (value) => translateDisplay(language, value),
    }),
    [currency, language],
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

function subscribeToPreferenceChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PREFERENCES_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PREFERENCES_EVENT, callback);
  };
}

function getStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return storedLanguage === "en" || storedLanguage === "zh-Hant"
    ? storedLanguage
    : DEFAULT_LANGUAGE;
}

function getStoredCurrency(): CurrencyCode {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;

  const storedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);

  return CURRENCIES.includes(storedCurrency as CurrencyCode)
    ? (storedCurrency as CurrencyCode)
    : DEFAULT_CURRENCY;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error("useAppPreferences must be used inside AppPreferencesProvider");
  }

  return context;
}
