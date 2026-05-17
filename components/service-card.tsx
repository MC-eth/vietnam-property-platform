type ServiceCardProps = {
  title: string;
  description: string;
  marker: string;
};

export function ServiceCard({ title, description, marker }: ServiceCardProps) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#eef4ef] text-sm font-semibold text-[#123c2b]">
        {marker}
      </span>
      <h2 className="mt-6 text-xl font-semibold text-[#16231d]">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5b645f]">{description}</p>
    </article>
  );
}
