import Brief from "@/components/brief";
import QuoteDetails from "@/components/quote-details";
import CostsList from "@/components/costs-list";
import Terms from "@/components/terms";
import Cta from "@/components/cta";

export const metadata = {
  title: "Home - Quoty",
  description: "Page description",
};

export default async function Home() {
  const costs = [
    {
      title: "Competitive Analysis",
      description: "The client is looking to review the information.",
      price: 7800,
    },
    {
      title: "UX Research Reports",
      description: "The client is looking to review the information.",
      price: 2560,
    },
    {
      title: "Sitemap and Information Architecture",
      description: "The client is looking to review the information.",
      price: 1420,
    },
    {
      title: "UX Wireframes and User Flows",
      description: "The client is looking to review the information.",
      price: 3978,
    },
    {
      title: "Visual Design",
      description: "The client is looking to review the information.",
      price: 4476,
    },
    {
      title: "Interactive Prototypes + Assets Exports",
      description: "The client is looking to review the information.",
      price: 4326,
    },
  ];

  return (
    <>
      <div className="grow w-full max-w-xl mx-auto px-4 sm:px-6 py-12 lg:pt-24 lg:pb-20">
        <article className="divide-y divide-slate-100 dark:divide-slate-800 -mt-8 mb-4">
          <Brief>
            The client is looking to review and revamp the information
            architecture, user experience and user interface design of{" "}
            <strong className="text-slate-900 dark:text-slate-200 font-medium">
              The Markyk Corp.
            </strong>
            , a web application that connects landlords and tenants across
            Europe and America.
          </Brief>
          <QuoteDetails
            projectLength="4-8 Weeks"
            startDate="27 Jun, 2024"
            endDate="27 Aug, 2024"
          />
          <CostsList costs={costs} />
          <Terms />
        </article>
      </div>
      <Cta />
    </>
  );
}
