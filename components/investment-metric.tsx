export function InvestmentMetric({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-[#ECE7DA] bg-[#FFFDF8] p-3">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#1F2937]">{value}</p>
    </div>
  );
}
