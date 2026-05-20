import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";
import { PropertyInvestmentTool } from "@/components/property-investment-tool";
import { getBuyerGoalBySlug } from "@/data/buyer-goals";
import { getProperties } from "@/services/propertyService";

type PropertiesPageProps = {
  searchParams: Promise<{
    goal?: string;
    city?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { goal } = await searchParams;
  const properties = await getProperties();
  const buyerGoal = getBuyerGoalBySlug(goal);

  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Investment screener"
            title="Compare Vietnam property opportunities by score, yield, risk, and liquidity."
            description="Use the local MVP data to filter, sort, shortlist, and compare residential investment opportunities in Ho Chi Minh City and Hanoi."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <PropertyInvestmentTool buyerGoal={buyerGoal} properties={properties} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
