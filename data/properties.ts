import type { Property } from "@/types/property";

// Replace this local array with a property database or CRM-backed API later.
export const properties: Property[] = [
  {
    id: "thu-thiem-river-residence",
    title: "Thu Thiem River Residence",
    city: "Ho Chi Minh City",
    district: "Thu Thiem",
    type: "2-bedroom apartment",
    price: "USD 428,000",
    priceUsd: 428000,
    estimatedYield: "5.4% - 5.8%",
    riskRating: "Low",
    bestFor: "Balanced yield and liquidity",
    foreignOwnership: "Eligible",
    completionStatus: "Completed",
    verifiedProject: {
      level: "Verified",
      summary: "Quota, developer track record, rental demand, and handover status pre-checked.",
    },
    roiDefaults: {
      rentMonthlyUsd: 2050,
      serviceChargeMonthlyUsd: 180,
      furnishingUsd: 18000,
    },
    paymentPlan: ["10% reservation", "20% contract signing", "70% on handover"],
    estimatedRentalIncome: "USD 1,950 - 2,150 per month",
    locationDetails:
      "Prime Thu Thiem position with quick access to District 1, international schools, and the new financial district.",
    developer: {
      name: "Rivergate Urban Homes",
      profile:
        "Established Ho Chi Minh City residential developer with completed high-rise projects in central districts.",
    },
    overview:
      "A ready-to-rent apartment positioned for foreign buyers seeking central liquidity and professional tenant demand.",
    investmentHighlights: [
      "Completed asset with immediate rental potential",
      "Strong access to District 1 and Thu Thiem office demand",
      "International tenant profile suited to furnished leasing",
    ],
    foreignBuyerNotes: [
      "Foreign ownership quota currently available",
      "Legal review recommended before reservation",
      "Rental management can be arranged after handover",
    ],
  },
  {
    id: "west-lake-diplomatic-suite",
    title: "West Lake Diplomatic Suite",
    city: "Hanoi",
    district: "Tay Ho",
    type: "2-bedroom apartment",
    price: "USD 315,000",
    priceUsd: 315000,
    estimatedYield: "4.7% - 5.1%",
    riskRating: "Low",
    bestFor: "Stable expat rental income",
    foreignOwnership: "Limited quota",
    completionStatus: "Completed",
    verifiedProject: {
      level: "Enhanced due diligence",
      summary: "Rental corridor verified; ownership quota requires final confirmation before reservation.",
    },
    roiDefaults: {
      rentMonthlyUsd: 1350,
      serviceChargeMonthlyUsd: 145,
      furnishingUsd: 14000,
    },
    paymentPlan: ["15% reservation", "35% sales contract", "50% completion"],
    estimatedRentalIncome: "USD 1,250 - 1,450 per month",
    locationDetails:
      "Tay Ho address near embassies, international schools, serviced offices, and long-stay expat tenant demand.",
    developer: {
      name: "Capital Lake Developments",
      profile:
        "Hanoi-focused developer with residential projects in established diplomatic and family rental corridors.",
    },
    overview:
      "A well-positioned Hanoi apartment for buyers prioritizing stable long-stay rental demand and lifestyle appeal.",
    investmentHighlights: [
      "Established expat district with deep rental history",
      "Efficient layout for furnished corporate leasing",
      "Close to West Lake, embassies, and international amenities",
    ],
    foreignBuyerNotes: [
      "Quota should be reconfirmed before deposit",
      "Ownership documentation requires translated buyer records",
      "Long-term leasing strategy recommended",
    ],
  },
  {
    id: "district-one-heritage-loft",
    title: "District 1 Heritage Loft",
    city: "Ho Chi Minh City",
    district: "Ben Nghe",
    type: "3-bedroom apartment",
    price: "USD 560,000",
    priceUsd: 560000,
    estimatedYield: "4.8% - 5.2%",
    riskRating: "Medium",
    bestFor: "Prime resale scarcity",
    foreignOwnership: "Advisor review",
    completionStatus: "Completed",
    verifiedProject: {
      level: "Enhanced due diligence",
      summary: "Prime location and developer profile reviewed; ownership structure needs advisor review.",
    },
    roiDefaults: {
      rentMonthlyUsd: 2500,
      serviceChargeMonthlyUsd: 260,
      furnishingUsd: 26000,
    },
    paymentPlan: ["20% reservation", "30% contract signing", "50% completion"],
    estimatedRentalIncome: "USD 2,350 - 2,650 per month",
    locationDetails:
      "Core District 1 location close to offices, hotels, restaurants, retail, and established international tenant demand.",
    developer: {
      name: "Saigon Central Residences",
      profile:
        "Boutique city-centre developer focused on low-density residential projects in central Ho Chi Minh City.",
    },
    overview:
      "A rare larger-format central apartment suited to executive tenants and buyers seeking prime resale scarcity.",
    investmentHighlights: [
      "Central district scarcity and strong resale appeal",
      "Larger layout supports executive family tenancy",
      "Walkable access to Grade A office and hospitality demand",
    ],
    foreignBuyerNotes: [
      "Advisor review required for ownership structure",
      "Building-level quota must be confirmed",
      "Management fees and sinking fund should be reviewed",
    ],
  },
  {
    id: "my-dinh-business-park-residence",
    title: "My Dinh Business Park Residence",
    city: "Hanoi",
    district: "Nam Tu Liem",
    type: "1-bedroom apartment",
    price: "USD 168,000",
    priceUsd: 168000,
    estimatedYield: "5.0% - 5.5%",
    riskRating: "Medium",
    bestFor: "Entry price and growth",
    foreignOwnership: "Eligible",
    completionStatus: "Under construction",
    verifiedProject: {
      level: "Pre-check",
      summary: "Area demand reviewed; construction and escrow documents require final diligence.",
    },
    roiDefaults: {
      rentMonthlyUsd: 770,
      serviceChargeMonthlyUsd: 75,
      furnishingUsd: 9000,
    },
    paymentPlan: ["10% reservation", "40% construction milestones", "50% handover"],
    estimatedRentalIncome: "USD 720 - 820 per month",
    locationDetails:
      "Near business parks, Korean and Japanese tenant demand, ring-road access, and growing western Hanoi infrastructure.",
    developer: {
      name: "Northline Residential",
      profile:
        "Mid-market Hanoi developer delivering compact apartments for young professionals and corporate tenants.",
    },
    overview:
      "A lower-ticket entry point into Hanoi with rental demand linked to western business districts.",
    investmentHighlights: [
      "Accessible entry price for first-time foreign buyers",
      "Tenant pool linked to nearby business parks",
      "Construction-linked payment schedule",
    ],
    foreignBuyerNotes: [
      "Construction timeline should be monitored",
      "Escrow and payment terms need legal confirmation",
      "Rental furnishing budget should be planned early",
    ],
  },
  {
    id: "district-seven-family-residence",
    title: "District 7 Family Residence",
    city: "Ho Chi Minh City",
    district: "Phu My Hung",
    type: "3-bedroom apartment",
    price: "USD 392,000",
    priceUsd: 392000,
    estimatedYield: "4.9% - 5.3%",
    riskRating: "Low",
    bestFor: "Family tenants",
    foreignOwnership: "Eligible",
    completionStatus: "Completed",
    verifiedProject: {
      level: "Verified",
      summary: "Completed family rental asset with eligible foreign buyer review and management checks.",
    },
    roiDefaults: {
      rentMonthlyUsd: 1850,
      serviceChargeMonthlyUsd: 210,
      furnishingUsd: 22000,
    },
    paymentPlan: ["10% reservation", "30% sales contract", "60% transfer"],
    estimatedRentalIncome: "USD 1,750 - 1,950 per month",
    locationDetails:
      "Family-oriented district with international schools, malls, healthcare, and established South Saigon expat demand.",
    developer: {
      name: "South Saigon Communities",
      profile:
        "Developer focused on family residences and mixed-use communities in southern Ho Chi Minh City.",
    },
    overview:
      "A family-sized rental asset in one of Ho Chi Minh City's most established international residential zones.",
    investmentHighlights: [
      "Family tenant demand from schools and healthcare access",
      "Established amenities and management standards",
      "Attractive balance of yield and lifestyle appeal",
    ],
    foreignBuyerNotes: [
      "Eligible for foreign buyer review",
      "Tenant demand strongest for furnished family layouts",
      "Building management standards should be checked",
    ],
  },
  {
    id: "hanoi-old-quarter-studio",
    title: "Hanoi Old Quarter Studio",
    city: "Hanoi",
    district: "Hoan Kiem",
    type: "Studio apartment",
    price: "USD 142,000",
    priceUsd: 142000,
    estimatedYield: "4.4% - 4.8%",
    riskRating: "Medium-high",
    bestFor: "Early-stage capital growth",
    foreignOwnership: "Advisor review",
    completionStatus: "Off-plan",
    verifiedProject: {
      level: "Pre-check",
      summary: "Concept and central location reviewed; off-plan structure needs detailed legal diligence.",
    },
    roiDefaults: {
      rentMonthlyUsd: 570,
      serviceChargeMonthlyUsd: 65,
      furnishingUsd: 7000,
    },
    paymentPlan: ["5% expression of interest", "25% contract", "70% staged payments"],
    estimatedRentalIncome: "USD 520 - 620 per month",
    locationDetails:
      "Central Hanoi position near hospitality, culture, offices, and short-to-medium stay rental demand.",
    developer: {
      name: "Heritage Quarter Living",
      profile:
        "Boutique developer proposing compact urban residences in central Hanoi locations.",
    },
    overview:
      "A compact off-plan option for buyers considering central Hanoi exposure with a lower acquisition ticket.",
    investmentHighlights: [
      "Central address with tourism and office demand",
      "Lower capital requirement",
      "Potential uplift through early-stage pricing",
    ],
    foreignBuyerNotes: [
      "Off-plan structure requires careful legal review",
      "Foreign ownership eligibility should be verified before deposit",
      "Short-stay rental rules may change by building and district",
    ],
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}

export const featuredProperties = properties.slice(0, 3);
