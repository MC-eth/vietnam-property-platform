type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47d32]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#16231d] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-8 text-[#5b645f] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
