"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useAppPreferences } from "@/context/app-preferences-context";
import type { TranslationKey } from "@/constants/translations";

export type UserRole = "buyer" | "admin";

type AuthContextValue = {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  userName: string;
  login: (role: UserRole) => void;
  logout: () => void;
  openLoginModal: (message?: TranslationKey) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "vietinvest-mock-auth";
const AUTH_EVENT = "vietinvest-auth-change";

type StoredAuth = {
  isLoggedIn: boolean;
  userRole: UserRole | null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState<TranslationKey | null>(null);
  const storedAuthValue = useSyncExternalStore(
    subscribeToAuthChanges,
    getStoredAuthValue,
    () => "",
  );
  const auth = useMemo(() => parseStoredAuth(storedAuthValue), [storedAuthValue]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: auth.isLoggedIn,
      userRole: auth.userRole,
      userName: auth.userRole === "admin" ? "Admin" : "Michael Chan",
      login: (role) => {
        setStoredAuth({ isLoggedIn: true, userRole: role });
        setIsLoginOpen(false);
        setLoginMessage(null);
      },
      logout: () => {
        clearStoredAuth();
      },
      openLoginModal: (message) => {
        setLoginMessage(message ?? null);
        setIsLoginOpen(true);
      },
    }),
    [auth.isLoggedIn, auth.userRole],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isLoginOpen ? (
        <MockLoginModal
          message={loginMessage}
          onClose={() => {
            setIsLoginOpen(false);
            setLoginMessage(null);
          }}
        />
      ) : null}
    </AuthContext.Provider>
  );
}

function MockLoginModal({
  message,
  onClose,
}: {
  message: TranslationKey | null;
  onClose: () => void;
}) {
  const { t } = useAppPreferences();
  const { login } = useAuth();

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1F2937]/35 px-5 backdrop-blur-sm"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
              {t("mockLogin")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">
              {t("selectRole")}
            </h2>
          </div>
          <button
            aria-label={t("close")}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#ECE7DA] text-[#6B7280] transition hover:text-[#1F2937]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        {message ? (
          <p className="mt-4 rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] px-4 py-3 text-sm font-semibold leading-6 text-[#1F2937]">
            {t(message)}
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-[#6B7280]">{t("mockLoginDescription")}</p>

        <div className="mt-6 grid gap-3">
          <RoleButton
            description={t("buyerRoleDescription")}
            label={t("buyer")}
            onClick={() => login("buyer")}
          />
          <RoleButton
            description={t("adminRoleDescription")}
            label={t("admin")}
            onClick={() => login("admin")}
          />
          <button
            className="min-h-16 rounded-sm border border-dashed border-[#ECE7DA] bg-[#FFFDF8] px-4 text-left opacity-70"
            disabled
            type="button"
          >
            <span className="block text-sm font-semibold text-[#1F2937]">{t("advisor")}</span>
            <span className="mt-1 block text-xs text-[#6B7280]">{t("comingSoon")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleButton({
  description,
  label,
  onClick,
}: {
  description: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="min-h-16 rounded-sm border border-[#ECE7DA] bg-white px-4 text-left transition hover:border-[#F5C84C] hover:bg-[#FFFDF8]"
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm font-semibold text-[#1F2937]">{label}</span>
      <span className="mt-1 block text-xs leading-5 text-[#6B7280]">{description}</span>
    </button>
  );
}

function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getStoredAuthValue() {
  if (typeof window === "undefined") return "";

  return window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "";
}

function parseStoredAuth(storedAuth: string): StoredAuth {
  if (!storedAuth) return { isLoggedIn: false, userRole: null };

  try {
    const parsed = JSON.parse(storedAuth) as StoredAuth;
    const userRole = parsed.userRole === "buyer" || parsed.userRole === "admin"
      ? parsed.userRole
      : null;

    return {
      isLoggedIn: Boolean(parsed.isLoggedIn && userRole),
      userRole,
    };
  } catch {
    return { isLoggedIn: false, userRole: null };
  }
}

function setStoredAuth(auth: StoredAuth) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function clearStoredAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
