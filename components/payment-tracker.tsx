"use client";

import { useAppPreferences } from "@/context/app-preferences-context";
import { formatCurrencyFromUsd } from "@/lib/formatters";
import type { DealPayment, DealPaymentStatus } from "@/types/deal";

type PaymentTrackerProps = {
  payments: DealPayment[];
};

const paymentStatusStyles: Record<DealPaymentStatus, string> = {
  paid: "bg-[#F5C84C] text-[#1F2937]",
  "under review": "bg-[#F5C84C] text-[#1F2937]",
  due: "bg-[#7a3126] text-white",
  upcoming: "bg-[#edf1f0] text-[#6B7280]",
};

export function PaymentTracker({ payments }: PaymentTrackerProps) {
  const { currency, t, td } = useAppPreferences();

  return (
    <article className="rounded-sm border border-[#ECE7DA] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7B93D]">
        {t("paymentTracker")}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F2937]">
        {t("paymentTrackerTitle")}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
        {t("paymentTrackerDescription")}
      </p>

      <div className="mt-6 grid gap-4">
        {payments.map((payment) => (
          <div
            className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-4"
            key={payment.label}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold text-[#1F2937]">{td(payment.label)}</p>
                <p className="mt-2 text-2xl font-semibold text-[#1F2937]">
                  {formatCurrencyFromUsd(payment.amountUsd, currency)}
                </p>
              </div>
              <span
                className={`w-fit rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${paymentStatusStyles[payment.status]}`}
              >
                {td(payment.status)}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
              <PaymentMeta label={t("dueDate")} value={td(payment.dueDate)} />
              <PaymentMeta
                label={t("receiptUploaded")}
                value={payment.receiptUploaded ? t("yes") : t("no")}
              />
              <PaymentMeta label={t("fxPaymentNote")} value={td(payment.note)} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function PaymentMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-1 leading-6 text-[#1F2937]">{value}</p>
    </div>
  );
}
