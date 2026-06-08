export type VietnamThesisIcon =
  | "TrendingUp"
  | "Building2"
  | "Route"
  | "Globe2"
  | "ShoppingBag"
  | "Ship";

export type VietnamThesisCard = {
  id: string;
  title: string;
  titleZh: string;
  body: string;
  bodyZh: string;
  primaryStat: string;
  primaryStatZh: string;
  delta?: string;
  deltaZh?: string;
  contextNote?: string;
  contextNoteZh?: string;
  icon: VietnamThesisIcon;
};

export const vietnamThesisCards: VietnamThesisCard[] = [
  {
    id: "economic-momentum",
    title: "Economic Momentum",
    titleZh: "經濟增長動力",
    body:
      "Vietnam continues to rank among Asia’s faster-growing economies, supported by manufacturing, domestic consumption and sustained investment activity.",
    bodyZh: "越南持續位列亞洲較高速增長的經濟體，增長動力來自製造業、內部消費及持續投資活動。",
    primaryStat: "2025 GDP Growth · 8.02%",
    primaryStatZh: "2025年 GDP 增長 · 8.02%",
    icon: "TrendingUp",
  },
  {
    id: "domestic-demand",
    title: "Domestic Demand",
    titleZh: "內部消費需求",
    body: "Rising consumer activity supports businesses, employment and broader demand across Vietnam’s major urban economies.",
    bodyZh: "消費活動增長支持企業、就業及越南主要城市經濟的廣泛需求。",
    primaryStat: "2025 Retail Sales Growth · 9.2% YoY",
    primaryStatZh: "2025年零售銷售增長 · 按年9.2%",
    icon: "ShoppingBag",
  },
  {
    id: "infrastructure-expansion",
    title: "Infrastructure-Led Expansion",
    titleZh: "基建帶動城市擴張",
    body:
      "Metro systems, ring roads, airports and new urban centres are reshaping connectivity and supporting the next phase of city development.",
    bodyZh: "地鐵、環城公路、機場及新城區正重塑交通網絡，並支持城市下一階段的發展。",
    primaryStat: "234 Projects · US$129.4B",
    primaryStatZh: "234個項目 · 1,294億美元",
    contextNote: "National programme, announced or commenced in late 2025.",
    contextNoteZh: "全國性項目計劃，於2025年底公布或啟動。",
    icon: "Route",
  },
  {
    id: "global-business-capital",
    title: "Global Business & Capital",
    titleZh: "國際企業及資本",
    body:
      "Vietnam continues to attract international manufacturers, regional businesses and foreign capital, supporting demand for offices, housing and professional services.",
    bodyZh: "越南持續吸引國際製造商、區域企業及海外資本，帶動辦公、住宅及專業服務需求。",
    primaryStat: "2025 FDI Inflows · US$27.6B",
    primaryStatZh: "2025年外資流入 · 276億美元",
    delta: "▲ 9.0% YoY",
    deltaZh: "▲ 按年9.0%",
    icon: "Globe2",
  },
  {
    id: "export-scale",
    title: "Export Scale",
    titleZh: "出口規模",
    body: "Vietnam’s manufacturing and export base continues to connect the economy with major international markets.",
    bodyZh: "越南的製造及出口基礎持續連接主要國際市場，支持其全球供應鏈角色。",
    primaryStat: "2025 Exports · US$475B",
    primaryStatZh: "2025年出口總額 · 4,750億美元",
    delta: "▲ 17.0% YoY",
    deltaZh: "▲ 按年17.0%",
    icon: "Ship",
  },
  {
    id: "urban-housing-demand",
    title: "Urban Housing Demand",
    titleZh: "城市住宅需求",
    body: "Apartment prices across major cities reflect continued pressure from urban housing demand, limited affordability and constrained supply.",
    bodyZh: "主要城市的公寓價格反映持續的城市住宅需求、置業負擔壓力及供應限制。",
    primaryStat: "US$3,028 / sqm",
    primaryStatZh: "每平方米3,028美元",
    delta: "▲ 5.6% in 2025",
    deltaZh: "▲ 2025年內上升5.6%",
    contextNote: "Major-city apartment average, data to September 2025.",
    contextNoteZh: "主要城市公寓平均價格，數據截至2025年9月。",
    icon: "Building2",
  },
];
