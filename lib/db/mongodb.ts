// MongoDB connection placeholder for the future production backend.
// Keep this disabled during the MVP because the app currently uses local JSON mocks.

/*
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "vietnam_property_platform";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoDb(): Promise<Db> {
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const client = await clientPromise;
  return client.db(dbName);
}
*/

export async function getMongoDbPlaceholder() {
  throw new Error("MongoDB is not connected in the MVP. Use JSON-backed mock services for now.");
}

