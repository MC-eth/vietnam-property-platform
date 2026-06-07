import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T, TD } from "@/components/localized-text";
import { UniversalSearch } from "@/components/universal-search";
import {
  groupUniversalSearchResults,
  searchUniversalContent,
  type UniversalSearchGroupKey,
  type UniversalSearchResult,
} from "@/lib/universal-search";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

const GROUPS: Array<{ key: UniversalSearchGroupKey; labelKey: "districts" | "residences" | "learn" }> = [
  { key: "districts", labelKey: "districts" },
  { key: "residences", labelKey: "residences" },
  { key: "learn", labelKey: "learn" },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchUniversalContent(query, 60) : [];
  const groupedResults = groupUniversalSearchResults(results);
  const hasResults = results.length > 0;

  return (
    <>
      <Header />
      <main className="bg-[#FFFDF8]">
        <section className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-18">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,200,76,0.18),transparent_32%),linear-gradient(180deg,#FFF8E8,#FFFDF8)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9851D]">
              <T k="search" />
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1F2937] sm:text-5xl">
              {query ? (
                <>
                  <T k="searchResultsFor" /> &ldquo;{query}&rdquo;
                </>
              ) : (
                <TD value="Search districts, residences or guides" />
              )}
            </h1>
            <div className="mt-8">
              <UniversalSearch />
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            {!query ? (
              <EmptySearchState />
            ) : hasResults ? (
              <div className="grid gap-6">
                {GROUPS.map((group) => (
                  <SearchSection
                    key={group.key}
                    labelKey={group.labelKey}
                    query={query}
                    results={groupedResults[group.key]}
                  />
                ))}
              </div>
            ) : (
              <EmptySearchState />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SearchSection({
  labelKey,
  query,
  results,
}: {
  labelKey: "districts" | "residences" | "learn";
  query: string;
  results: UniversalSearchResult[];
}) {
  return (
    <section className="rounded-[28px] border border-[#ECE7DA] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#1F2937]">
            <T k={labelKey} />
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        </div>
        {results.length > 3 ? (
          <Link
            className="premium-focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-[#D8CDAF] px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:border-[#F5C84C]"
            href={`/search?q=${encodeURIComponent(query)}`}
          >
            <TD value="View all results" />
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {results.slice(0, 6).map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl bg-[#FFFDF8] px-4 py-5 text-sm text-[#6B7280]">
          <TD value="No matching results found." />
        </p>
      )}
    </section>
  );
}

function ResultCard({ result }: { result: UniversalSearchResult }) {
  return (
    <Link
      className="group grid min-h-32 rounded-2xl border border-[#ECE7DA] bg-[#FFFDF8] p-4 transition hover:-translate-y-0.5 hover:border-[#F5C84C] hover:bg-white hover:shadow-[0_16px_40px_rgba(31,41,55,0.08)]"
      href={result.href}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A9851D]">
        <TD value={getTypeLabel(result.type)} />
      </span>
      <span className="mt-3 block text-base font-semibold leading-6 text-[#1F2937]">
        <TD value={result.title} />
      </span>
      <span className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7280]">
        <TD value={result.metadata ?? result.subtitle ?? ""} />
      </span>
    </Link>
  );
}

function EmptySearchState() {
  return (
    <div className="rounded-[28px] border border-[#ECE7DA] bg-white p-8 text-center shadow-sm">
      <p className="text-xl font-semibold text-[#1F2937]">
        <TD value="No matching results found." />
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B7280]">
        <TD value="Try searching by district, residence name or buying topic." />
      </p>
    </div>
  );
}

function getTypeLabel(type: UniversalSearchResult["type"]) {
  if (type === "district") return "District result";
  if (type === "residence") return "Residence result";
  if (type === "faq") return "FAQ";
  if (type === "topic") return "Learning topic";
  return "Article";
}
