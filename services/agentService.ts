import { getMockAgents } from "@/lib/repositories/mockRepository";
import type { Agent } from "@/types/agent";
import type { City } from "@/types/property";

// Future MongoDB-backed implementation:
// const db = await getMongoDb();
// return db.collection<Agent>("agents").find(city ? { markets: city, active: true } : { active: true }).toArray();
export async function getAvailableAgents(city?: City): Promise<Agent[]> {
  const agents = getMockAgents();

  return city
    ? agents.filter((agent) => agent.active && agent.markets.includes(city))
    : agents.filter((agent) => agent.active);
}
