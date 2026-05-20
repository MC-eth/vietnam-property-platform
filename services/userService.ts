import { getMockUsers } from "@/lib/repositories/mockRepository";

// Future MongoDB-backed implementation:
// const db = await getMongoDb();
// return db.collection<UserProfile>("users").find({}).toArray();
export async function getUsers() {
  return getMockUsers();
}

export async function getUserById(id: string) {
  return getMockUsers().find((user) => user.id === id);
}

