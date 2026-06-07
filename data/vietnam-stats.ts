export type VietnamStatIcon = "trending-up" | "globe" | "ship" | "shopping-bag";

export type VietnamStat = {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  icon: VietnamStatIcon;
};

export const vietnamStats: VietnamStat[] = [
  {
    id: "gdp-growth",
    value: 8.02,
    prefix: "",
    suffix: "%",
    decimals: 2,
    label: "GDP Growth",
    icon: "trending-up",
  },
  {
    id: "fdi-inflows",
    value: 27.6,
    prefix: "US$",
    suffix: "B",
    decimals: 1,
    label: "FDI Inflows",
    icon: "globe",
  },
  {
    id: "exports",
    value: 475,
    prefix: "US$",
    suffix: "B",
    decimals: 0,
    label: "Exports",
    icon: "ship",
  },
  {
    id: "retail-growth",
    value: 9.2,
    prefix: "",
    suffix: "%",
    decimals: 1,
    label: "Retail Sales Growth",
    icon: "shopping-bag",
  },
];
