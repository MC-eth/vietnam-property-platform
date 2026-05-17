export function InvestmentMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-[#e7e1d7] bg-[#fbfaf7] p-3">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#7a817c]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#16231d]">{value}</p>
    </div>
  );
}
