export type DistrictPriceHistoryPoint = {
  year: number;
  pricePerSqmUsd: number;
};

export type DistrictPriceHistory = {
  districtSlug: string;
  city: string;
  priceHistory: DistrictPriceHistoryPoint[];
};

export const districtPriceHistories: DistrictPriceHistory[] = [
  {
    districtSlug: "thu-thiem",
    city: "Ho Chi Minh City",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 3200 },
      { year: 2017, pricePerSqmUsd: 3500 },
      { year: 2018, pricePerSqmUsd: 3900 },
      { year: 2019, pricePerSqmUsd: 4300 },
      { year: 2020, pricePerSqmUsd: 4500 },
      { year: 2021, pricePerSqmUsd: 4700 },
      { year: 2022, pricePerSqmUsd: 5200 },
      { year: 2023, pricePerSqmUsd: 5400 },
      { year: 2024, pricePerSqmUsd: 5650 },
      { year: 2025, pricePerSqmUsd: 5900 },
      { year: 2026, pricePerSqmUsd: 6100 },
    ],
  },
  {
    districtSlug: "thao-dien-district-2",
    city: "Ho Chi Minh City",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 2500 },
      { year: 2017, pricePerSqmUsd: 2700 },
      { year: 2018, pricePerSqmUsd: 2950 },
      { year: 2019, pricePerSqmUsd: 3150 },
      { year: 2020, pricePerSqmUsd: 3250 },
      { year: 2021, pricePerSqmUsd: 3450 },
      { year: 2022, pricePerSqmUsd: 3700 },
      { year: 2023, pricePerSqmUsd: 3850 },
      { year: 2024, pricePerSqmUsd: 4000 },
      { year: 2025, pricePerSqmUsd: 4150 },
      { year: 2026, pricePerSqmUsd: 4280 },
    ],
  },
  {
    districtSlug: "district-7",
    city: "Ho Chi Minh City",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 2100 },
      { year: 2017, pricePerSqmUsd: 2250 },
      { year: 2018, pricePerSqmUsd: 2450 },
      { year: 2019, pricePerSqmUsd: 2600 },
      { year: 2020, pricePerSqmUsd: 2680 },
      { year: 2021, pricePerSqmUsd: 2820 },
      { year: 2022, pricePerSqmUsd: 3050 },
      { year: 2023, pricePerSqmUsd: 3180 },
      { year: 2024, pricePerSqmUsd: 3300 },
      { year: 2025, pricePerSqmUsd: 3420 },
      { year: 2026, pricePerSqmUsd: 3550 },
    ],
  },
  {
    districtSlug: "thu-duc",
    city: "Ho Chi Minh City",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 1450 },
      { year: 2017, pricePerSqmUsd: 1580 },
      { year: 2018, pricePerSqmUsd: 1720 },
      { year: 2019, pricePerSqmUsd: 1880 },
      { year: 2020, pricePerSqmUsd: 1980 },
      { year: 2021, pricePerSqmUsd: 2120 },
      { year: 2022, pricePerSqmUsd: 2350 },
      { year: 2023, pricePerSqmUsd: 2480 },
      { year: 2024, pricePerSqmUsd: 2630 },
      { year: 2025, pricePerSqmUsd: 2780 },
      { year: 2026, pricePerSqmUsd: 2920 },
    ],
  },
  {
    districtSlug: "tay-ho",
    city: "Hanoi",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 2350 },
      { year: 2017, pricePerSqmUsd: 2500 },
      { year: 2018, pricePerSqmUsd: 2700 },
      { year: 2019, pricePerSqmUsd: 2920 },
      { year: 2020, pricePerSqmUsd: 3050 },
      { year: 2021, pricePerSqmUsd: 3220 },
      { year: 2022, pricePerSqmUsd: 3480 },
      { year: 2023, pricePerSqmUsd: 3650 },
      { year: 2024, pricePerSqmUsd: 3820 },
      { year: 2025, pricePerSqmUsd: 3980 },
      { year: 2026, pricePerSqmUsd: 4150 },
    ],
  },
  {
    districtSlug: "nam-tu-liem",
    city: "Hanoi",
    priceHistory: [
      { year: 2016, pricePerSqmUsd: 1500 },
      { year: 2017, pricePerSqmUsd: 1620 },
      { year: 2018, pricePerSqmUsd: 1780 },
      { year: 2019, pricePerSqmUsd: 1950 },
      { year: 2020, pricePerSqmUsd: 2070 },
      { year: 2021, pricePerSqmUsd: 2240 },
      { year: 2022, pricePerSqmUsd: 2480 },
      { year: 2023, pricePerSqmUsd: 2650 },
      { year: 2024, pricePerSqmUsd: 2800 },
      { year: 2025, pricePerSqmUsd: 2960 },
      { year: 2026, pricePerSqmUsd: 3120 },
    ],
  },
];

export function getDistrictPriceHistory(districtSlug: string) {
  return districtPriceHistories.find((history) => history.districtSlug === districtSlug);
}
