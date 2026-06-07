import { districtInsights } from "@/data/district-insights";
import { learnArticles, learnFaqs, learnTopics } from "@/data/learn-hub";
import { projects } from "@/data/projects";
import { formatUsd } from "@/lib/formatters";

export type UniversalSearchResultType = "district" | "residence" | "article" | "topic" | "faq";

export type UniversalSearchResult = {
  id: string;
  type: UniversalSearchResultType;
  title: string;
  subtitle?: string;
  keywords: string[];
  href: string;
  image?: string;
  metadata?: string;
  searchableText: string;
};

export type UniversalSearchGroupKey = "districts" | "residences" | "learn";

export type UniversalSearchGroups = Record<UniversalSearchGroupKey, UniversalSearchResult[]>;

const SEARCHABLE_INDEX = buildUniversalSearchIndex();

export function buildUniversalSearchIndex(): UniversalSearchResult[] {
  const districtResults: UniversalSearchResult[] = districtInsights.map((district) => {
    const keywords = [
      district.displayName,
      district.slug,
      district.city,
      district.districtContext,
      district.shortPositioning,
      district.urbanZoneDisplayName,
      district.basicInfo.positioning,
      district.basicInfo.districtRole,
      district.basicInfo.planningTheme,
      ...(district.aliases ?? []),
      ...district.basicInfo.suitableFor,
      ...district.basicInfo.buyerProfiles,
      ...getDistrictChineseKeywords(district.slug),
    ];

    return {
      id: `district:${district.slug}`,
      type: "district",
      title: district.displayName,
      subtitle: district.shortPositioning,
      keywords,
      href: `/districts/${district.slug}`,
      image: district.districtHeroVisualImage,
      metadata: district.city,
      searchableText: normaliseSearchText(keywords),
    };
  });

  const residenceResults: UniversalSearchResult[] = projects.flatMap((project) => {
    const startingPrice = Math.min(...project.availableUnits.map((unit) => unit.priceUsd));
    const projectKeywords = [
      project.projectName,
      project.slug,
      project.city,
      project.district,
      project.developer,
      project.projectType,
      project.completionStatus,
      project.description,
      ...project.targetBuyerTypes,
      ...project.locationHighlights,
      ...project.amenities,
      ...getResidenceChineseKeywords(project.slug, project.district),
    ];

    const projectResult: UniversalSearchResult = {
      id: `residence:${project.slug}`,
      type: "residence",
      title: project.projectName,
      subtitle: `${project.district} · ${project.city}`,
      metadata: `From ${formatUsd(startingPrice)}`,
      keywords: projectKeywords,
      href: `/properties/${project.slug}`,
      image: project.heroImage,
      searchableText: normaliseSearchText(projectKeywords),
    };

    const unitResults: UniversalSearchResult[] = project.availableUnits.slice(0, 2).map((unit) => {
      const unitTitle = unit.unitName
        ? `${project.projectName} · ${unit.unitName}`
        : `${project.projectName} · ${unit.unitType}`;
      const href = unit.slug
        ? `/properties/${project.slug}/units/${unit.slug}`
        : `/properties/${project.slug}`;
      const keywords = [
        unitTitle,
        project.projectName,
        project.district,
        project.city,
        unit.unitType,
        unit.unitName ?? "",
        unit.bestFor,
        unit.viewType ?? "",
        unit.floorLevel ?? "",
        ...(unit.unitHighlights ?? []),
        ...getResidenceChineseKeywords(project.slug, project.district),
      ];

      return {
        id: `unit:${project.slug}:${unit.id}`,
        type: "residence",
        title: unitTitle,
        subtitle: `${project.district} · ${project.city}`,
        metadata: formatUsd(unit.priceUsd),
        keywords,
        href,
        image: unit.heroImage ?? project.heroImage,
        searchableText: normaliseSearchText(keywords),
      };
    });

    return [projectResult, ...unitResults];
  });

  const topicResults: UniversalSearchResult[] = learnTopics.map((topic) => {
    const keywords = [topic.title, topic.description, topic.slug, ...topic.keywords];

    return {
      id: `topic:${topic.slug}`,
      type: "topic",
      title: topic.title,
      subtitle: topic.description,
      metadata: topic.count,
      keywords,
      href: `/learn?topic=${topic.slug}`,
      searchableText: normaliseSearchText(keywords),
    };
  });

  const articleResults: UniversalSearchResult[] = learnArticles.map((article) => {
    const slug = slugify(article.title);
    const keywords = [
      article.title,
      article.category,
      article.excerpt,
      article.readTime,
      ...(article.keywords ?? []),
    ];

    return {
      id: `article:${slug}`,
      type: "article",
      title: article.title,
      subtitle: article.excerpt,
      metadata: `${article.category} · ${article.readTime}`,
      keywords,
      href: `/learn?article=${slug}`,
      image: article.image,
      searchableText: normaliseSearchText(keywords),
    };
  });

  const faqResults: UniversalSearchResult[] = learnFaqs.map((faq) => {
    const slug = slugify(faq.question);
    const keywords = [faq.question, faq.answer, ...(faq.keywords ?? [])];

    return {
      id: `faq:${slug}`,
      type: "faq",
      title: faq.question,
      subtitle: faq.answer,
      metadata: "FAQ",
      keywords,
      href: `/learn#faq`,
      searchableText: normaliseSearchText(keywords),
    };
  });

  return [
    ...districtResults,
    ...residenceResults,
    ...topicResults,
    ...articleResults,
    ...faqResults,
  ];
}

export function searchUniversalContent(query: string, limit = 24) {
  const normalisedQuery = normaliseSearchText([query]);

  if (!normalisedQuery) {
    return [];
  }

  const queryTerms = normalisedQuery.split(" ").filter(Boolean);

  return SEARCHABLE_INDEX.map((result) => ({
    result,
    score: scoreResult(result.searchableText, normalisedQuery, queryTerms),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .slice(0, limit)
    .map(({ result }) => result);
}

export function groupUniversalSearchResults(results: UniversalSearchResult[]): UniversalSearchGroups {
  return results.reduce<UniversalSearchGroups>(
    (groups, result) => {
      groups[getSearchGroup(result.type)].push(result);
      return groups;
    },
    { districts: [], residences: [], learn: [] },
  );
}

export function getSearchGroup(type: UniversalSearchResultType): UniversalSearchGroupKey {
  if (type === "district") return "districts";
  if (type === "residence") return "residences";
  return "learn";
}

export function normaliseSearchText(values: string[]) {
  return values
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function scoreResult(searchableText: string, query: string, queryTerms: string[]) {
  if (!searchableText) return 0;
  if (searchableText.includes(query)) return 100 + query.length;

  const matchedTerms = queryTerms.filter((term) => searchableText.includes(term));
  if (matchedTerms.length === 0) return 0;

  return matchedTerms.length * 20 + matchedTerms.join("").length;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDistrictChineseKeywords(slug: string) {
  const keywords: Record<string, string[]> = {
    "thu-thiem": ["守添", "第2郡", "河畔金融區", "區域分析"],
    "thao-dien": ["草田", "第2郡", "守德市", "外籍生活圈"],
    "district-1-cbd": ["第一郡", "CBD", "市中心", "核心地段"],
    "district-7": ["第七郡", "第7郡", "富美興", "家庭社區"],
    "binh-thanh": ["平盛區", "地標81", "中心相鄰"],
    "thu-duc-district-9": ["守德市", "第9郡", "東部區"],
  };

  return keywords[slug] ?? [];
}

function getResidenceChineseKeywords(slug: string, district: string) {
  const keywords: Record<string, string[]> = {
    "empire-city": ["守添", "住宅項目", "河景"],
    "the-metropole-thu-thiem": ["守添", "The Metropole", "住宅項目"],
    "masteri-thao-dien": ["草田", "Thao Dien", "住宅項目"],
    "vinhomes-grand-park": ["守德市", "第9郡", "住宅項目"],
  };

  return [...(keywords[slug] ?? []), district];
}
