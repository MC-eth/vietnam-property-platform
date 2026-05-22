import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { T } from "@/components/localized-text";
import { PageHeading } from "@/components/page-heading";

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main>
        <section className="stone-surface px-5 py-14 sm:px-8 lg:py-20">
          <PageHeading
            eyebrow={<T k="fullDisclaimer" />}
            title={<T k="disclaimerTitle" />}
            description={<T k="disclaimerDescription" />}
          />
        </section>
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl rounded-sm border border-[#ECE7DA] bg-white p-6 text-sm leading-7 text-[#6B7280] shadow-sm sm:p-8">
            <p>
              <T k="fullDisclaimerBody" />
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
