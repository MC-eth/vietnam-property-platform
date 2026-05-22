import type { DistrictMarket } from "@/types/district";

export const districtMarkets: DistrictMarket[] = [
  {
    slug: "thu-duc",
    name: "Thu Duc",
    city: "Ho Chi Minh City",
    positioning:
      "Large-scale eastern growth corridor with selected riverfront and new urban centre investment themes.",
    bestFor: ["Capital growth", "Remote investors", "Rental income"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.8% - 5.8%",
      rentalDemand: "High",
      liquidity: "High",
      foreignBuyerPopularity: "High",
      infrastructureOutlook: "Metro, bridges, ring roads, and new CBD planning remain the core catalysts.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Tenant demand is strongest around completed communities, office corridors, and riverfront locations with convenient access to District 1.",
      expatBusinessDemand:
        "Selected projects can appeal to international professionals, technology workers, and business tenants seeking newer housing stock.",
      infrastructure:
        "Infrastructure delivery is a major part of the thesis, so investors should separate completed connectivity from future expectations.",
      developerActivity:
        "Developer activity is deep, with a wide quality range from large master plans to more speculative projects.",
      resaleLiquidity:
        "Liquidity is strongest for completed, well-managed projects with clear access and recognizable district positioning.",
      foreignBuyerSuitability:
        "Suitable for foreign buyers when quota, title structure, and developer track record are verified before reservation.",
    },
    buyerFit: ["Capital appreciation buyer", "Remote buyer", "Rental income buyer"],
    risks: [
      "Infrastructure timing can affect rental and resale assumptions.",
      "Project quality varies materially by developer and sub-location.",
      "Foreign quota availability should be checked before deposit.",
      "Oversupply risk is higher in emerging clusters with many similar units.",
    ],
    relatedPropertyDistricts: ["Thu Thiem"],
  },
  {
    slug: "thao-dien-district-2",
    name: "Thao Dien / District 2",
    city: "Ho Chi Minh City",
    positioning:
      "Established expat lifestyle corridor with strong serviced apartment and family tenant appeal.",
    bestFor: ["Rental income", "Lifestyle", "Relocation"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.7% - 5.5%",
      rentalDemand: "Very high",
      liquidity: "High",
      foreignBuyerPopularity: "Very high",
      infrastructureOutlook: "Metro access and mature expat amenities support resilient demand.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Demand is supported by international schools, restaurants, serviced offices, and long-stay expat households.",
      expatBusinessDemand:
        "The area is one of HCMC's most familiar lifestyle districts for overseas tenants and relocation buyers.",
      infrastructure:
        "Metro connectivity and improved access to the CBD can support rental depth, subject to station proximity.",
      developerActivity:
        "New supply is more selective than wider eastern districts, but project pricing can already reflect the area's popularity.",
      resaleLiquidity:
        "Resale liquidity is typically stronger for efficient layouts, river or city views, and buildings with proven management.",
      foreignBuyerSuitability:
        "Foreign buyers should confirm building-level quota and management quality, especially in older projects.",
    },
    buyerFit: ["Rental income buyer", "Lifestyle buyer", "Relocation buyer", "Family buyer"],
    risks: [
      "Entry pricing can be high for prime buildings.",
      "Older projects may require more maintenance and management review.",
      "Foreign quota can be limited in popular buildings.",
      "Vacancy risk rises when furnishing quality is below expat tenant expectations.",
    ],
    relatedPropertyDistricts: ["Thu Thiem"],
  },
  {
    slug: "district-7",
    name: "District 7",
    city: "Ho Chi Minh City",
    positioning:
      "Established family and education-led rental district with defensive income characteristics.",
    bestFor: ["Rental income", "Family buyers", "Remote investors"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.6% - 5.4%",
      rentalDemand: "High",
      liquidity: "High",
      foreignBuyerPopularity: "High",
      infrastructureOutlook: "South Saigon amenities, schools, healthcare, and road links support stable leasing.",
      riskLevel: "Low",
    },
    investmentThesis: {
      tenantDemand:
        "Family tenant demand is supported by international schools, healthcare, malls, and established residential communities.",
      expatBusinessDemand:
        "The district appeals to expat families and professionals preferring larger layouts and quieter living.",
      infrastructure:
        "Infrastructure is more mature than emerging districts, with practical daily-life amenities already in place.",
      developerActivity:
        "Developer activity is focused on family communities, completed stock, and selected upgrades rather than only new launches.",
      resaleLiquidity:
        "Liquidity can be resilient for completed family units with strong management and international school access.",
      foreignBuyerSuitability:
        "Often suitable for foreign buyers seeking understandable tenant demand, subject to quota and legal due diligence.",
    },
    buyerFit: ["Rental income buyer", "Family buyer", "Remote buyer"],
    risks: [
      "Rental upside may be steadier than high-growth emerging districts.",
      "Family tenants expect higher furnishing and maintenance standards.",
      "Older buildings require management and sinking fund review.",
      "Liquidity can narrow for very large or highly priced units.",
    ],
    relatedPropertyDistricts: ["Phu My Hung"],
  },
  {
    slug: "district-1",
    name: "District 1",
    city: "Ho Chi Minh City",
    positioning:
      "Prime central scarcity market with executive rental and resale recognition, but higher entry pricing.",
    bestFor: ["Capital growth", "Lifestyle", "Rental income"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.4% - 5.2%",
      rentalDemand: "High",
      liquidity: "High",
      foreignBuyerPopularity: "High",
      infrastructureOutlook: "Established CBD, hospitality, retail, and office density support long-term relevance.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Demand comes from executives, corporate tenants, serviced apartment users, and buyers who prioritize central access.",
      expatBusinessDemand:
        "District 1 remains one of the most recognizable areas for overseas buyers and business tenants.",
      infrastructure:
        "The district benefits from mature infrastructure rather than a single future catalyst.",
      developerActivity:
        "New residential supply is limited, so building quality and ownership structure matter more than launch volume.",
      resaleLiquidity:
        "Resale depth can be strong for prime addresses, but larger ticket sizes can reduce the buyer pool.",
      foreignBuyerSuitability:
        "Suitable for experienced buyers after ownership structure, quota, and building documentation are reviewed.",
    },
    buyerFit: ["Capital appreciation buyer", "Lifestyle buyer", "Rental income buyer"],
    risks: [
      "Prime pricing can reduce yield and increase holding-period sensitivity.",
      "Older buildings may require deeper legal and maintenance review.",
      "Large-ticket units can have narrower resale liquidity.",
      "Foreign ownership eligibility must be confirmed building by building.",
    ],
    relatedPropertyDistricts: ["Ben Nghe"],
  },
  {
    slug: "tay-ho",
    name: "Tay Ho",
    city: "Hanoi",
    positioning:
      "Hanoi's leading expat and diplomatic lifestyle district with stable long-stay rental demand.",
    bestFor: ["Rental income", "Lifestyle", "Relocation"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.6% - 5.2%",
      rentalDemand: "High",
      liquidity: "Moderate",
      foreignBuyerPopularity: "High",
      infrastructureOutlook: "Embassy, school, serviced office, and West Lake lifestyle demand support leasing.",
      riskLevel: "Low",
    },
    investmentThesis: {
      tenantDemand:
        "Demand is supported by diplomatic, NGO, education, and international family tenants.",
      expatBusinessDemand:
        "Tay Ho is one of Hanoi's clearest expat rental markets and is familiar to relocation-oriented buyers.",
      infrastructure:
        "The thesis is based on established amenity depth rather than only future infrastructure delivery.",
      developerActivity:
        "Developer activity focuses on premium apartments and serviced residences around established lifestyle nodes.",
      resaleLiquidity:
        "Liquidity is moderate to good for well-located units, with strongest resale appeal in managed buildings.",
      foreignBuyerSuitability:
        "Suitable for income-led foreign buyers, subject to final quota confirmation and legal review.",
    },
    buyerFit: ["Rental income buyer", "Lifestyle buyer", "Relocation buyer", "Family buyer"],
    risks: [
      "Rental growth can be steadier than faster-growth HCMC districts.",
      "Quota can be limited in popular completed buildings.",
      "Lifestyle premium may reduce entry yield.",
      "Management quality has a strong effect on tenant retention.",
    ],
    relatedPropertyDistricts: ["Tay Ho"],
  },
  {
    slug: "cau-giay",
    name: "Cau Giay",
    city: "Hanoi",
    positioning:
      "Business, education, and office-linked rental district with practical tenant depth.",
    bestFor: ["Rental income", "Remote investors", "Capital growth"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.7% - 5.4%",
      rentalDemand: "High",
      liquidity: "Moderate",
      foreignBuyerPopularity: "Moderate",
      infrastructureOutlook: "Office clusters, universities, and road connectivity support steady tenant demand.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Tenant demand is linked to offices, universities, local professionals, and small business operators.",
      expatBusinessDemand:
        "Expat demand is more business-linked and selective than Tay Ho, with stronger appeal near office nodes.",
      infrastructure:
        "Connectivity across western Hanoi is useful for tenants, though micro-location matters significantly.",
      developerActivity:
        "Development activity includes mid-to-upper market apartments, with quality varying by developer.",
      resaleLiquidity:
        "Liquidity is strongest for practical unit sizes and projects close to office or education demand.",
      foreignBuyerSuitability:
        "Can suit foreign buyers seeking functional rental demand after careful project and quota checks.",
    },
    buyerFit: ["Rental income buyer", "Remote buyer", "Capital appreciation buyer"],
    risks: [
      "Foreign buyer popularity is more selective than Tay Ho.",
      "Project quality and management vary by building.",
      "Vacancy assumptions should be conservative outside prime office nodes.",
      "Resale liquidity may depend heavily on price point.",
    ],
    relatedPropertyDistricts: [],
  },
  {
    slug: "nam-tu-liem",
    name: "Nam Tu Liem",
    city: "Hanoi",
    positioning:
      "Western Hanoi growth district with business park demand and lower entry price points.",
    bestFor: ["Capital growth", "Rental income", "Remote investors"],
    snapshot: {
      averageGrossYieldRange: "Estimated 5.0% - 5.6%",
      rentalDemand: "High",
      liquidity: "Moderate",
      foreignBuyerPopularity: "Moderate",
      infrastructureOutlook: "Ring-road access, business parks, and new commercial clusters support tenant formation.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Demand is supported by Korean, Japanese, and local professional tenant pools around western business districts.",
      expatBusinessDemand:
        "Business-linked tenant demand can be strong near offices and industrial service hubs.",
      infrastructure:
        "Infrastructure and commercial development are part of the growth thesis, but delivery timing should be checked.",
      developerActivity:
        "New supply gives buyers more choice, but also requires careful assessment of developer quality and absorption.",
      resaleLiquidity:
        "Liquidity is moderate, with strongest appeal for well-priced completed or near-completion units.",
      foreignBuyerSuitability:
        "Can suit first-time foreign investors seeking lower ticket sizes, subject to escrow and contract review.",
    },
    buyerFit: ["Capital appreciation buyer", "Rental income buyer", "Remote buyer"],
    risks: [
      "Construction and handover timing should be monitored.",
      "Oversupply risk is possible in similar mid-market projects.",
      "Developer quality and escrow structure require review.",
      "Rental demand depends on nearby business park absorption.",
    ],
    relatedPropertyDistricts: ["Nam Tu Liem"],
  },
  {
    slug: "ba-dinh",
    name: "Ba Dinh",
    city: "Hanoi",
    positioning:
      "Diplomatic and central administrative district with scarce premium residential supply.",
    bestFor: ["Lifestyle", "Relocation", "Capital growth"],
    snapshot: {
      averageGrossYieldRange: "Estimated 4.2% - 4.9%",
      rentalDemand: "Moderate",
      liquidity: "Moderate",
      foreignBuyerPopularity: "Moderate",
      infrastructureOutlook: "Central government, embassies, and established city fabric support defensive appeal.",
      riskLevel: "Medium",
    },
    investmentThesis: {
      tenantDemand:
        "Tenant demand is more selective, driven by diplomatic, administrative, and central-city lifestyle needs.",
      expatBusinessDemand:
        "International tenant demand exists but is narrower than Tay Ho and more dependent on building quality.",
      infrastructure:
        "The district's value is based on centrality and scarcity rather than large new infrastructure catalysts.",
      developerActivity:
        "New residential supply is limited, so buyers should evaluate building condition, legal structure, and management.",
      resaleLiquidity:
        "Liquidity can be reasonable for high-quality units, but the buyer pool is more selective.",
      foreignBuyerSuitability:
        "Best suited to experienced or lifestyle-led foreign buyers after detailed building-level review.",
    },
    buyerFit: ["Lifestyle buyer", "Relocation buyer", "Capital appreciation buyer"],
    risks: [
      "Lower available supply can make price benchmarking harder.",
      "Older buildings may require more legal and maintenance diligence.",
      "Rental vacancy risk can rise if the unit does not meet diplomatic tenant standards.",
      "Foreign quota and ownership structure should be confirmed early.",
    ],
    relatedPropertyDistricts: [],
  },
];

export function getDistrictMarketBySlug(slug: string) {
  return districtMarkets.find((district) => district.slug === slug);
}
