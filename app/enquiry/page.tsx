import { EnquiryForm } from "@/components/enquiry-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageHeading } from "@/components/page-heading";

export default function EnquiryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow="Buyer enquiry"
            title="Tell us what you want to buy in Vietnam."
            description="This front-end form captures the fields needed for a future CRM, advisor workflow, and agent matching process."
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <EnquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
