import { getMockProperties } from "@/lib/repositories/mockRepository";
import { takeFirst } from "@/utils";

// Future MongoDB-backed implementation:
// const db = await getMongoDb();
// return db.collection<Property>("properties").find({}).toArray();
export async function getProperties() {
  return getMockProperties();
}

export async function getFeaturedProperties(limit = 3) {
  return takeFirst(await getProperties(), limit);
}

export async function getPropertyById(id: string) {
  const properties = await getProperties();

  return properties.find((property) => property.id === id);
}
