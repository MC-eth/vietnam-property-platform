type PageHeadingProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-8 text-[#6B7280] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
