import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "project-empire-city",
    slug: "empire-city",
    projectName: "Empire City",
    city: "Ho Chi Minh City",
    district: "Thu Thiem",
    developer: "Empire City Vietnam",
    projectType: "Mixed-use luxury residential development",
    listedAt: "2026-05-19",
    completionStatus: "New Builds",
    completionYear: "Selected towers completed; future phases subject to project schedule",
    yearBuilt: "2024+",
    description:
      "A premium Thu Thiem project positioned for buyers seeking central Ho Chi Minh City exposure, riverfront lifestyle, and long-term liquidity near the emerging financial district.",
    investmentThesis:
      "Empire City may appeal to international investors because Thu Thiem combines new infrastructure, office demand, and a limited pipeline of central riverfront residential stock. Rental and resale assumptions remain indicative and subject to unit-level due diligence.",
    developerProfile:
      "The development is associated with a large-scale mixed-use masterplan in Thu Thiem. Buyers should independently review tower-level delivery, management standards, and sales documentation before reservation.",
    locationHighlights: [
      "Fast access to District 1 through Thu Thiem bridge connections",
      "Close to planned office, retail, and financial district activity",
      "Riverfront setting with strong expatriate and executive tenant appeal",
    ],
    targetBuyerTypes: ["Capital Growth", "Remote Ownership", "Rental Income"],
    foreignOwnershipStatus: "Advisor confirmation needed",
    foreignQuotaNote:
      "Foreign quota availability varies by tower and unit. Legal review and developer confirmation should be completed before deposit.",
    averageYieldRange: "4.8% - 5.4%",
    indicativeGrowth: "3% - 5% p.a.",
    timeToCbdMinutes: 8,
    investmentScore: 8.7,
    riskRating: "Medium",
    liquidity: "High",
    rentalDemand: "Very high",
    verifiedStatus: "Enhanced due diligence",
    verifiedSummary:
      "Project positioning and rental demand reviewed; tower-level quota and legal documents require final advisor checks.",
    verifiedChecks: {
      foreignQuotaChecked: false,
      developerReviewed: true,
      legalReviewed: true,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/projects/empire-city-riverside-hero.png",
    galleryImages: [
      "/mock-images/projects/empire-city-riverside-hero.png",
      "/mock-images/projects/thu-thiem-river-residence.jpg",
      "/mock-images/units/saigon-river-view.svg",
      "/mock-images/units/rooftop-pool.svg",
    ],
    amenities: ["Riverside promenade", "Pool", "Gym", "Lobby", "Retail", "Security"],
    keyRisks: [
      "Premium entry pricing compared with non-core districts",
      "Foreign quota availability must be confirmed by tower",
      "Rental yield depends on furnishing, management quality, and tenant positioning",
    ],
    investmentCase: [
      {
        icon: "river",
        title: "Riverside Positioning & CBD Demand",
        titleZh: "河畔定位及 CBD 需求",
        description:
          "Empire City combines a central Thu Thiem riverfront address with proximity to District 1, appealing to tenants seeking contemporary homes, more space and convenient CBD access.",
        descriptionZh:
          "Empire City 位於守添核心河畔，鄰近第一郡，吸引重視現代住宅、較寬敞空間及便捷 CBD 連接的租客。",
      },
      {
        icon: "infrastructure",
        title: "Infrastructure & District Transformation",
        titleZh: "基建及區域轉型",
        description:
          "Bridge links, metro planning, civic investment and wider Thu Thiem development may support the district's gradual transformation into a premium urban extension of the CBD.",
        descriptionZh:
          "橋樑連接、地鐵規劃、市政投資及守添整體發展，或有助區域逐步轉型為 CBD 的高端城市延伸。",
      },
      {
        icon: "supply",
        title: "Premium Supply & Professional Demand",
        titleZh: "優質供應及專業人士需求",
        description:
          "Selective high-quality riverside supply, together with demand from professionals and international residents, makes project quality, tower selection and rental positioning particularly important.",
        descriptionZh:
          "優質河畔住宅供應具選擇性，加上專業人士及國際居民需求，令項目質素、座數選擇及租務定位尤其重要。",
      },
    ],
    riskConsiderations: [
      {
        icon: "quota",
        title: "Tower-level foreign quota",
        titleZh: "各座外國買家配額",
        description:
          "Foreign ownership availability varies by tower and unit. Buyers should verify quota and complete legal review before any deposit.",
        descriptionZh:
          "外國買家持有額度因座數及單位而異。買家應在落訂前核實配額並完成法律審查。",
      },
      {
        icon: "pricing",
        title: "Premium entry pricing",
        titleZh: "較高入場價",
        description:
          "Central riverfront pricing sits above non-core districts, so rent and resale assumptions should be assessed conservatively.",
        descriptionZh:
          "核心河畔定價高於非核心區域，租金及轉售假設應以審慎態度評估。",
      },
      {
        icon: "handover",
        title: "Phased delivery & handover",
        titleZh: "分期交付及收樓",
        description:
          "Selected towers are complete while future phases remain subject to the project schedule, which buyers should confirm before committing.",
        descriptionZh:
          "部分座數已落成，未來分期仍視乎項目進度，買家應在落實前確認。",
      },
      {
        icon: "management",
        title: "Rental performance depends on management",
        titleZh: "租務表現取決於管理",
        description:
          "Achievable yield may depend on furnishing, management quality and tenant positioning, and can vary by unit and tower.",
        descriptionZh:
          "可達租金回報或取決於裝修、管理質素及租客定位，並因應單位及座數而有所不同。",
      },
    ],
    availableUnits: [
      {
        id: "empire-2br-river",
        slug: "ec-2br-river-view",
        unitName: "2-Bedroom River View Residence",
        unitType: "2-bedroom river view",
        bedrooms: 2,
        bathrooms: 2,
        sizeSqm: 82,
        floorLevel: "High floor",
        viewType: "River view",
        orientation: "South-East",
        priceUsd: 468000,
        estimatedMonthlyRentUsd: 2100,
        estimatedGrossYield: "5.0% - 5.4%",
        unitImage: "/mock-images/units/saigon-river-view.svg",
        heroImage: "/mock-images/units/saigon-river-view.svg",
        unitImages: [
          "/mock-images/units/saigon-river-view.svg",
          "/mock-images/units/premium-living-room.svg",
          "/mock-images/units/luxury-lobby.svg",
          "/mock-images/units/rooftop-pool.svg",
          "/mock-images/projects/empire-city-riverside-hero.png",
        ],
        floorPlanImage: "/mock-images/floorplans/floorplan-2br.svg",
        floorPlan3DImage: "/mock-images/floorplans/floorplan-3d-2br.svg",
        vrTourUrl: "#",
        shortDescription:
          "A river-facing two-bedroom layout designed for long-stay executive leasing and remote ownership.",
        unitHighlights: [
          "River-facing living space",
          "Efficient two-bedroom flow",
          "Comfortable layout for longer stays",
        ],
        includedFeatures: ["Balcony", "Open kitchen", "Primary ensuite", "Smart storage"],
        floorRange: "Mid to high floor",
        furnishingStatus: "Optional furnishing",
        furnishingPackage: "Optional furniture and living setup can be coordinated after purchase.",
        availabilityStatus: "Indicative availability",
        paymentPlan: "Reservation, SPA, completion balance",
        bestFor: "Executive rental demand",
        notes: "Subject to tower-level quota and legal document review.",
        rentalStrategy:
          "Best suited to regional professionals, expat couples, or long-term tenants seeking central riverside access.",
        foreignBuyerNote:
          "Unit-level legal and foreign quota review is recommended before reservation.",
        paymentNote:
          "Payment timing is indicative and should be reviewed with advisor support before reservation.",
        tenantFit: "Professionals and long-stay couples",
        tenantFitZh: "專業人士及長租夫婦",
        investmentFit:
          "Premium river-view positioning for buyers prioritising long-term quality and rental appeal.",
        investmentFitZh: "河景優質定位，適合重視長線質素及租務吸引力的買家。",
      },
      {
        id: "empire-1br-core",
        slug: "ec-1br-city-view",
        unitName: "1-Bedroom City View Suite",
        unitType: "1-bedroom city view",
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 55,
        floorLevel: "Mid floor",
        viewType: "City view",
        orientation: "North-East",
        priceUsd: 318000,
        estimatedMonthlyRentUsd: 1350,
        estimatedGrossYield: "4.9% - 5.2%",
        unitImage: "/mock-images/units/premium-living-room.svg",
        heroImage: "/mock-images/units/premium-living-room.svg",
        unitImages: [
          "/mock-images/units/premium-living-room.svg",
          "/mock-images/units/luxury-lobby.svg",
          "/mock-images/units/saigon-river-view.svg",
          "/mock-images/projects/night-skyline.svg",
        ],
        floorPlanImage: "/mock-images/floorplans/floorplan-1br.svg",
        floorPlan3DImage: "/mock-images/floorplans/floorplan-3d-1br.svg",
        vrTourUrl: "#",
        shortDescription:
          "A compact city-view unit with a lower entry point for first-time overseas investors.",
        unitHighlights: [
          "Lower entry point",
          "Simple city-view layout",
          "Easy to understand for remote owners",
        ],
        includedFeatures: ["Open kitchen", "Flexible living area", "Efficient storage"],
        floorRange: "Selected mid floors",
        furnishingStatus: "Unfurnished",
        furnishingPackage: "Optional furnishing package can be coordinated after purchase",
        availabilityStatus: "Limited mock stock",
        paymentPlan: "Indicative staged payment",
        bestFor: "Remote ownership",
        notes: "Smaller ticket size may support broader resale audience.",
        rentalStrategy:
          "Positioned for single professionals seeking a modern base near the emerging financial district.",
        foreignBuyerNote:
          "Unit-level legal and foreign quota review is recommended before reservation.",
        paymentNote:
          "Indicative payment steps should be confirmed with advisor and local legal support.",
        tenantFit: "Single professionals and corporate tenants",
        tenantFitZh: "單身專業人士及企業租客",
        investmentFit:
          "Lower ticket size for buyers prioritising entry cost and remote ownership.",
        investmentFitZh: "較低入場門檻，適合重視成本及遙距持有的買家。",
      },
    ],
  },
  {
    id: "project-the-metropole-thu-thiem",
    slug: "the-metropole-thu-thiem",
    projectName: "The Metropole Thu Thiem",
    city: "Ho Chi Minh City",
    district: "Thu Thiem",
    developer: "SonKim Land",
    projectType: "Luxury condominium",
    listedAt: "2026-05-16",
    completionStatus: "New Builds",
    completionYear: "Selected phases completed; availability subject to unit stock",
    yearBuilt: "2023+",
    description:
      "A high-end Thu Thiem condominium project with strong brand recognition among foreign buyers seeking a central, lifestyle-led investment case.",
    investmentThesis:
      "The project may suit buyers prioritizing recognisable central positioning, professional tenant demand, and liquidity. Pricing assumptions should be benchmarked carefully against comparable Thu Thiem and District 1 assets.",
    developerProfile:
      "Developer profile and project quality should be reviewed alongside management standards, ownership documentation, and current resale or primary availability.",
    locationHighlights: [
      "Core Thu Thiem address opposite District 1",
      "Near riverfront public realm and future commercial activity",
      "Appeals to senior professionals and lifestyle tenants",
    ],
    targetBuyerTypes: ["Capital Growth", "Lifestyle Investment", "Remote Ownership"],
    foreignOwnershipStatus: "Quota review needed",
    foreignQuotaNote:
      "Quota may be limited in popular towers. Buyers should confirm eligibility before making any reservation payment.",
    averageYieldRange: "4.6% - 5.2%",
    indicativeGrowth: "3% - 5% p.a.",
    timeToCbdMinutes: 8,
    investmentScore: 8.5,
    riskRating: "Medium",
    liquidity: "High",
    rentalDemand: "High",
    verifiedStatus: "Enhanced due diligence",
    verifiedSummary:
      "Premium location and tenant demand reviewed; quota and pricing premium need project-level diligence.",
    verifiedChecks: {
      foreignQuotaChecked: false,
      developerReviewed: true,
      legalReviewed: true,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/projects/hcmc-skyline-exterior.svg",
    galleryImages: [
      "/mock-images/projects/hcmc-skyline-exterior.svg",
      "/mock-images/units/luxury-lobby.svg",
      "/mock-images/units/rooftop-pool.svg",
    ],
    amenities: ["Pool", "Gym", "Luxury lobby", "Security", "Retail access", "Riverside access"],
    keyRisks: [
      "High pricing requires disciplined rent and resale assumptions",
      "Foreign quota confirmation is essential",
      "Liquidity may vary by unit size and view premium",
    ],
    investmentCase: [
      {
        icon: "location",
        title: "Recognisable Central Address",
        titleZh: "具辨識度的核心地段",
        description:
          "A core Thu Thiem position opposite District 1 gives the project a recognisable central address that appeals to buyers prioritising prime location and liquidity.",
        descriptionZh:
          "項目位處守添核心、與第一郡相對，地段具辨識度，吸引重視優越位置及流通性的買家。",
      },
      {
        icon: "developer",
        title: "Branded Developer & Build Quality",
        titleZh: "品牌發展商及建築質素",
        description:
          "Association with an established developer (SonKim Land) positions the project around brand recognition and build quality, which buyers should still confirm at tower level.",
        descriptionZh:
          "項目由知名發展商 SonKim Land 開發，以品牌認受性及建築質素定位，買家仍應於座數層面核實。",
      },
      {
        icon: "tenant",
        title: "Professional & Lifestyle Tenant Appeal",
        titleZh: "專業人士及生活方式租客",
        description:
          "Lifestyle-led positioning and proximity to the riverfront public realm appeal to senior professionals and longer-stay tenants seeking central living.",
        descriptionZh:
          "以生活方式為主導的定位及鄰近河畔公共空間，吸引尋求核心生活的高級專業人士及長租租客。",
      },
    ],
    riskConsiderations: [
      {
        icon: "pricing",
        title: "Pricing premium needs benchmarking",
        titleZh: "溢價需作對比",
        description:
          "The location premium should be benchmarked carefully against comparable Thu Thiem and District 1 stock before committing.",
        descriptionZh:
          "落實前應將地段溢價與守添及第一郡同類單位審慎對比。",
      },
      {
        icon: "quota",
        title: "Quota in popular towers",
        titleZh: "熱門座數配額",
        description:
          "Foreign quota may be limited in popular towers; buyers should confirm eligibility before making any reservation payment.",
        descriptionZh:
          "熱門座數的外國買家配額或有限，買家應在支付任何留位款項前確認資格。",
      },
      {
        icon: "liquidity",
        title: "Liquidity varies by unit",
        titleZh: "流通性因單位而異",
        description:
          "Resale liquidity may vary by unit size and view premium, so exit assumptions should be assessed by unit type.",
        descriptionZh:
          "轉售流通性或因單位面積及景觀溢價而異，退出假設應按單位類型評估。",
      },
    ],
    availableUnits: [
      {
        id: "metropole-2br",
        unitType: "2-bedroom apartment",
        bedrooms: 2,
        bathrooms: 2,
        sizeSqm: 78,
        priceUsd: 492000,
        estimatedMonthlyRentUsd: 2050,
        estimatedGrossYield: "4.8% - 5.1%",
        unitImage: "/mock-images/units/luxury-lobby.svg",
        floorRange: "Mid floor",
        furnishingStatus: "Optional furnishing",
        availabilityStatus: "Advisor confirmation required",
        paymentPlan: "Indicative resale payment timeline",
        bestFor: "Lifestyle investment",
        notes: "Pricing premium should be compared with similar Thu Thiem stock.",
        tenantFit: "Senior professionals and long-stay tenants",
        tenantFitZh: "高級專業人士及長租租客",
        investmentFit:
          "Central branded positioning for buyers prioritising prime address and build quality.",
        investmentFitZh: "核心品牌定位，適合重視優越地段及建築質素的買家。",
      },
    ],
  },
  {
    id: "project-masteri-thao-dien",
    slug: "masteri-thao-dien",
    projectName: "Masteri Thao Dien",
    city: "Ho Chi Minh City",
    district: "Thao Dien",
    developer: "Masterise Homes",
    projectType: "Established condominium community",
    listedAt: "2026-05-12",
    completionStatus: "Pre-Owned",
    completionYear: "Completed",
    yearBuilt: "2016",
    description:
      "An established Thao Dien condominium community with mature rental demand from expatriates, international school families, and professionals.",
    investmentThesis:
      "Masteri Thao Dien may fit income-focused buyers looking for an easier-to-understand rental market, established amenities, and practical remote ownership. Unit condition, management fees, and lease comparables should be checked before purchase.",
    developerProfile:
      "The project is associated with a well-known residential brand. Buyers should still review building management, title documents, and current owner obligations.",
    locationHighlights: [
      "Thao Dien expatriate district with international amenities",
      "Convenient retail and lifestyle access",
      "Tenant pool includes families, teachers, and professionals",
    ],
    targetBuyerTypes: ["Rental Income", "Future Relocation", "Remote Ownership"],
    foreignOwnershipStatus: "Advisor confirmation needed",
    foreignQuotaNote:
      "As an established project, foreign ownership availability depends on current owner structure and building quota at time of transaction.",
    averageYieldRange: "5.0% - 5.8%",
    indicativeGrowth: "2% - 4% p.a.",
    timeToCbdMinutes: 18,
    investmentScore: 8.2,
    riskRating: "Low",
    liquidity: "High",
    rentalDemand: "Very high",
    verifiedStatus: "Verified",
    verifiedSummary:
      "Rental demand, management maturity, and district tenant profile reviewed; quota still subject to unit-level checks.",
    verifiedChecks: {
      foreignQuotaChecked: true,
      developerReviewed: true,
      legalReviewed: true,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/units/saigon-river-view.svg",
    galleryImages: [
      "/mock-images/units/saigon-river-view.svg",
      "/mock-images/units/premium-living-room.svg",
      "/mock-images/units/luxury-lobby.svg",
    ],
    amenities: ["Pool", "Gym", "Retail", "Security", "Parking", "Family facilities"],
    keyRisks: [
      "Older unit condition can affect rental performance",
      "Foreign quota must be checked for each transaction",
      "Rental competition requires good furnishing and management",
    ],
    investmentCase: [
      {
        icon: "rental",
        title: "Established Rental Ecosystem",
        titleZh: "成熟的租務生態",
        description:
          "As a completed community, Masteri Thao Dien offers an established rental market with visible tenant demand, giving remote owners clearer income visibility.",
        descriptionZh:
          "Masteri Thao Dien 為已落成社區，租務市場成熟、租客需求明顯，讓遙距業主對收入更有把握。",
      },
      {
        icon: "tenant",
        title: "Expat & International-School Families",
        titleZh: "外籍及國際學校家庭",
        description:
          "The Thao Dien district draws expatriates, teachers and international-school families, supporting a diverse and recognisable tenant pool.",
        descriptionZh:
          "Thao Dien 區吸引外籍人士、教師及國際學校家庭，租客來源多元且具辨識度。",
      },
      {
        icon: "remote",
        title: "Practical Remote Ownership",
        titleZh: "務實的遙距持有",
        description:
          "Mature amenities and an easier-to-understand resale market make it a practical option for overseas owners prioritising income visibility over speculative growth.",
        descriptionZh:
          "成熟配套及較易理解的轉售市場，令其成為重視收入可見度多於投機增長的海外業主的務實選擇。",
      },
    ],
    riskConsiderations: [
      {
        icon: "handover",
        title: "Older unit condition",
        titleZh: "單位樓齡狀況",
        description:
          "As an established project, unit condition can affect rental performance; furniture quality and lease history should be verified before purchase.",
        descriptionZh:
          "作為已落成項目，單位狀況或影響租務表現，購買前應核實傢俬質素及租約歷史。",
      },
      {
        icon: "quota",
        title: "Quota at transaction time",
        titleZh: "成交時的配額",
        description:
          "Foreign ownership availability depends on the current owner structure and building quota at the time of each transaction.",
        descriptionZh:
          "外國持有額度取決於每宗交易時的業主結構及大廈配額。",
      },
      {
        icon: "management",
        title: "Furnishing & management matter",
        titleZh: "裝修及管理影響",
        description:
          "Rental competition in a mature district means good furnishing and management are important to maintain occupancy and rent.",
        descriptionZh:
          "成熟區域競爭較大，良好裝修及管理對維持出租率及租金尤其重要。",
      },
    ],
    availableUnits: [
      {
        id: "masteri-2br",
        unitType: "2-bedroom apartment",
        bedrooms: 2,
        bathrooms: 2,
        sizeSqm: 70,
        priceUsd: 285000,
        estimatedMonthlyRentUsd: 1320,
        estimatedGrossYield: "5.2% - 5.6%",
        unitImage: "/mock-images/units/premium-living-room.svg",
        floorRange: "Middle floor",
        furnishingStatus: "Furnished",
        availabilityStatus: "Indicative resale unit",
        paymentPlan: "Deposit, notarisation, transfer",
        bestFor: "Stable rental income",
        notes: "Furniture quality and lease history should be verified.",
        tenantFit: "Professionals and small families",
        tenantFitZh: "專業人士及小家庭",
        investmentFit:
          "Furnished, income-ready positioning for buyers prioritising stable rental visibility.",
        investmentFitZh: "連傢俬、即可出租定位，適合重視穩定租務的買家。",
      },
      {
        id: "masteri-3br",
        unitType: "3-bedroom family apartment",
        bedrooms: 3,
        bathrooms: 2,
        sizeSqm: 95,
        priceUsd: 398000,
        estimatedMonthlyRentUsd: 1850,
        estimatedGrossYield: "5.1% - 5.5%",
        unitImage: "/mock-images/units/district-seven-family-residence.jpg",
        floorRange: "High floor",
        furnishingStatus: "Part-furnished",
        availabilityStatus: "Mock availability",
        paymentPlan: "Negotiated resale schedule",
        bestFor: "Family tenants",
        notes: "Best suited for school and family tenant demand.",
        tenantFit: "Families seeking additional space",
        tenantFitZh: "重視較大空間的家庭租客",
        investmentFit:
          "Larger layout positioned for family and longer-stay tenant demand.",
        investmentFitZh: "較大戶型，定位於家庭及長租租客需求。",
      },
    ],
  },
  {
    id: "project-vinhomes-grand-park",
    slug: "vinhomes-grand-park",
    projectName: "Vinhomes Grand Park",
    city: "Ho Chi Minh City",
    district: "Thu Duc",
    developer: "Vinhomes",
    projectType: "Large-scale township",
    listedAt: "2026-05-08",
    completionStatus: "New Builds",
    completionYear: "Multiple phases delivered; selected stock subject to phase",
    yearBuilt: "2021+",
    description:
      "A large-scale Thu Duc township positioned for buyers seeking lower entry pricing, broad amenities, and long-term infrastructure-led growth.",
    investmentThesis:
      "The project may appeal to entry-price and growth-focused investors, but assumptions should account for township supply, tenant absorption, and phase-by-phase liquidity differences.",
    developerProfile:
      "The project is associated with a major Vietnam residential developer. Buyers should review phase-specific handover quality, management fees, and rental competition.",
    locationHighlights: [
      "Large township environment with parks and retail amenities",
      "Thu Duc growth corridor with improving infrastructure",
      "Lower entry pricing than central HCMC districts",
    ],
    targetBuyerTypes: ["Capital Growth", "Rental Income", "Remote Ownership"],
    foreignOwnershipStatus: "Foreigner-eligible",
    foreignQuotaNote:
      "Selected foreign quota may be available, subject to phase, tower, and developer confirmation before reservation.",
    averageYieldRange: "5.2% - 6.0%",
    indicativeGrowth: "3% - 5% p.a.",
    timeToCbdMinutes: 35,
    investmentScore: 7.9,
    riskRating: "Medium",
    liquidity: "Moderate",
    rentalDemand: "High",
    verifiedStatus: "Pre-check",
    verifiedSummary:
      "Township demand and entry pricing reviewed; phase-level supply and quota require detailed diligence.",
    verifiedChecks: {
      foreignQuotaChecked: true,
      developerReviewed: true,
      legalReviewed: false,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/units/rooftop-pool.svg",
    galleryImages: [
      "/mock-images/units/rooftop-pool.svg",
      "/mock-images/projects/hcmc-sky-view.png",
      "/mock-images/units/premium-living-room.svg",
    ],
    amenities: ["Park access", "Pool", "Gym", "Retail", "Security", "Parking"],
    keyRisks: [
      "Large supply pipeline can pressure rents",
      "Resale liquidity may vary across phases",
      "Infrastructure timing can affect growth assumptions",
    ],
    investmentCase: [
      {
        icon: "pricing",
        title: "Lower Entry Point for HCMC Exposure",
        titleZh: "較低入場門檻參與胡志明市",
        description:
          "Township pricing sits below central HCMC districts, offering a lower capital requirement for buyers seeking entry-level exposure to the city's growth.",
        descriptionZh:
          "township 定價低於胡志明市核心區域，為希望以較低資金參與城市增長的買家提供入門選擇。",
      },
      {
        icon: "amenities",
        title: "Large Mixed-Use Township Amenities",
        titleZh: "大型綜合社區配套",
        description:
          "Parks, retail and extensive on-site amenities within a large township environment may support tenant appeal across a broad renter base.",
        descriptionZh:
          "大型社區環境內的公園、零售及完善配套，或有助提升對廣泛租客的吸引力。",
      },
      {
        icon: "infrastructure",
        title: "Thu Duc Growth-Corridor Long-Hold",
        titleZh: "守德增長走廊長線持有",
        description:
          "Positioned in the Thu Duc growth corridor with improving infrastructure, the project may suit long-hold investors comfortable with a longer horizon.",
        descriptionZh:
          "項目位處基建持續改善的守德增長走廊，或適合能接受較長投資年期的長線投資者。",
      },
    ],
    riskConsiderations: [
      {
        icon: "supply",
        title: "Large supply pipeline",
        titleZh: "龐大供應管道",
        description:
          "A large township supply pipeline can pressure rents and absorption, so rental assumptions should be set conservatively.",
        descriptionZh:
          "大型社區供應管道或對租金及去化造成壓力，租金假設宜審慎設定。",
      },
      {
        icon: "liquidity",
        title: "Phase-dependent liquidity",
        titleZh: "流通性視乎分期",
        description:
          "Resale liquidity may vary across phases and towers; buyers should compare phase-specific handover quality and management.",
        descriptionZh:
          "轉售流通性或因不同分期及座數而異，買家應比較各期的交付質素及管理。",
      },
      {
        icon: "infrastructure",
        title: "Infrastructure timing",
        titleZh: "基建時間表",
        description:
          "Growth assumptions may depend on infrastructure timing in the corridor, which remains subject to delivery.",
        descriptionZh:
          "增長假設或取決於走廊內的基建時間表，仍視乎實際落實。",
      },
    ],
    availableUnits: [
      {
        id: "grandpark-1br",
        unitType: "1-bedroom apartment",
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 47,
        priceUsd: 138000,
        estimatedMonthlyRentUsd: 680,
        estimatedGrossYield: "5.5% - 5.9%",
        unitImage: "/mock-images/projects/hcmc-skyline-exterior.svg",
        floorRange: "Selected tower floors",
        furnishingStatus: "Unfurnished",
        availabilityStatus: "Mock primary stock",
        paymentPlan: "Reservation and staged developer payment",
        bestFor: "Entry price and growth",
        notes: "Rental assumptions depend on furnishing and tenant absorption.",
        tenantFit: "Young professionals and singles",
        tenantFitZh: "年輕專業人士及單身租客",
        investmentFit:
          "Lowest ticket size for buyers prioritising entry cost and a smaller initial outlay.",
        investmentFitZh: "最低入場門檻，適合重視成本及較低初期投入的買家。",
      },
      {
        id: "grandpark-2br",
        unitType: "2-bedroom apartment",
        bedrooms: 2,
        bathrooms: 2,
        sizeSqm: 68,
        priceUsd: 198000,
        estimatedMonthlyRentUsd: 900,
        estimatedGrossYield: "5.2% - 5.6%",
        unitImage: "/mock-images/units/rooftop-pool.svg",
        floorRange: "Mid floor",
        furnishingStatus: "Optional furnishing",
        availabilityStatus: "Indicative availability",
        paymentPlan: "Developer staged schedule",
        bestFor: "Young professional tenants",
        notes: "Compare tower management quality before reservation.",
        tenantFit: "Young professionals and couples",
        tenantFitZh: "年輕專業人士及夫婦",
        investmentFit:
          "Lower entry cost with broad amenities for buyers prioritising affordability.",
        investmentFitZh: "入場成本較低、配套廣泛，適合重視負擔能力的買家。",
      },
    ],
  },
  {
    id: "project-lumi-hanoi",
    slug: "lumi-hanoi",
    projectName: "Lumi Hanoi",
    city: "Hanoi",
    district: "Nam Tu Liem",
    developer: "CapitaLand Development",
    projectType: "Integrated residential development",
    listedAt: "2026-05-14",
    completionStatus: "In Construction",
    completionYear: "Indicative handover subject to construction progress",
    yearBuilt: "2026 est.",
    description:
      "A western Hanoi project positioned around newer infrastructure, business district access, and professional tenant demand.",
    investmentThesis:
      "Lumi Hanoi may suit buyers looking for a newer Hanoi growth corridor with business park tenant demand. Construction status, payment schedule, and handover assumptions require legal and technical review.",
    developerProfile:
      "Developer profile is a key part of the investment case. Buyers should review project-specific permits, payment protections, and delivery milestones.",
    locationHighlights: [
      "Western Hanoi growth corridor",
      "Access to business parks and new commercial clusters",
      "Tenant demand from Korean, Japanese, and local professionals",
    ],
    targetBuyerTypes: ["Capital Growth", "Rental Income", "Remote Ownership"],
    foreignOwnershipStatus: "Foreigner-eligible",
    foreignQuotaNote:
      "Foreign quota is indicative only and must be verified with project sales and legal teams before reservation.",
    averageYieldRange: "5.0% - 5.7%",
    indicativeGrowth: "3% - 5% p.a.",
    timeToCbdMinutes: 25,
    investmentScore: 8.0,
    riskRating: "Medium",
    liquidity: "Moderate",
    rentalDemand: "High",
    verifiedStatus: "Pre-check",
    verifiedSummary:
      "Western Hanoi tenant demand reviewed; construction, escrow, and contract terms require further review.",
    verifiedChecks: {
      foreignQuotaChecked: true,
      developerReviewed: true,
      legalReviewed: false,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/districts/my-dinh-business-park-residence.jpg",
    galleryImages: [
      "/mock-images/districts/my-dinh-business-park-residence.jpg",
      "/mock-images/projects/night-skyline.svg",
      "/mock-images/units/luxury-lobby.svg",
    ],
    amenities: ["Pool", "Gym", "Co-working", "Retail", "Security", "Parking"],
    keyRisks: [
      "Construction and handover timing should be monitored",
      "Rental demand depends on western Hanoi absorption",
      "Future resale liquidity may need time to mature",
    ],
    investmentCase: [
      {
        icon: "business",
        title: "Western-Hanoi Business-Park Demand",
        titleZh: "河內西部商務園需求",
        description:
          "The project is positioned for the western Hanoi growth corridor, with tenant demand from Korean, Japanese and local professionals working near new commercial clusters.",
        descriptionZh:
          "項目定位於河內西部增長走廊，租客需求來自在新商業群附近工作的韓國、日本及本地專業人士。",
      },
      {
        icon: "developer",
        title: "Newer Integrated Product",
        titleZh: "較新的綜合產品",
        description:
          "A newer integrated development from CapitaLand may appeal to professional tenants, though delivery milestones should be reviewed independently.",
        descriptionZh:
          "由 CapitaLand 開發的較新綜合項目或吸引專業租客，惟交付里程碑應獨立審視。",
      },
      {
        icon: "payment",
        title: "Construction-Linked Payment Planning",
        titleZh: "與工程進度掛鈎的付款規劃",
        description:
          "A construction-linked payment schedule may help buyers plan capital deployment over the build period, subject to contract terms.",
        descriptionZh:
          "與工程進度掛鈎的付款安排，或有助買家在建築期內規劃資金部署，惟須視乎合約條款。",
      },
    ],
    riskConsiderations: [
      {
        icon: "handover",
        title: "Construction & handover risk",
        titleZh: "施工及收樓風險",
        description:
          "As an in-construction project, construction status, payment protections and handover timing should be monitored and reviewed before reservation.",
        descriptionZh:
          "作為在建項目，施工進度、付款保障及收樓時間應在留位前持續監察及審視。",
      },
      {
        icon: "legal",
        title: "Contract & escrow review",
        titleZh: "合約及託管審查",
        description:
          "Project-specific permits, escrow arrangements and contract terms require independent legal review before any commitment.",
        descriptionZh:
          "項目專屬許可、資金託管安排及合約條款，須在任何承諾前進行獨立法律審查。",
      },
      {
        icon: "rental",
        title: "Absorption depends on the corridor",
        titleZh: "去化取決於走廊發展",
        description:
          "Rental demand and future resale liquidity may depend on western Hanoi absorption, which may need time to mature.",
        descriptionZh:
          "租務需求及未來轉售流通性或取決於河內西部的去化情況，可能需時成熟。",
      },
    ],
    availableUnits: [
      {
        id: "lumi-1br",
        unitType: "1-bedroom apartment",
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 52,
        priceUsd: 168000,
        estimatedMonthlyRentUsd: 760,
        estimatedGrossYield: "5.2% - 5.6%",
        unitImage: "/mock-images/districts/my-dinh-business-park-residence.jpg",
        floorRange: "Selected mid floors",
        furnishingStatus: "Unfurnished",
        availabilityStatus: "Indicative launch stock",
        paymentPlan: "Construction-linked payment schedule",
        bestFor: "First-time overseas investor",
        notes: "Legal review recommended before reservation.",
        tenantFit: "Single professionals and corporate tenants",
        tenantFitZh: "單身專業人士及企業租客",
        investmentFit:
          "New-build positioning for first-time overseas buyers prioritising entry cost.",
        investmentFitZh: "全新項目定位，適合重視入場成本的首次海外買家。",
      },
    ],
  },
  {
    id: "project-heritage-west-lake",
    slug: "heritage-west-lake",
    projectName: "Heritage West Lake",
    city: "Hanoi",
    district: "Tay Ho",
    developer: "CapitaLand Development",
    projectType: "Luxury lakeside residence",
    listedAt: "2026-05-03",
    completionStatus: "New Builds",
    completionYear: "Selected stock subject to project and unit availability",
    yearBuilt: "2024+",
    description:
      "A premium Tay Ho project positioned for diplomatic, executive, and lifestyle tenant demand near West Lake.",
    investmentThesis:
      "Heritage West Lake may appeal to income-led and lifestyle investors who value Hanoi's diplomatic rental corridor. Yield should be assessed conservatively because premium pricing may compress headline returns.",
    developerProfile:
      "Buyers should review tower-level ownership availability, management standards, and rental comparables before making any commitment.",
    locationHighlights: [
      "West Lake lifestyle and diplomatic district appeal",
      "Close to embassies, international schools, and serviced offices",
      "Premium tenant profile for long-stay furnished leasing",
    ],
    targetBuyerTypes: ["Rental Income", "Lifestyle Investment", "Future Relocation"],
    foreignOwnershipStatus: "Advisor confirmation needed",
    foreignQuotaNote:
      "Premium Hanoi projects can have limited foreign quota. Availability should be confirmed before reservation.",
    averageYieldRange: "4.4% - 5.0%",
    indicativeGrowth: "2% - 4% p.a.",
    timeToCbdMinutes: 15,
    investmentScore: 8.1,
    riskRating: "Low",
    liquidity: "Moderate",
    rentalDemand: "High",
    verifiedStatus: "Enhanced due diligence",
    verifiedSummary:
      "Lifestyle rental demand and district profile reviewed; foreign quota requires final confirmation.",
    verifiedChecks: {
      foreignQuotaChecked: false,
      developerReviewed: true,
      legalReviewed: true,
      rentalDemandReviewed: true,
      riskLevelReviewed: true,
    },
    heroImage: "/mock-images/districts/west-lake-diplomatic-suite.jpg",
    galleryImages: [
      "/mock-images/districts/west-lake-diplomatic-suite.jpg",
      "/mock-images/units/premium-living-room.svg",
      "/mock-images/projects/night-skyline.svg",
    ],
    amenities: ["Lake access", "Pool", "Gym", "Luxury lobby", "Security", "Parking"],
    keyRisks: [
      "Premium pricing may reduce gross yield",
      "Foreign quota availability needs confirmation",
      "Resale market is more selective than mass-market stock",
    ],
    investmentCase: [
      {
        icon: "diplomatic",
        title: "Tay Ho Diplomatic Rental Corridor",
        titleZh: "西湖外交租務走廊",
        description:
          "Tay Ho draws deep expatriate and diplomatic tenant demand near embassies, international schools and serviced offices, supporting a recognisable rental corridor.",
        descriptionZh:
          "西湖鄰近大使館、國際學校及服務式辦公室，外籍及外交租客需求深厚，形成具辨識度的租務走廊。",
      },
      {
        icon: "lake",
        title: "Premium Lakeside Positioning",
        titleZh: "優質湖畔定位",
        description:
          "Premium lakeside positioning near West Lake can support defensive rental appeal for long-stay furnished leasing to a senior tenant profile.",
        descriptionZh:
          "鄰近西湖的優質湖畔定位，或有助對長租連傢俬、高端租客群的防守型租務吸引力。",
      },
      {
        icon: "lifestyle",
        title: "Lifestyle & Income Combined",
        titleZh: "兼顧生活方式與收入",
        description:
          "The project suits buyers combining lifestyle and income objectives, though yield should be assessed conservatively given premium pricing.",
        descriptionZh:
          "項目適合同時兼顧生活方式與收入目標的買家，惟鑑於溢價定價，回報應審慎評估。",
      },
    ],
    riskConsiderations: [
      {
        icon: "pricing",
        title: "Premium pricing compresses yield",
        titleZh: "溢價定價壓縮回報",
        description:
          "Premium pricing may reduce gross yield, so income assumptions should be assessed conservatively against achievable lease levels.",
        descriptionZh:
          "溢價定價或降低毛回報，收入假設應對照可達租金水平審慎評估。",
      },
      {
        icon: "quota",
        title: "Quota needs confirmation",
        titleZh: "配額須確認",
        description:
          "Premium Hanoi projects can have limited foreign quota, so availability should be confirmed before reservation.",
        descriptionZh:
          "河內高端項目的外國買家配額或有限，留位前應確認可供額度。",
      },
      {
        icon: "liquidity",
        title: "More selective resale market",
        titleZh: "轉售市場較具選擇性",
        description:
          "The resale market is more selective than mass-market stock, which buyers should factor into exit planning.",
        descriptionZh:
          "轉售市場較大眾化單位更具選擇性，買家應於退出規劃中納入考量。",
      },
    ],
    availableUnits: [
      {
        id: "heritage-2br",
        unitType: "2-bedroom lake residence",
        bedrooms: 2,
        bathrooms: 2,
        sizeSqm: 86,
        priceUsd: 420000,
        estimatedMonthlyRentUsd: 1680,
        estimatedGrossYield: "4.6% - 4.9%",
        unitImage: "/mock-images/districts/west-lake-diplomatic-suite.jpg",
        floorRange: "High floor",
        furnishingStatus: "Optional furnishing",
        availabilityStatus: "Advisor confirmation required",
        paymentPlan: "Indicative developer payment schedule",
        bestFor: "Lifestyle income",
        notes: "Best suited to long-hold buyers with conservative yield assumptions.",
        tenantFit: "Executives and diplomatic tenants",
        tenantFitZh: "行政人員及外交租客",
        investmentFit:
          "Premium lakeside positioning for buyers combining lifestyle and income objectives.",
        investmentFitZh: "優質湖畔定位，適合兼顧生活方式及收入目標的買家。",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
