export type HcmcUrbanZone = {
  id: string;
  displayName: string;
  role: string;
};

export const HCMC_PLANNING_HORIZON =
  "HCMC master plan through 2040, vision towards 2060";

export const HCMC_MASTER_PLAN_SOURCE_STATUS = "Government master plan reference";

export const HCMC_MASTER_PLAN_SOURCE_NOTE =
  "Based on publicly reported HCMC six-zone master plan. District-level investment interpretation is indicative only.";

export const HCMC_MASTER_PLAN_CONTEXT_NOTE =
  "Planning context based on publicly reported HCMC master plan information. District interpretations are indicative and for research support only.";

export const HCMC_URBAN_ZONES: HcmcUrbanZone[] = [
  {
    id: "central-urban-zone",
    displayName: "Central Urban Zone",
    role:
      "Administrative, foreign affairs, commerce, services, knowledge-based economy, and creative industries hub.",
  },
  {
    id: "eastern-zone",
    displayName: "Eastern Zone / Thu Duc City",
    role:
      "Innovation and knowledge hub with education, high-tech industries, financial services, healthcare, and eco-tourism.",
  },
  {
    id: "western-zone",
    displayName: "Western Zone / Binh Chanh Urban Area",
    role:
      "Industrial city with commercial services, advanced technology, healthcare, biomedical centres, education, and training.",
  },
  {
    id: "northern-zone",
    displayName: "Northern Zone / Cu Chi – Hoc Mon Urban Area",
    role:
      "Multifunctional zone combining services, entertainment, culture, wellness, agricultural landscapes, industrial parks, education, technology, and eco-cultural tourism.",
  },
  {
    id: "southern-zone",
    displayName: "Southern Zone / District 7 – Nha Be Urban Area",
    role:
      "High-tech water-based ecological city focused on knowledge economy, arts and culture, exhibitions, entertainment, eco-tourism, industry, logistics, and marine economy.",
  },
  {
    id: "southeastern-zone",
    displayName: "Southeastern Zone / Can Gio Urban Area",
    role:
      "Ecological and marine gateway focused on innovation, marine economy, eco-tourism, leisure, commerce, ports, logistics, fisheries logistics, and aquaculture research.",
  },
];

export function getHcmcUrbanZone(id: string) {
  return HCMC_URBAN_ZONES.find((zone) => zone.id === id);
}
