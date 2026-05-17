export type City = {
  name: string;
  market: string;
  description: string;
  image: string;
  averageYield: string;
  fromPrice: string;
};

export type Property = {
  title: string;
  city: string;
  district: string;
  price: string;
  yield: string;
  bedrooms: number;
  size: string;
  image: string;
  badge: string;
};

export type JourneyStep = {
  step: string;
  title: string;
  description: string;
};

export const cities: City[] = [
  {
    name: "Ho Chi Minh City",
    market: "Financial core",
    description:
      "High-liquidity apartments near District 1, Thu Thiem, and established expat rental corridors.",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    averageYield: "5.2%",
    fromPrice: "$185k",
  },
  {
    name: "Hanoi",
    market: "Capital growth",
    description:
      "Institutional-grade residences close to Tay Ho, Ba Dinh, and diplomatic tenant demand.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    averageYield: "4.7%",
    fromPrice: "$160k",
  },
];

export const properties: Property[] = [
  {
    title: "The River Thu Thiem Residence",
    city: "Ho Chi Minh City",
    district: "Thu Thiem",
    price: "$428,000",
    yield: "5.6%",
    bedrooms: 2,
    size: "86 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Foreign quota available",
  },
  {
    title: "West Lake Diplomatic Suite",
    city: "Hanoi",
    district: "Tay Ho",
    price: "$315,000",
    yield: "4.9%",
    bedrooms: 2,
    size: "78 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    badge: "Managed rental ready",
  },
  {
    title: "District 1 Heritage Loft",
    city: "Ho Chi Minh City",
    district: "Ben Nghe",
    price: "$560,000",
    yield: "5.1%",
    bedrooms: 3,
    size: "112 sqm",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "Prime resale demand",
  },
];

export const journeySteps: JourneyStep[] = [
  {
    step: "01",
    title: "Define the mandate",
    description:
      "Clarify budget, buyer eligibility, preferred city, holding period, and income objectives.",
  },
  {
    step: "02",
    title: "Shortlist verified assets",
    description:
      "Review foreign quota, title status, projected rent, developer reputation, and exit liquidity.",
  },
  {
    step: "03",
    title: "Secure the purchase",
    description:
      "Coordinate reservation, legal review, payment schedule, banking, and document translation.",
  },
  {
    step: "04",
    title: "Manage and optimize",
    description:
      "Launch furnishing, tenant placement, rental reporting, maintenance, and resale planning.",
  },
];
