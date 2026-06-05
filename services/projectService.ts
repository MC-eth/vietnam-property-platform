import { getProjectBySlug, projects } from "@/data/projects";

// Future backend integration point:
// const db = await getMongoDb();
// return db.collection<Project>("projects").find({}).toArray();
export async function getProjects() {
  return projects;
}

export async function getFeaturedProjects(limit = 3) {
  return projects.slice(0, limit);
}

export async function getProjectBySlugFromService(slug: string) {
  return getProjectBySlug(slug);
}
