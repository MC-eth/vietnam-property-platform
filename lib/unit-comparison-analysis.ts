import {
  estimateUnitGrossYieldPercent,
  estimateUnitNetYieldPercent,
} from "@/lib/rental-yield";
import type { ProjectUnit } from "@/types/project";

// Deterministic, data-driven unit-comparison engine.
//
// This produces the "AI Unit Analysis" copy by comparing a unit against the other
// currently selected units using existing structured fields and the SAME numeric
// yield helpers the interface uses. It is NOT a live large-language model — output
// is rule-based and stable for a given selection (no randomness). It never claims
// guaranteed returns, confirmed demand, or resale/liquidity advantages, and never
// infers liquidity from price or size.

type Lang = "en" | "zh-Hant";

// Meaningful-difference thresholds (guardrails only — never displayed). Below the
// relevant threshold, two units are treated as broadly comparable on that metric so
// the engine does not manufacture a "best" unit from an immaterial difference.
const THRESHOLDS = {
  yieldPp: 0.15, // net / gross yield, in percentage points
  pricePct: 0.03, // entry price, relative
  pricePerSqmPct: 0.03, // price per sqm, relative
  sizePct: 0.05, // internal area, relative
  rentPct: 0.05, // estimated gross rent, relative
};

type Metric = {
  key: "netYield" | "grossYield" | "grossRent" | "price" | "pricePerSqm" | "size";
  family: "yield" | "income" | "price" | "size";
  priority: number; // deterministic tiebreaker (lower = preferred)
  margin: number; // relative margin vs the closest competitor (for ranking)
  best: boolean; // strictly best AND above threshold
  worst: boolean; // strictly worst AND above threshold (for trade-offs)
};

function pricePerSqm(unit: ProjectUnit) {
  return unit.pricePerSqmUsd ?? (unit.sizeSqm > 0 ? unit.priceUsd / unit.sizeSqm : 0);
}

function evaluate(
  unit: ProjectUnit,
  units: ProjectUnit[],
  get: (u: ProjectUnit) => number,
  direction: "higher" | "lower",
  threshold: number,
  mode: "pp" | "pct",
): { best: boolean; worst: boolean; margin: number } {
  const peers = units.filter((u) => u !== unit);
  if (peers.length === 0) return { best: false, worst: false, margin: 0 };

  const value = get(unit);
  const peerValues = peers.map(get);
  const maxPeer = Math.max(...peerValues);
  const minPeer = Math.min(...peerValues);
  const base = Math.abs(maxPeer) || 1;

  const betterPeer = direction === "higher" ? maxPeer : minPeer;
  const worsePeer = direction === "higher" ? minPeer : maxPeer;

  const isStrictBest = direction === "higher" ? value > maxPeer : value < minPeer;
  const isStrictWorst = direction === "higher" ? value < minPeer : value > maxPeer;

  const bestGap = Math.abs(value - betterPeer);
  const worstGap = Math.abs(value - worsePeer);
  const bestPasses = mode === "pp" ? bestGap >= threshold : bestGap / base >= threshold;
  const worstPasses = mode === "pp" ? worstGap >= threshold : worstGap / base >= threshold;

  return {
    best: isStrictBest && bestPasses,
    worst: isStrictWorst && worstPasses,
    margin: bestGap / base,
  };
}

function buildMetrics(unit: ProjectUnit, units: ProjectUnit[]): Metric[] {
  const net = evaluate(unit, units, estimateUnitNetYieldPercent, "higher", THRESHOLDS.yieldPp, "pp");
  const gross = evaluate(unit, units, estimateUnitGrossYieldPercent, "higher", THRESHOLDS.yieldPp, "pp");
  const rent = evaluate(unit, units, (u) => u.estimatedMonthlyRentUsd, "higher", THRESHOLDS.rentPct, "pct");
  const price = evaluate(unit, units, (u) => u.priceUsd, "lower", THRESHOLDS.pricePct, "pct");
  const ppsqm = evaluate(unit, units, pricePerSqm, "lower", THRESHOLDS.pricePerSqmPct, "pct");
  const size = evaluate(unit, units, (u) => u.sizeSqm, "higher", THRESHOLDS.sizePct, "pct");

  return [
    { key: "netYield", family: "yield", priority: 1, ...net },
    { key: "price", family: "price", priority: 2, ...price },
    { key: "size", family: "size", priority: 3, ...size },
    { key: "grossRent", family: "income", priority: 4, ...rent },
    { key: "pricePerSqm", family: "price", priority: 5, ...ppsqm },
    { key: "grossYield", family: "yield", priority: 6, ...gross },
  ];
}

// ---- bilingual phrase fragments -------------------------------------------------

const STRENGTH_CLAUSE: Record<Metric["key"], Record<Lang, string>> = {
  netYield: { en: "the strongest estimated net yield", "zh-Hant": "最高的預計淨租金回報" },
  grossYield: { en: "the strongest estimated gross yield", "zh-Hant": "最高的預計毛租金回報" },
  grossRent: { en: "the highest estimated gross rent", "zh-Hant": "最高的預計租金收入" },
  price: { en: "the lowest entry cost", "zh-Hant": "最低的入場成本" },
  pricePerSqm: { en: "the lowest price per sqm", "zh-Hant": "最低的每平方米價格" },
  size: { en: "the largest internal area", "zh-Hant": "最大的室內面積" },
};

function hasPremiumView(unit: ProjectUnit) {
  const view = (unit.viewType ?? "").toLowerCase();
  return view.includes("river") || view.includes("lake");
}

function isFurnished(unit: ProjectUnit) {
  return (unit.furnishingStatus ?? "").toLowerCase().startsWith("furnished");
}

function strengthSentence(keys: string[], lang: Lang) {
  if (lang === "zh-Hant") {
    const joined = keys.length > 1 ? `${keys[0]}，並具備${keys[1]}` : keys[0];
    return `在已選選項中，此單位提供${joined}。`;
  }
  const joined = keys.length > 1 ? `${keys[0]} and ${keys[1]}` : keys[0];
  return `This unit offers ${joined} among the selected options.`;
}

function tradeoffSentence(
  metrics: Metric[],
  topFamily: Metric["family"] | null,
  lang: Lang,
) {
  const find = (key: Metric["key"]) => metrics.find((m) => m.key === key);
  const highPrice = find("price")?.worst; // materially most expensive
  const lowNet = find("netYield")?.worst; // materially lowest net yield
  const smallSize = find("size")?.worst; // materially smallest

  if (highPrice) {
    return lang === "zh-Hant"
      ? "其較高入場價或適合重視長線質素多於最低投資門檻的買家。"
      : "Its higher entry price may suit investors prioritising long-term quality over the lowest ticket size.";
  }
  if (lowNet) {
    return lang === "zh-Hant"
      ? "其較低的預計淨租金回報或適合重視地段或生活方式多於收入效率的買家。"
      : "Its lower estimated net yield may suit buyers prioritising location or lifestyle over income efficiency.";
  }
  if (smallSize) {
    return lang === "zh-Hant"
      ? "其較精緻的戶型或適合重視較低入場成本及初期投入的買家。"
      : "Its more compact layout may suit buyers prioritising a smaller ticket size and lower entry cost.";
  }

  // No material weakness: map an investor profile to the strongest advantage family.
  switch (topFamily) {
    case "yield":
    case "income":
      return lang === "zh-Hant"
        ? "或適合重視收入效率的投資者。"
        : "It may suit investors prioritising income efficiency.";
    case "price":
      return lang === "zh-Hant"
        ? "或適合重視入場成本及較低初期投入的買家。"
        : "It may suit buyers prioritising entry cost and a smaller initial outlay.";
    case "size":
      return lang === "zh-Hant"
        ? "其較大戶型或適合家庭及長租租客。"
        : "Its larger layout may suit families and longer-stay tenants.";
    default:
      return lang === "zh-Hant"
        ? "合適程度取決於買家的個別優先考慮。"
        : "The better fit depends on the buyer's individual priorities.";
  }
}

function balancedFallback(lang: Lang) {
  return lang === "zh-Hant"
    ? "此單位在已選選項中整體定位較為均衡，合適程度取決於買家對價格、空間、景觀及收入定位的取捨。"
    : "This unit has a broadly balanced profile among the selected options. The better fit depends on the buyer's priorities for price, space, view and income positioning.";
}

/**
 * Generate a concise (max two sentences) comparison-aware analysis for `unit`
 * relative to the other `selectedUnits`. Deterministic and stable for a given
 * selection; bilingual; never asserts guaranteed or resale/liquidity outcomes.
 */
export function generateUnitComparisonAnalysis(
  unit: ProjectUnit,
  selectedUnits: ProjectUnit[],
  language: Lang,
): string {
  const units = selectedUnits.filter((u) => u !== unit);
  if (units.length === 0) return balancedFallback(language);

  const metrics = buildMetrics(unit, selectedUnits);

  // Step 1-2: material numeric advantages, strongest first, deduped by family.
  const winners = metrics
    .filter((m) => m.best)
    .sort((a, b) => (b.margin - a.margin) || (a.priority - b.priority));

  const chosen: Metric[] = [];
  for (const metric of winners) {
    if (chosen.some((c) => c.family === metric.family)) continue;
    chosen.push(metric);
    if (chosen.length === 2) break;
  }

  let strengthClauses = chosen.map((m) => STRENGTH_CLAUSE[m.key][language]);
  const topFamily: Metric["family"] | null = chosen[0]?.family ?? null;

  // Step 4: qualitative distinction only when no material numeric advantage exists.
  if (strengthClauses.length === 0) {
    const peers = units;
    if (hasPremiumView(unit) && !peers.some(hasPremiumView)) {
      strengthClauses = [
        language === "zh-Hant"
          ? `較強的景觀定位（${unit.viewType}）`
          : `stronger view positioning (${unit.viewType})`,
      ];
      const s2 =
        language === "zh-Hant"
          ? "其優質景觀或適合重視生活吸引力的買家。"
          : "Its premium view may suit buyers prioritising lifestyle appeal.";
      return `${strengthSentence(strengthClauses, language)}${language === "zh-Hant" ? "" : " "}${s2}`;
    }
    if (isFurnished(unit) && !peers.some(isFurnished)) {
      strengthClauses = [
        language === "zh-Hant" ? "較高的裝修完備程度" : "stronger furnishing readiness",
      ];
      const s2 =
        language === "zh-Hant"
          ? "或適合希望盡快出租的買家。"
          : "It may suit buyers seeking a quicker path to leasing.";
      return `${strengthSentence(strengthClauses, language)}${language === "zh-Hant" ? "" : " "}${s2}`;
    }
    // Step 5: no material distinction at all.
    return balancedFallback(language);
  }

  const s1 = strengthSentence(strengthClauses, language);
  const s2 = tradeoffSentence(metrics, topFamily, language);

  return language === "zh-Hant" ? `${s1}${s2}` : `${s1} ${s2}`;
}
