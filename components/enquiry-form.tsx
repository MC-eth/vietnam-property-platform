"use client";

import {
  BUYER_TIMELINES,
  CITIES,
  FUNDING_SOURCES,
  INVESTMENT_GOALS,
  RENTAL_MANAGEMENT_OPTIONS,
} from "@/constants";
import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";

export function EnquiryForm() {
  const { currency, t, td } = useAppPreferences();
  const budgetRanges = [
    `${t("under")} ${formatCurrencyFromUsd(200000, currency)}`,
    `${formatCurrencyFromUsd(200000, currency)} - ${formatCurrencyFromUsd(400000, currency)}`,
    `${formatCurrencyFromUsd(400000, currency)} - ${formatCurrencyFromUsd(700000, currency)}`,
    `${formatCurrencyFromUsd(700000, currency)}+`,
  ];

  return (
    <form className="grid gap-5 rounded-sm border border-[#ECE7DA] bg-white p-5 shadow-sm sm:p-8">
      {/* Connect this form to a CRM, email workflow, or API route when the backend is ready. */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("fullName")} name="fullName" />
        <Field label={t("email")} name="email" type="email" />
        <Field label={t("phone")} name="phone" type="tel" />
        <Field label={t("countryOfResidence")} name="country" />
        <Select
          label={t("budget")}
          name="budget"
          options={budgetRanges}
        />
        <Select
          label={t("targetCity")}
          name="city"
          options={[...CITIES, "Both cities"].map(td)}
        />
        <Select
          label={t("investmentGoal")}
          name="goal"
          options={INVESTMENT_GOALS.map(td)}
        />
        <Select
          label={t("timelineToBuy")}
          name="timeline"
          options={BUYER_TIMELINES.map(td)}
        />
        <Select
          label={t("fundingSource")}
          name="fundingSource"
          options={FUNDING_SOURCES.map(td)}
        />
        <Select
          label={t("needRentalManagement")}
          name="rentalManagement"
          options={RENTAL_MANAGEMENT_OPTIONS.map(td)}
        />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
        {t("message")}
        <textarea
          className="min-h-32 rounded-sm border border-[#ECE7DA] bg-white px-3 py-3 font-normal outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
          name="message"
          placeholder={t("messagePlaceholder")}
        />
      </label>
      <button
        className="min-h-12 rounded-sm bg-[#F5C84C] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#E7B93D] sm:w-fit"
        type="button"
      >
        {t("bookInvestorConsultation")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
      {label}
      <input
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        name={name}
        type={type}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  const { t } = useAppPreferences();

  return (
    <label className="grid gap-2 text-sm font-semibold text-[#6B7280]">
      {label}
      <select
        className="min-h-11 rounded-sm border border-[#ECE7DA] bg-white px-3 font-normal outline-none focus:border-[#E7B93D] focus:ring-2 focus:ring-[#F5C84C]/15"
        name={name}
      >
        <option value="">{t("select")}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
