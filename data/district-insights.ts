import {
  HCMC_MASTER_PLAN_CONTEXT_NOTE,
  HCMC_MASTER_PLAN_SOURCE_NOTE,
  HCMC_MASTER_PLAN_SOURCE_STATUS,
  HCMC_PLANNING_HORIZON,
  getHcmcUrbanZone,
} from "@/data/hcmc-urban-zones";
import type { DistrictInsightPageData, DistrictTimelineItem } from "@/types/district";

// Mock district intelligence for MVP demonstration.
// Source/status note: project examples, infrastructure timing, and district-level interpretation
// should be verified with official maps, developer disclosures, or reputable market sources
// before public launch.
// TODO: Verify detailed administrative zone mapping against official master plan map before public launch.

const sixZoneMilestone: DistrictTimelineItem = {
  year: "2025",
  title: "HCMC six urban zones master plan reported",
  description:
    "Ho Chi Minh City’s latest master plan outlines six development zones through 2040 with a vision towards 2060, providing planning context for district-level positioning.",
  status: "Announced",
};

function zoneFields(zoneId: string) {
  const zone = getHcmcUrbanZone(zoneId);

  if (!zone) {
    throw new Error(`Missing HCMC urban zone: ${zoneId}`);
  }

  return {
    urbanZone: zone.id,
    urbanZoneDisplayName: zone.displayName,
    urbanZoneRole: zone.role,
    planningHorizon: HCMC_PLANNING_HORIZON,
    sourceStatus: HCMC_MASTER_PLAN_SOURCE_STATUS,
    sourceNote: HCMC_MASTER_PLAN_SOURCE_NOTE,
  };
}

export const districtInsights: DistrictInsightPageData[] = [
  {
    slug: "thu-thiem",
    aliases: ["thu-thiem-district-2"],
    displayName: "Thu Thiem (District 2)",
    city: "Ho Chi Minh City",
    districtContext: "District 2",
    ...zoneFields("eastern-zone"),
    shortPositioning: "Premium riverside financial district across from District 1.",
    masterPlanContext:
      "Positioned within HCMC’s eastern innovation and financial services zone, with Thu Thiem acting as a strategic financial district anchor.",
    masterPlanShortContext:
      "Positioned within HCMC’s eastern innovation and financial services zone, with Thu Thiem acting as a strategic financial district anchor.",
    planningDisclaimer: "Planning context only. Investment outcomes are not guaranteed.",
    districtHeroVisualImage: "/mock-images/districts/thu-thiem-district-vision.jpg",
    districtHeroVisualAlt: "Illustrative riverside district vision for Thu Thiem, Ho Chi Minh City",
    districtHeroVisualCaption:
      "Original illustrative district visual. Not an official map or confirmed development plan.",
    strategicDiagramImage: "/mock-images/districts/thu-thiem-strategic-diagram.jpg",
    infrastructureConceptImage: "/mock-images/districts/thu-thiem-connectivity-concept.jpg",
    lifestyleCommercialConceptImage: "/mock-images/districts/thu-thiem-growth-concept.jpg",
    heroQuickFacts: [
      { label: "District role", value: "Riverside financial district" },
      { label: "CBD access", value: "Across from District 1" },
      { label: "Investor fit", value: "Long-term capital growth" },
      { label: "Rental profile", value: "Premium executive rental" },
      { label: "Buyer type", value: "Overseas investors" },
      { label: "Residences", value: "2 curated projects" },
    ],
    basicInfo: {
      positioning: "Riverside financial district and premium residential area.",
      suitableFor: ["Capital Growth", "Premium Rental", "Overseas Buyers"],
      buyerProfiles: ["Capital growth buyer", "Remote investor", "Premium rental investor"],
      districtRole: "Premium riverside financial district",
      planningTheme: "Financial services, infrastructure, CBD spillover",
      investorRelevance: "Suitable for long-term premium residential positioning",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["empire-city", "the-metropole-thu-thiem"],
    timeline: [
      {
        year: "2012",
        title: "Thu Thiem Tunnel opened",
        description: "The tunnel improved east-west access between the CBD side and Thu Thiem.",
        status: "Completed",
      },
      {
        year: "2018",
        title: "Major riverside residential projects launched",
        description: "Selected mixed-use and residential projects established Thu Thiem’s premium profile.",
        status: "Completed",
      },
      {
        year: "2022",
        title: "Thu Thiem Bridge 2 opened",
        description: "The bridge strengthened links to District 1 and Binh Thanh.",
        status: "Completed",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Financial district themes continue",
        description: "Financial district and infrastructure themes may support long-term residential relevance.",
        status: "Planned",
        isFuture: true,
      },
    ],
    futureAdvantages: [
      {
        title: "Financial Services Anchor",
        description: "Thu Thiem is positioned as a strategic financial district within HCMC’s eastern growth framework.",
        icon: "building",
        category: "master-plan",
      },
      {
        title: "CBD Bridge Connectivity",
        description: "Bridge and riverfront connectivity may strengthen access between Thu Thiem and District 1.",
        icon: "bridge",
        category: "connectivity",
      },
      {
        title: "Premium Leasing Demand",
        description: "CBD proximity and riverside living may support demand from professionals and overseas tenants.",
        icon: "users",
        category: "rental-demand",
      },
      {
        title: "Long-Term District Positioning",
        description: "Limited premium riverfront positioning may continue to attract long-term residential interest.",
        icon: "waves",
        category: "positioning",
      },
    ],
    growthDrivers: [
      {
        id: "transport-access",
        title: "Transport & Connectivity",
        description:
          "Thu Thiem’s access story is shaped by planned metro, bridge, tunnel, and internal road improvements. These themes may improve movement between the district, District 1, and wider HCMC over time.",
        bullets: [
          "Ben Thanh–Thu Thiem Metro Line 2 section, targeted within HCMC’s 2030 urban rail priorities",
          "Thu Thiem–Long Thanh urban railway, targeted as part of longer-term airport connectivity",
          "Four main roads, northern residential infrastructure and North–South axis road segment expected to support Thu Thiem’s internal framework",
          "Bridge and tunnel links supporting access to District 1 and Binh Thanh",
        ],
        icon: "train",
        whyItMatters:
          "Improved connectivity may widen tenant access, shorten CBD travel friction and support long-term residential relevance.",
        visualType: "transport",
      },
      {
        id: "public-realm-lifestyle",
        title: "Public Realm, Schools & Lifestyle",
        description:
          "Thu Thiem’s longer-term appeal is not only about towers. Riverfront public spaces, central square concepts, civic facilities and nearby international schools may help the district feel more complete for long-stay residents.",
        bullets: [
          "Central Square and HCMC Administrative Center investment policy approved",
          "Riverfront public spaces and promenade concepts",
          "Australian International School has a Thu Thiem campus",
          "Nearby former District 2 / Thu Duc City international-school ecosystem includes ISHCMC, BIS, AIS, European International School and German School",
          "Access to private clinics and central hospitals across District 1, Binh Thanh and Thu Duc City should be verified before final publication",
        ],
        icon: "trees",
        whyItMatters:
          "A stronger lifestyle and education ecosystem may support family tenants, executives and longer-stay overseas residents.",
        visualType: "lifestyle",
      },
      {
        id: "financial-commercial-pipeline",
        title: "Commercial & Financial Pipeline",
        description:
          "Thu Thiem is increasingly positioned around financial services, Grade A office space, and mixed-use commercial development. This may support its role as an emerging business district beside the CBD.",
        bullets: [
          "The Hallmark: Grade A office in Thu Thiem New Urban Area, described as a 30-storey commercial tower in central Thu Thiem",
          "The METT: Class A office component within The Metropole Thu Thiem",
          "Lotte Eco Smart City: under-review mixed-use project in functional area 2A, planned to include financial center, service area and multi-functional residential components",
          "International Financial Center planning theme supports Thu Thiem’s commercial identity",
        ],
        icon: "briefcase",
        whyItMatters:
          "More office and mixed-use supply may create a broader professional tenant base and strengthen weekday demand around the district.",
        statusNote: "Proposed and under-review projects remain subject to official updates.",
        visualType: "commercial",
      },
      {
        id: "industry-direction",
        title: "Industry Direction & Long-Term Demand",
        description:
          "The wider Eastern Zone / Thu Duc City planning context points toward finance, technology, education and knowledge-economy uses. For Thu Thiem, the most relevant themes are financial services, fintech and professional office demand.",
        bullets: [
          "VIFC-HCMC positions the city as Vietnam’s international financial gateway",
          "VIFC themes include Aviation Financial Hub, FinTech Hub, Maritime Financial Hub and International Interbank / Global Financial Infrastructure",
          "FinTech themes include cross-border payments, blockchain, AI in finance, digital assets and regulatory sandbox context",
          "These themes may support long-term professional services and corporate tenant relevance",
        ],
        icon: "network",
        whyItMatters:
          "Industry positioning does not guarantee rental growth, but it helps frame why Thu Thiem may remain relevant to business-led residential demand.",
        visualType: "industry",
      },
    ],
    ctaDistrictFilter: "thu-thiem",
  },
  {
    slug: "thao-dien",
    aliases: ["thao-dien-district-2"],
    displayName: "Thao Dien (District 2)",
    city: "Ho Chi Minh City",
    districtContext: "District 2",
    ...zoneFields("eastern-zone"),
    shortPositioning: "Established expat lifestyle hub within the Eastern Zone.",
    masterPlanContext:
      "Connected to Thu Duc City’s innovation, education, international lifestyle, and knowledge-economy positioning.",
    basicInfo: {
      positioning: "Mature lifestyle district with international school and long-stay tenant demand.",
      suitableFor: ["Rental Income", "Lifestyle Buyers", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Lifestyle buyer", "Remote investor"],
      districtRole: "Established expat lifestyle hub",
      planningTheme: "Education, international lifestyle, knowledge-economy support",
      investorRelevance: "Established expat lifestyle infrastructure may support long-term leasing interest",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["masteri-thao-dien"],
    timeline: [
      {
        year: "2014",
        title: "Condominium communities matured",
        description: "Managed residential towers helped establish the district’s rental base.",
        status: "Completed",
      },
      {
        year: "2021",
        title: "Lifestyle retail deepened",
        description: "Cafe, school, and service clusters strengthened daily-living appeal.",
        status: "Completed",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Metro access theme continues",
        description: "Transit-led access may support tenant convenience and leasing relevance.",
        status: "Planned",
      },
    ],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Thao Dien is aligned with the Eastern Zone’s education and knowledge-economy lifestyle context.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Metro-led connectivity is expected to improve access to the CBD and eastern districts.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "International schools, cafes, and professional tenant demand may support leasing depth.",
      },
    ],
    ctaDistrictFilter: "thao-dien",
  },
  {
    slug: "district-1-cbd",
    aliases: ["district-1"],
    displayName: "District 1 (CBD)",
    city: "Ho Chi Minh City",
    districtContext: "CBD",
    ...zoneFields("central-urban-zone"),
    shortPositioning: "CBD benchmark, administrative/commercial core, prestige and liquidity reference.",
    masterPlanContext:
      "Part of the central urban core associated with administration, commerce, services, knowledge economy, and creative industries.",
    basicInfo: {
      positioning: "Core CBD district with office, retail, hospitality, and prestige value.",
      suitableFor: ["CBD exposure", "Prestige", "Overseas Buyers"],
      buyerProfiles: ["Capital growth buyer", "Lifestyle buyer", "Liquidity-focused investor"],
      districtRole: "Administrative and commercial core",
      planningTheme: "Commerce, services, knowledge economy, creative industries",
      investorRelevance: "Central commercial and administrative positioning may support long-term buyer interest and rental relevance",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["vinhomes-golden-river"],
    timeline: [
      {
        year: "2015",
        title: "CBD residential scarcity theme deepened",
        description: "Selective central residences became easier for overseas buyers to understand.",
        status: "Completed",
      },
      {
        year: "2021",
        title: "Metro completion themes advanced",
        description: "Transit improvements supported central accessibility narratives.",
        status: "Under Construction",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Central scarcity remains relevant",
        description: "Limited new residential supply may support continued buyer attention.",
        status: "Indicative",
      },
    ],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "The central zone is positioned around administration, commerce, services, and creative industries.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Central transit and road access could strengthen convenience for executive tenants.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Corporate, hospitality, and service-sector demand supports a familiar rental story.",
      },
    ],
    ctaDistrictFilter: "district-1-cbd",
  },
  {
    slug: "district-7",
    displayName: "District 7 / Phu My Hung",
    city: "Ho Chi Minh City",
    districtContext: "Phu My Hung",
    ...zoneFields("southern-zone"),
    shortPositioning: "Family rental, international community, and southern ecological / lifestyle corridor.",
    masterPlanContext:
      "Southern Zone is planned as a high-tech, water-based ecological city with knowledge economy, cultural, exhibition, entertainment, eco-tourism, industry, logistics, and marine economy functions.",
    basicInfo: {
      positioning: "South Saigon residential district known for schools, healthcare, and family tenants.",
      suitableFor: ["Family rental market", "Stable income", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Family tenant market", "Remote investor"],
      districtRole: "Family rental and international community district",
      planningTheme: "Water-based ecological city, exhibitions, logistics, lifestyle services",
      investorRelevance: "Established international community and southern planning themes may support stable family rental demand",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: [],
    timeline: [
      {
        year: "2000s",
        title: "Phu My Hung community established",
        description: "Master-planned amenities created a recognisable family lifestyle district.",
        status: "Completed",
      },
      {
        year: "2023+",
        title: "Selective new supply continues",
        description: "Newer projects add options while mature amenities support tenant appeal.",
        status: "Indicative",
      },
      sixZoneMilestone,
    ],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Southern Zone planning context suggests a water-based ecological and lifestyle corridor.",
      },
      {
        title: "Lifestyle & Public Realm",
        description: "Schools, healthcare, and retail support practical family leasing demand.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Korean, Japanese, and regional family tenants may support stable occupancy interest.",
      },
    ],
    ctaDistrictFilter: "district-7",
  },
  {
    slug: "binh-thanh",
    aliases: ["binh-thanh-district"],
    displayName: "Binh Thanh District",
    city: "Ho Chi Minh City",
    districtContext: "Binh Thanh",
    urbanZone: "central-adjacent-connector",
    urbanZoneDisplayName: "Central Urban Zone / CBD-adjacent connector",
    urbanZoneRole:
      "CBD-adjacent residential connector near District 1 and the eastern riverfront movement.",
    planningHorizon: HCMC_PLANNING_HORIZON,
    sourceStatus: "Platform interpretation pending detailed official map verification",
    sourceNote:
      "The six-zone article does not explicitly name Binh Thanh as a core zone example. This platform interpretation should be verified against detailed official master plan mapping.",
    shortPositioning: "CBD-adjacent residential connector near District 1 and Landmark 81 / Vinhomes Central Park.",
    masterPlanContext:
      "CBD-adjacent area connected to central urban demand and eastern riverfront movement.",
    basicInfo: {
      positioning: "Central-fringe district with practical rental demand and recognisable completed communities.",
      suitableFor: ["CBD convenience", "Rental Income", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Remote investor", "Professional tenant market"],
      districtRole: "CBD-adjacent residential connector",
      planningTheme: "Central access, riverfront movement, managed residential communities",
      investorRelevance: "Recognisable completed communities may support practical rental review",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: [],
    timeline: [
      {
        year: "2018",
        title: "Landmark 81 completed",
        description: "The Vinhomes Central Park area became a recognisable residential reference point.",
        status: "Completed",
      },
      {
        year: "2024+",
        title: "CBD-adjacent leasing remains active",
        description: "Professional tenant demand continues to support selected managed towers.",
        status: "Indicative",
      },
      sixZoneMilestone,
    ],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description:
          "Planning context is treated as CBD-adjacent rather than an exact official zone designation pending detailed map verification.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Central access may support demand from professionals seeking convenience.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Recognisable buildings and managed communities can support leasing clarity.",
      },
    ],
    ctaDistrictFilter: "binh-thanh",
  },
  {
    slug: "district-4",
    displayName: "District 4",
    city: "Ho Chi Minh City",
    districtContext: "District 4",
    urbanZone: "central-southern-connector",
    urbanZoneDisplayName: "Central Urban Zone / CBD-adjacent southern connector",
    urbanZoneRole:
      "Inner-city connector between District 1 and southern urban corridor themes.",
    planningHorizon: HCMC_PLANNING_HORIZON,
    sourceStatus: "Platform interpretation pending detailed official map verification",
    sourceNote:
      "The six-zone article does not explicitly name District 4 as a core zone example. This platform interpretation should be verified against detailed official master plan mapping.",
    shortPositioning: "Inner-city connector between District 1 and southern districts.",
    masterPlanContext:
      "Inner-city location benefits from proximity to the central urban core and southern urban corridor.",
    basicInfo: {
      positioning: "CBD-fringe district with central access and compact rental stock.",
      suitableFor: ["CBD access", "Rental Income", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Remote investor", "Capital growth buyer"],
      districtRole: "CBD-adjacent southern connector",
      planningTheme: "Central proximity, bridge access, southern corridor connection",
      investorRelevance: "May suit buyers seeking central access at a more approachable entry point",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: [],
    timeline: [sixZoneMilestone],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description:
          "Planning context is interpreted through proximity to the central core and southern corridor themes.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Bridge access to District 1 may support everyday rental convenience.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Younger professionals seeking central access may support leasing demand.",
      },
    ],
    ctaDistrictFilter: "district-4",
  },
  {
    slug: "thu-duc-district-9",
    aliases: ["thu-duc-city", "district-9-thu-duc-growth-corridor"],
    displayName: "Thu Duc City / District 9 Growth Corridor",
    city: "Ho Chi Minh City",
    districtContext: "Thu Duc City",
    ...zoneFields("eastern-zone"),
    shortPositioning: "Eastern growth corridor with innovation, education, high-tech, and large township supply.",
    masterPlanContext:
      "Aligned with the Eastern Zone’s high-tech, education, financial services, healthcare, and knowledge hub role.",
    basicInfo: {
      positioning: "Large-scale eastern growth area linked to education, technology, and township development.",
      suitableFor: ["Long-term hold", "Capital Growth", "Overseas Buyers"],
      buyerProfiles: ["Long-term hold investor", "Remote investor", "Entry-price buyer"],
      districtRole: "Eastern innovation and township growth corridor",
      planningTheme: "High-tech, education, healthcare, financial services, township supply",
      investorRelevance: "Large-scale township supply and future connectivity themes may appeal to long-term growth-focused buyers",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["vinhomes-grand-park"],
    timeline: [
      {
        year: "2020",
        title: "Thu Duc City formed",
        description: "The eastern area gained a clearer administrative and growth-corridor identity.",
        status: "Completed",
      },
      {
        year: "2023+",
        title: "Township supply expands",
        description: "Large communities continued to add residential options and amenities.",
        status: "Indicative",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Transit and ring-road themes continue",
        description: "Infrastructure delivery may improve access and long-term residential interest.",
        status: "Planned",
      },
    ],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "The Eastern Zone is positioned around innovation, education, high-tech, and financial services.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Metro and ring-road themes may improve access over time.",
      },
      {
        title: "Long-Term District Positioning",
        description: "Lower entry pricing may appeal to patient overseas investors reviewing long-term urban expansion.",
      },
    ],
    ctaDistrictFilter: "thu-duc-district-9",
  },
  {
    slug: "binh-chanh",
    displayName: "Binh Chanh",
    city: "Ho Chi Minh City",
    districtContext: "Binh Chanh",
    ...zoneFields("western-zone"),
    shortPositioning: "Western industrial, commercial services, healthcare, biomedical, education and training growth area.",
    masterPlanContext:
      "Part of the Western Zone / Binh Chanh Urban Area, positioned around industrial city themes, commercial services, healthcare, biomedical centres, education, and training.",
    basicInfo: {
      positioning: "Emerging western urban area with industrial and service-sector planning themes.",
      suitableFor: ["Long-term hold", "Value-growth", "Overseas Buyers"],
      buyerProfiles: ["Long-term hold investor", "Remote investor"],
      districtRole: "Western industrial and service growth area",
      planningTheme: "Industrial city, healthcare, biomedical centres, education, training",
      investorRelevance: "Future residential interest should be reviewed cautiously against delivered infrastructure and project quality",
    },
    rentalDemand: "Moderate",
    selectedResidenceSlugs: [],
    timeline: [sixZoneMilestone],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Western Zone planning context positions Binh Chanh around industry, services, healthcare, and education.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Future urban links could strengthen access if delivered as planned.",
      },
      {
        title: "Long-Term District Positioning",
        description: "This is an emerging watchlist area rather than a core near-term residence focus in the current mock data.",
      },
    ],
    ctaDistrictFilter: "binh-chanh",
  },
  {
    slug: "cu-chi-hoc-mon",
    displayName: "Cu Chi / Hoc Mon",
    city: "Ho Chi Minh City",
    districtContext: "Cu Chi / Hoc Mon",
    ...zoneFields("northern-zone"),
    shortPositioning: "Northern multifunctional services, wellness, industrial park, education, technology, and eco-cultural tourism zone.",
    masterPlanContext:
      "Part of the Northern Zone / Cu Chi – Hoc Mon Urban Area, positioned for services, entertainment, culture, wellness, industry, education, technology, and eco-cultural tourism.",
    basicInfo: {
      positioning: "Emerging northern multifunctional zone with wellness and industrial park themes.",
      suitableFor: ["Long-term hold", "Watchlist", "Overseas Buyers"],
      buyerProfiles: ["Long-term hold investor", "Research-led buyer"],
      districtRole: "Northern multifunctional watchlist zone",
      planningTheme: "Services, wellness, industrial parks, education, technology, eco-cultural tourism",
      investorRelevance: "Best treated as a long-term research area until project-level residential data is available",
    },
    rentalDemand: "Moderate",
    selectedResidenceSlugs: [],
    timeline: [sixZoneMilestone],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Northern Zone planning context combines services, wellness, industrial parks, education, and tourism.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Future demand would likely depend on delivered employment, infrastructure, and lifestyle nodes.",
      },
      {
        title: "Long-Term District Positioning",
        description: "This remains a watchlist district rather than a core condo investment focus in the current platform data.",
      },
    ],
    ctaDistrictFilter: "cu-chi-hoc-mon",
  },
  {
    slug: "nha-be",
    displayName: "Nha Be",
    city: "Ho Chi Minh City",
    districtContext: "Nha Be",
    ...zoneFields("southern-zone"),
    shortPositioning: "Southern ecological, logistics, and water-based urban growth extension linked to District 7.",
    masterPlanContext:
      "Part of the Southern Zone / District 7 – Nha Be Urban Area, linked to ecological city, logistics, exhibition, culture, entertainment, and marine economy themes.",
    basicInfo: {
      positioning: "Southern growth extension connected to District 7 lifestyle and logistics themes.",
      suitableFor: ["Long-term hold", "Family rental market", "Overseas Buyers"],
      buyerProfiles: ["Long-term hold investor", "Family tenant market"],
      districtRole: "Southern ecological and logistics extension",
      planningTheme: "Water-based ecological city, logistics, culture, exhibition, marine economy",
      investorRelevance: "May be reviewed as a southern extension where project quality and access are clear",
    },
    rentalDemand: "Moderate",
    selectedResidenceSlugs: [],
    timeline: [sixZoneMilestone],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Southern Zone context links Nha Be with water-based ecological and logistics themes.",
      },
      {
        title: "Infrastructure & Connectivity",
        description: "Access improvements could strengthen links to District 7 and central areas over time.",
      },
      {
        title: "Long-Term District Positioning",
        description: "Residential appeal should be assessed project by project against delivered infrastructure.",
      },
    ],
    ctaDistrictFilter: "nha-be",
  },
  {
    slug: "can-gio",
    displayName: "Can Gio",
    city: "Ho Chi Minh City",
    districtContext: "Can Gio",
    ...zoneFields("southeastern-zone"),
    shortPositioning: "Ecological and marine gateway with tourism, logistics, port, fisheries, and aquaculture research themes.",
    masterPlanContext:
      "Part of the Southeastern Zone / Can Gio Urban Area, positioned around marine economy, eco-tourism, leisure, ports, logistics, fisheries logistics, and aquaculture research.",
    basicInfo: {
      positioning: "Long-term eco-marine gateway rather than a core condominium investment district in current data.",
      suitableFor: ["Watchlist", "Long-term hold", "Lifestyle Buyers"],
      buyerProfiles: ["Research-led buyer", "Long-term hold investor"],
      districtRole: "Eco-marine gateway watchlist zone",
      planningTheme: "Marine economy, eco-tourism, leisure, ports, logistics, aquaculture research",
      investorRelevance: "Should be treated as long-term planning context unless specific residence projects are later added",
    },
    rentalDemand: "Moderate",
    selectedResidenceSlugs: [],
    timeline: [sixZoneMilestone],
    futureAdvantages: [
      {
        title: "Master Plan Role",
        description: "Southeastern Zone context positions Can Gio around eco-marine and logistics themes.",
      },
      {
        title: "Tenant / Buyer Demand Drivers",
        description: "Future appeal would likely be leisure, tourism, and marine-economy linked rather than core CBD rental demand.",
      },
      {
        title: "Long-Term District Positioning",
        description: "This is a watchlist zone in the current platform data, not a core condo investment recommendation.",
      },
    ],
    ctaDistrictFilter: "can-gio",
  },
];

export function getDistrictInsightBySlug(slug: string) {
  return districtInsights.find(
    (district) => district.slug === slug || district.aliases?.includes(slug),
  );
}

export function getDistrictInsightByFilter(filter: string) {
  return districtInsights.find((district) => district.ctaDistrictFilter === filter);
}

export function getProjectDistrictForDistrictFilter(filter: string) {
  switch (filter) {
    case "thu-thiem":
      return "Thu Thiem";
    case "thao-dien":
      return "Thao Dien";
    case "district-1-cbd":
      return "Ben Nghe";
    case "district-7":
      return "Phu My Hung";
    case "thu-duc-district-9":
      return "Thu Duc";
    default:
      return undefined;
  }
}

export { HCMC_MASTER_PLAN_CONTEXT_NOTE };
