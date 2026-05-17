type DashboardCardProps = {
  title: string;
  value: string;
  detail: string;
};

export function DashboardCard({ title, value, detail }: DashboardCardProps) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-[#5b645f]">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-[#16231d]">{value}</p>
      <p className="mt-2 text-sm text-[#6d746f]">{detail}</p>
    </article>
  );
}
