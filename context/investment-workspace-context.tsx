"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { TranslationKey } from "@/constants/translations";

type StoredWorkspace = {
  savedResidenceIds: string[];
  savedUnitKeys: string[];
  comparedProjectIds: string[];
  comparedUnitKeys: string[];
};

type InvestmentWorkspaceValue = StoredWorkspace & {
  toggleSavedResidence: (residenceId: string) => void;
  toggleSavedUnit: (projectSlug: string, unitId: string) => void;
  toggleComparedProject: (projectId: string) => void;
  toggleComparedUnit: (projectSlug: string, unitId: string) => void;
  removeComparedProject: (projectId: string) => void;
  clearComparedProjects: () => void;
  removeComparedUnit: (projectSlug: string, unitId: string) => void;
  clearComparedUnits: () => void;
};

const WORKSPACE_STORAGE_KEY = "vietinvest-investment-workspace";
const WORKSPACE_EVENT = "vietinvest-workspace-change";
const MAX_COMPARE_ITEMS = 3;
const emptyWorkspace: StoredWorkspace = {
  savedResidenceIds: [],
  savedUnitKeys: [],
  comparedProjectIds: [],
  comparedUnitKeys: [],
};

const InvestmentWorkspaceContext = createContext<InvestmentWorkspaceValue | undefined>(undefined);

export function InvestmentWorkspaceProvider({ children }: { children: ReactNode }) {
  const { openLoginModal, isLoggedIn } = useAuth();
  const { t } = useAppPreferences();
  const [notice, setNotice] = useState<TranslationKey | null>(null);
  const noticeTimer = useRef<number | null>(null);
  const storedWorkspaceValue = useSyncExternalStore(
    subscribeToWorkspaceChanges,
    getStoredWorkspaceValue,
    () => "",
  );
  const workspace = useMemo(
    () => parseStoredWorkspace(storedWorkspaceValue),
    [storedWorkspaceValue],
  );

  useEffect(() => {
    return () => {
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  const showNotice = useCallback((key: TranslationKey) => {
    setNotice(key);

    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2800);
  }, []);

  const updateWorkspace = useCallback(
    (update: (current: StoredWorkspace) => StoredWorkspace) => {
      setStoredWorkspace(update(parseStoredWorkspace(getStoredWorkspaceValue())));
    },
    [],
  );

  const value = useMemo<InvestmentWorkspaceValue>(
    () => ({
      ...workspace,
      toggleSavedResidence: (residenceId) => {
        if (!isLoggedIn) {
          openLoginModal("signInToSaveResidencesUnits");
          return;
        }

        updateWorkspace((current) => ({
          ...current,
          savedResidenceIds: toggleValue(current.savedResidenceIds, residenceId),
        }));
      },
      toggleSavedUnit: (projectSlug, unitId) => {
        if (!isLoggedIn) {
          openLoginModal("signInToSaveResidencesUnits");
          return;
        }

        const key = getUnitWorkspaceKey(projectSlug, unitId);
        updateWorkspace((current) => ({
          ...current,
          savedUnitKeys: toggleValue(current.savedUnitKeys, key),
        }));
      },
      toggleComparedProject: (projectId) => {
        updateWorkspace((current) => {
          if (!current.comparedProjectIds.includes(projectId) &&
              current.comparedProjectIds.length >= MAX_COMPARE_ITEMS) {
            showNotice("compareProjectLimitReached");
            return current;
          }

          return {
            ...current,
            comparedProjectIds: toggleValue(current.comparedProjectIds, projectId),
          };
        });
      },
      toggleComparedUnit: (projectSlug, unitId) => {
        const key = getUnitWorkspaceKey(projectSlug, unitId);

        updateWorkspace((current) => {
          if (!current.comparedUnitKeys.includes(key) &&
              current.comparedUnitKeys.length >= MAX_COMPARE_ITEMS) {
            showNotice("compareUnitLimitReached");
            return current;
          }

          return {
            ...current,
            comparedUnitKeys: toggleValue(current.comparedUnitKeys, key),
          };
        });
      },
      removeComparedProject: (projectId) => {
        updateWorkspace((current) => ({
          ...current,
          comparedProjectIds: current.comparedProjectIds.filter((id) => id !== projectId),
        }));
      },
      clearComparedProjects: () => {
        updateWorkspace((current) => ({
          ...current,
          comparedProjectIds: [],
        }));
      },
      removeComparedUnit: (projectSlug, unitId) => {
        const key = getUnitWorkspaceKey(projectSlug, unitId);
        updateWorkspace((current) => ({
          ...current,
          comparedUnitKeys: current.comparedUnitKeys.filter((item) => item !== key),
        }));
      },
      clearComparedUnits: () => {
        updateWorkspace((current) => ({
          ...current,
          comparedUnitKeys: [],
        }));
      },
    }),
    [isLoggedIn, openLoginModal, showNotice, updateWorkspace, workspace],
  );

  return (
    <InvestmentWorkspaceContext.Provider value={value}>
      {children}
      {notice ? (
        <div
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-[110] -translate-x-1/2 rounded-sm border border-[#D8CDAF] bg-white px-4 py-3 text-sm font-semibold text-[#1F2937] shadow-xl"
          role="status"
        >
          {t(notice)}
        </div>
      ) : null}
    </InvestmentWorkspaceContext.Provider>
  );
}

export function useInvestmentWorkspace() {
  const context = useContext(InvestmentWorkspaceContext);

  if (!context) {
    throw new Error("useInvestmentWorkspace must be used inside InvestmentWorkspaceProvider");
  }

  return context;
}

export function getUnitWorkspaceKey(projectSlug: string, unitId: string) {
  return `${projectSlug}:${unitId}`;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function subscribeToWorkspaceChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WORKSPACE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WORKSPACE_EVENT, callback);
  };
}

function getStoredWorkspaceValue() {
  if (typeof window === "undefined") return "";

  return window.localStorage.getItem(WORKSPACE_STORAGE_KEY) ?? "";
}

function parseStoredWorkspace(storedWorkspace: string): StoredWorkspace {
  if (!storedWorkspace) return emptyWorkspace;

  try {
    const parsed = JSON.parse(storedWorkspace) as Partial<StoredWorkspace>;

    return {
      savedResidenceIds: getStringArray(parsed.savedResidenceIds),
      savedUnitKeys: getStringArray(parsed.savedUnitKeys),
      comparedProjectIds: getStringArray(parsed.comparedProjectIds).slice(0, MAX_COMPARE_ITEMS),
      comparedUnitKeys: getStringArray(parsed.comparedUnitKeys).slice(0, MAX_COMPARE_ITEMS),
    };
  } catch {
    return emptyWorkspace;
  }
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function setStoredWorkspace(workspace: StoredWorkspace) {
  window.localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
  window.dispatchEvent(new Event(WORKSPACE_EVENT));
}
