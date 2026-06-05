import { FeaturedPropertyCarousel } from "@/components/featured-property-carousel";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectInvestmentTool } from "@/components/project-investment-tool";
import { getBuyerGoalBySlug } from "@/data/buyer-goals";
import { getDistrictInsightByFilter } from "@/data/district-insights";
import { getProjects } from "@/services/projectService";

type PropertiesPageProps = {
  searchParams: Promise<{
    goal?: string;
    city?: string;
    district?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { district, goal } = await searchParams;
  const projects = await getProjects();
  const buyerGoal = getBuyerGoalBySlug(goal);
  const districtInsight = district ? getDistrictInsightByFilter(district) : undefined;

  return (
    <>
      <Header />
      <main>
        <FeaturedPropertyCarousel />
        <section className="px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <ProjectInvestmentTool
              buyerGoal={buyerGoal}
              initialDistrictFilter={districtInsight}
              projects={projects}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
