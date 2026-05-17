type LearnCardProps = {
  category: string;
  title: string;
  summary: string;
  readTime: string;
};

export function LearnCard({ category, title, summary, readTime }: LearnCardProps) {
  return (
    <article className="rounded-sm border border-[#e1dbd0] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a47d32]">
        {category}
      </p>
      <h2 className="mt-5 text-xl font-semibold leading-tight text-[#16231d]">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#5b645f]">{summary}</p>
      <p className="mt-5 text-sm font-semibold text-[#123c2b]">{readTime}</p>
    </article>
  );
}
