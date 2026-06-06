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
      { label: "Investor fit", value: "Long-term growth positioning" },
      { label: "Rental profile", value: "Executive rental demand" },
      { label: "Buyer type", value: "Overseas investors" },
      { label: "Residences", value: "2 selected residences" },
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
          {
            status: "Targeted",
            text: "Ben Thanh–Thu Thiem Metro Line 2 section, targeted within HCMC’s 2030 urban rail priorities",
          },
          {
            status: "Planned",
            text: "Thu Thiem–Long Thanh urban railway, targeted as part of longer-term airport connectivity",
          },
          {
            status: "Subject to delivery",
            text: "Four main roads, northern residential infrastructure and North–South axis road segment expected to support Thu Thiem’s internal framework",
          },
          {
            status: "Existing / Planned",
            text: "Bridge and tunnel links supporting access to District 1 and Binh Thanh",
          },
        ],
        icon: "train",
        whyItMatters:
          "Improved connectivity may widen tenant access, shorten CBD travel friction and support long-term residential relevance.",
        visualType: "transport",
      },
      {
        id: "public-realm-lifestyle",
        title: "Riverfront Public Realm & Lifestyle",
        description:
          "Thu Thiem’s longer-term appeal is not only about towers. Riverfront public spaces, central square concepts, civic facilities and nearby international schools may help the district feel more complete for long-stay residents.",
        bullets: [
          {
            status: "Approved policy",
            text: "Central Square and HCMC Administrative Center investment policy approved",
          },
          {
            status: "Planned",
            text: "Riverfront public spaces and promenade concepts",
          },
          {
            status: "Existing",
            text: "Australian International School has a Thu Thiem campus",
          },
          {
            status: "Nearby ecosystem",
            text: "Former District 2 / Thu Duc City international-school ecosystem",
          },
          {
            status: "Indicative",
            text: "Access to private clinics and central hospitals across District 1, Binh Thanh and Thu Duc City should be verified before final publication",
          },
        ],
        icon: "trees",
        whyItMatters:
          "A stronger lifestyle and education ecosystem may support family tenants, executives and longer-stay overseas residents.",
        visualType: "lifestyle",
      },
      {
        id: "financial-commercial-pipeline",
        title: "Financial & Commercial Positioning",
        description:
          "Thu Thiem is increasingly positioned around financial services, Grade A office space, and mixed-use commercial development. This may support its role as an emerging business district beside the CBD.",
        bullets: [
          {
            status: "Existing",
            text: "The Hallmark: Grade A office in Thu Thiem New Urban Area",
          },
          {
            status: "Existing",
            text: "The METT: Class A office component within The Metropole Thu Thiem",
          },
          {
            status: "Under review",
            text: "Lotte Eco Smart City mixed-use project",
          },
          {
            status: "Planning theme",
            text: "International Financial Center planning theme",
          },
        ],
        icon: "briefcase",
        whyItMatters:
          "More office and mixed-use supply may create a broader professional tenant base and strengthen weekday demand around the district.",
        statusNote: "Proposed and under-review projects remain subject to official updates.",
        visualType: "commercial",
      },
      {
        id: "industry-direction",
        title: "Future Growth & Industry Direction",
        description:
          "The wider Eastern Zone / Thu Duc City planning context points toward finance, technology, education and knowledge-economy uses. For Thu Thiem, the most relevant themes are financial services, fintech and professional office demand.",
        bullets: [
          {
            status: "Planning theme",
            text: "VIFC-HCMC positions the city as Vietnam’s international financial gateway",
          },
          {
            status: "Planning theme",
            text: "Aviation Financial Hub, FinTech Hub, Maritime Financial Hub and global financial infrastructure",
          },
          {
            status: "Planning theme",
            text: "Cross-border payments, blockchain, AI in finance, digital assets and regulatory sandbox context",
          },
          {
            status: "Indicative",
            text: "These themes may support professional services and corporate tenant relevance",
          },
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
    shortPositioning: "Established expat lifestyle enclave within Thu Duc City.",
    masterPlanContext:
      "Thao Dien sits within the wider Thu Duc City / Eastern Zone context, connected to HCMC’s innovation, education, high-tech and financial services direction.",
    masterPlanShortContext:
      "Thao Dien sits within the wider Thu Duc City / Eastern Zone context, connected to HCMC’s innovation, education, high-tech and financial services direction.",
    heroQuickFacts: [
      { label: "District role", value: "Expat lifestyle hub" },
      { label: "CBD access", value: "Across the river from District 1" },
      { label: "Investor fit", value: "Rental lifestyle demand" },
      { label: "Rental profile", value: "Expat families and professionals" },
      { label: "Buyer type", value: "Lifestyle-led investors" },
      { label: "Residences", value: "selected residences" },
    ],
    basicInfo: {
      positioning: "Mature lifestyle district with international school and long-stay tenant demand.",
      suitableFor: ["Rental Income", "Lifestyle Buyers", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Lifestyle buyer", "Remote investor"],
      districtRole: "Expat lifestyle hub",
      planningTheme: "Education, international lifestyle, knowledge-economy support",
      investorRelevance: "Established expat lifestyle infrastructure may support long-term leasing interest",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["masteri-thao-dien"],
    exploreResidencesCtaLabel: "Explore Residences in Thao Dien",
    selectedResidencesTitle: "Selected Residences in Thao Dien",
    timeline: [
      {
        year: "2000s",
        title: "Former District 2 develops as expat residential area",
        description: "International residents and family-oriented amenities helped shape Thao Dien’s rental identity.",
        status: "Completed",
      },
      {
        year: "2010s",
        title: "International school ecosystem expands",
        description: "Education and lifestyle services strengthened the area’s family tenant appeal.",
        status: "Completed",
      },
      {
        year: "2020s",
        title: "Condo and serviced apartment supply matures",
        description: "Managed towers and serviced residences created a deeper leasing market.",
        status: "Completed",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Eastern Zone growth themes continue",
        description: "Thu Duc City planning themes may support longer-term residential relevance.",
        status: "Indicative",
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
    growthDrivers: [
      {
        id: "cbd-access-metro-connectivity",
        title: "CBD Access & Metro Connectivity",
        description:
          "Thao Dien benefits from its position across the Saigon River from District 1 and along HCMC’s eastern residential corridor.",
        bullets: [
          { status: "Existing", text: "Hanoi Highway / eastern corridor access" },
          { status: "Existing", text: "Saigon River connection to central districts" },
          { status: "Subject to delivery", text: "Metro Line 1 corridor relevance to Thao Dien / An Phu area" },
          { status: "Subject to delivery", text: "Ongoing eastern connectivity improvements" },
        ],
        icon: "train",
        whyItMatters:
          "Better connectivity may support commute-based rental demand from professionals working in central and eastern HCMC.",
        visualType: "transport",
      },
      {
        id: "international-schools-family-lifestyle",
        title: "International Schools & Family Lifestyle",
        description:
          "Thao Dien and nearby An Phu have one of HCMC’s strongest international-school and expat-family ecosystems.",
        bullets: [
          { status: "Existing", text: "International School Ho Chi Minh City in former District 2 / Thu Duc City" },
          { status: "Existing", text: "British International School Vietnam campuses in the area" },
          { status: "Existing", text: "European International School and German School in Thao Dien area" },
          { status: "Existing", text: "Cafes, restaurants, supermarkets and wellness facilities serving expat families" },
        ],
        icon: "trees",
        whyItMatters:
          "A strong education and lifestyle ecosystem may support family rental demand and longer-stay tenants.",
        visualType: "lifestyle",
      },
      {
        id: "expat-retail-hospitality-ecosystem",
        title: "Expat Retail & Hospitality Ecosystem",
        description:
          "Thao Dien is known for restaurants, boutiques, cafes, gyms and lifestyle services that support a higher-comfort rental environment.",
        bullets: [
          { status: "Existing", text: "Western and international dining clusters" },
          { status: "Existing", text: "Boutique retail, groceries and wellness services" },
          { status: "Existing", text: "Serviced apartment and condo rental ecosystem" },
          { status: "Existing", text: "International community presence" },
        ],
        icon: "briefcase",
        whyItMatters:
          "Lifestyle convenience may improve tenant retention and support rental appeal.",
        visualType: "commercial",
      },
      {
        id: "eastern-zone-long-term-positioning",
        title: "Eastern Zone Long-Term Positioning",
        description:
          "Thao Dien is not the formal financial district like Thu Thiem, but it benefits from the wider Eastern Zone / Thu Duc City direction.",
        bullets: [
          { status: "Planning context", text: "Eastern Zone focuses on innovation, education, high-tech, financial services, healthcare and eco-tourism" },
          { status: "Existing", text: "Established residential and expat community" },
          { status: "Indicative", text: "Lifestyle maturity differentiates Thao Dien from newer township districts" },
          { status: "Indicative", text: "Rental appeal depends on tenant preference, building quality and flood / traffic conditions" },
        ],
        icon: "network",
        whyItMatters:
          "Thao Dien may suit buyers seeking lifestyle-led rental demand rather than pure new-district capital growth.",
        visualType: "industry",
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
    shortPositioning: "Historic commercial core and CBD benchmark for Ho Chi Minh City.",
    masterPlanContext:
      "District 1 sits within HCMC’s central urban core, associated with administration, commerce, services, knowledge economy and creative industries.",
    masterPlanShortContext:
      "District 1 sits within HCMC’s central urban core, associated with administration, commerce, services, knowledge economy and creative industries.",
    heroQuickFacts: [
      { label: "District role", value: "Historic CBD and commercial core" },
      { label: "CBD access", value: "Core location" },
      { label: "Investor fit", value: "Prestige and rental resilience" },
      { label: "Rental profile", value: "Corporate and serviced-apartment demand" },
      { label: "Buyer type", value: "Prime-location buyers" },
      { label: "Residences", value: "selected residences nearby" },
    ],
    basicInfo: {
      positioning: "Core CBD district with office, retail, hospitality, and prestige value.",
      suitableFor: ["CBD exposure", "Prestige", "Overseas Buyers"],
      buyerProfiles: ["Capital growth buyer", "Lifestyle buyer", "Liquidity-focused investor"],
      districtRole: "Historic CBD and commercial core",
      planningTheme: "Commerce, services, knowledge economy, creative industries",
      investorRelevance: "Central commercial and administrative positioning may support long-term buyer interest and rental relevance",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: ["empire-city", "the-metropole-thu-thiem"],
    exploreResidencesCtaLabel: "Explore Residences in District 1",
    selectedResidencesTitle: "CBD-adjacent selected residences",
    timeline: [
      {
        year: "Historic",
        title: "Historic CBD and civic core established",
        description: "District 1 became the city’s central commercial and civic reference point.",
        status: "Completed",
      },
      {
        year: "2010s",
        title: "Retail, office and hospitality consolidation",
        description: "Office, hotel and retail clusters strengthened the district’s central role.",
        status: "Completed",
      },
      {
        year: "2020s",
        title: "Ben Thanh transit-node relevance",
        description: "Transit planning reinforces Ben Thanh’s importance as a central access point.",
        status: "Planned",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Central commercial positioning continues",
        description: "Commerce, services and creative-industry themes may keep District 1 relevant as a benchmark.",
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
    growthDrivers: [
      {
        id: "cbd-connectivity-walkability",
        title: "CBD Connectivity & Walkability",
        description:
          "District 1 remains the city’s central reference point, with strong access to offices, hotels, retail streets and heritage landmarks.",
        bullets: [
          { status: "Existing", text: "Nguyen Hue walking street and Dong Khoi commercial corridor" },
          { status: "Existing", text: "Central Post Office, Notre-Dame Cathedral area and historic civic core" },
          { status: "Existing", text: "Direct access to key office, hotel and retail clusters" },
          { status: "Existing", text: "Taxi, ride-hailing and future metro interchange relevance around Ben Thanh" },
        ],
        icon: "route",
        whyItMatters:
          "A central location may support corporate tenants, short-stay demand and prestige-driven buyers.",
        visualType: "transport",
      },
      {
        id: "retail-hospitality-lifestyle-core",
        title: "Retail, Hospitality & Lifestyle Core",
        description:
          "District 1 combines commercial, hospitality, dining, nightlife and cultural assets in a compact urban core.",
        bullets: [
          { status: "Existing", text: "Nguyen Hue and Dong Khoi retail / hospitality corridor" },
          { status: "Existing", text: "Ben Thanh Market tourism and transit node" },
          { status: "Existing", text: "Landmark hotels, serviced apartments and dining clusters" },
          { status: "Existing", text: "Cultural and historic attractions supporting visitor demand" },
        ],
        icon: "trees",
        whyItMatters:
          "Lifestyle depth may support serviced-apartment, corporate leasing and short-stay relevance.",
        visualType: "lifestyle",
      },
      {
        id: "commercial-office-demand",
        title: "Commercial & Office Demand",
        description:
          "District 1 remains one of HCMC’s strongest office and commercial areas, although new supply pressure may increasingly come from Thu Thiem and other growth districts.",
        bullets: [
          { status: "Existing", text: "Core CBD office clusters" },
          { status: "Existing", text: "Consulates, banks and corporate service providers" },
          { status: "Existing", text: "High street retail and hospitality demand" },
          { status: "Planning context", text: "Central Urban Zone role in commerce, services and knowledge economy" },
        ],
        icon: "briefcase",
        whyItMatters:
          "Office and service-sector demand may help sustain long-term rental relevance, while newer districts provide comparison points.",
        visualType: "commercial",
      },
      {
        id: "prime-location-supply-scarcity",
        title: "Prime Location & Supply Scarcity",
        description:
          "As a dense historic core, District 1 offers limited new residential supply compared with emerging districts.",
        bullets: [
          { status: "Existing", text: "Mature central urban fabric" },
          { status: "Existing", text: "Limited room for large new residential townships" },
          { status: "Existing", text: "Premium serviced apartment and luxury residence demand" },
          { status: "Indicative", text: "Scarcity may support long-term prime-location appeal" },
        ],
        icon: "network",
        whyItMatters:
          "Scarcity and centrality can make District 1 useful as a pricing and prestige benchmark.",
        visualType: "industry",
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
    shortPositioning: "Established south-side township and family-oriented residential hub.",
    masterPlanContext:
      "District 7 / Nha Be is positioned within HCMC’s southern water-based ecological city framework, with themes around knowledge economy, culture, exhibitions, logistics, eco-tourism and marine economy.",
    masterPlanShortContext:
      "District 7 / Nha Be is positioned within HCMC’s southern water-based ecological city framework, with themes around knowledge economy, culture, exhibitions, logistics, eco-tourism and marine economy.",
    heroQuickFacts: [
      { label: "District role", value: "Planned family township" },
      { label: "CBD access", value: "Southern HCMC corridor" },
      { label: "Investor fit", value: "Stable family rental demand" },
      { label: "Rental profile", value: "Families, professionals and expats" },
      { label: "Buyer type", value: "Long-stay rental investors" },
      { label: "Residences", value: "selected residences" },
    ],
    basicInfo: {
      positioning: "South Saigon residential district known for schools, healthcare, and family tenants.",
      suitableFor: ["Family rental market", "Stable income", "Overseas Buyers"],
      buyerProfiles: ["Rental income buyer", "Family tenant market", "Remote investor"],
      districtRole: "Planned family township",
      planningTheme: "Water-based ecological city, exhibitions, logistics, lifestyle services",
      investorRelevance: "Established international community and southern planning themes may support stable family rental demand",
    },
    rentalDemand: "High",
    selectedResidenceSlugs: [],
    exploreResidencesCtaLabel: "Explore Residences in District 7",
    selectedResidencesTitle: "Selected Residences in District 7",
    timeline: [
      {
        year: "2000s",
        title: "Phu My Hung planned urban area develops",
        description: "Saigon South’s planned amenities created a recognisable family lifestyle district.",
        status: "Completed",
      },
      {
        year: "2003",
        title: "District 7 established as an urban district",
        description: "Administrative development supported the area’s south-side urban identity.",
        status: "Completed",
      },
      {
        year: "2009",
        title: "Phu My Bridge opened",
        description: "The bridge improved east-side connectivity from the southern corridor.",
        status: "Completed",
      },
      sixZoneMilestone,
      {
        year: "2026+",
        title: "Southern Zone planning themes continue",
        description: "District 7 / Nha Be themes may support long-term family and lifestyle relevance.",
        status: "Indicative",
      },
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
    growthDrivers: [
      {
        id: "southern-corridor-connectivity",
        title: "Southern Corridor Connectivity",
        description:
          "District 7 is connected to HCMC’s southern corridor, with road links supporting access to central areas, Nha Be, Binh Chanh and logistics corridors.",
        bullets: [
          { status: "Existing", text: "Nguyen Van Linh Boulevard as a major southern corridor" },
          { status: "Existing", text: "Phu My Bridge connection toward Thu Duc / eastern side" },
          { status: "Existing", text: "Access toward District 1 via bridges and main roads" },
          { status: "Subject to congestion", text: "Travel time depends heavily on peak-hour traffic" },
        ],
        icon: "route",
        whyItMatters:
          "Connectivity shapes family rental preference and commute comfort.",
        visualType: "transport",
      },
      {
        id: "schools-healthcare-family-amenities",
        title: "Schools, Healthcare & Family Amenities",
        description:
          "District 7 / Phu My Hung is one of HCMC’s strongest family-oriented residential zones, supported by schools, hospitals, retail and open space.",
        bullets: [
          { status: "Existing", text: "International schools and bilingual education options around Phu My Hung" },
          { status: "Existing", text: "FV Hospital / private healthcare ecosystem in the area" },
          { status: "Existing", text: "Crescent Mall and Phu My Hung lifestyle amenities" },
          { status: "Existing", text: "Parks, walkable streets and planned-township environment" },
        ],
        icon: "trees",
        whyItMatters:
          "Family-oriented amenities may support stable long-stay rental demand.",
        visualType: "lifestyle",
      },
      {
        id: "planned-township-lifestyle-depth",
        title: "Planned Township & Lifestyle Depth",
        description:
          "Phu My Hung is one of Vietnam’s best-known planned urban areas and provides a mature residential environment.",
        bullets: [
          { status: "Existing", text: "Phu My Hung / Saigon South planned urban area" },
          { status: "Existing", text: "Walkable streets, lakes, parks and retail clusters" },
          { status: "Existing", text: "Established condominium and townhouse communities" },
          { status: "Existing", text: "Strong reputation among families and long-stay residents" },
        ],
        icon: "building",
        whyItMatters:
          "A mature township can reduce lifestyle uncertainty for overseas landlords and tenants.",
        visualType: "commercial",
      },
      {
        id: "southern-zone-long-term-positioning",
        title: "Southern Zone Long-Term Positioning",
        description:
          "The Southern Zone master plan context points toward a water-based ecological city with knowledge economy, exhibitions, culture, logistics and marine economy themes.",
        bullets: [
          { status: "Planning context", text: "District 7 – Nha Be Southern Zone" },
          { status: "Planning context", text: "Knowledge economy, arts, exhibitions and entertainment themes" },
          { status: "Planning context", text: "Logistics and marine-economy relevance" },
          { status: "Indicative", text: "Long-term appeal depends on infrastructure delivery and supply quality" },
        ],
        icon: "network",
        whyItMatters:
          "District 7 may suit investors looking for mature family rental demand rather than pure CBD prestige.",
        visualType: "industry",
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
