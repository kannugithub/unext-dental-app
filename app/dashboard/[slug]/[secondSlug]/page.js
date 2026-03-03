import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/app/Components/DashboardComponent/MainDashboard"),
  { ssr: false }
);

export async function generateStaticParams() {
  const secondLevelPaths = [
    { slug: "patients", secondSlug: "all-patients" },
    { slug: "patients", secondSlug: "new-patients" },
    { slug: "patients", secondSlug: "re-calls" },
    { slug: "patients", secondSlug: "due-balance" },
    { slug: "patients", secondSlug: "overdue" },
    { slug: "call", secondSlug: "call-logs" },
    { slug: "call", secondSlug: "missed-call" },
    { slug: "call", secondSlug: "call-forward" },
    { slug: "setting", secondSlug: "office-setting" },
    { slug: "setting", secondSlug: "extensions" },
    { slug: "setting", secondSlug: "ring-group" },
    { slug: "setting", secondSlug: "voicemail-setting" },
    { slug: "setting", secondSlug: "voicemail" },
    { slug: "setting", secondSlug: "marketing" },
    { slug: "billing", secondSlug: "subscription" },
    { slug: "billing", secondSlug: "bills-&-payment" },
    { slug: "billing", secondSlug: "payment-methods" },
    { slug: "support", secondSlug: "ticket" },
    { slug: "support", secondSlug: "report" },
    { slug: "support", secondSlug: "requestfeature" },
    { slug: "supports", secondSlug: "submit-ticket" },
    { slug: "supports", secondSlug: "report-issue" },
    { slug: "supports", secondSlug: "request-feature" },
    { slug: "users", secondSlug: "all-users" },
    { slug: "users", secondSlug: "office-admins" },
    { slug: "users", secondSlug: "super-admin" },
    { slug: "users", secondSlug: "supports" },
    { slug: "users", secondSlug: "staff" },
    { slug: "office", secondSlug: "all-office" },
    { slug: "office", secondSlug: "add-new-office" },
    { slug: "efax", secondSlug: "inbox" },
    { slug: "efax", secondSlug: "sent" },
    { slug: "efax", secondSlug: "archive" },
    { slug: "efax", secondSlug: "setting" },
    { slug: "appointments", secondSlug: "new-appointments" },
    { slug: "appointments", secondSlug: "new-patients" },
    { slug: "appointments", secondSlug: "re-calls" },
    { slug: "appointments", secondSlug: "potential-patients" },
    { slug: "appointments", secondSlug: "cancelled-appointment" },
    { slug: "voicemail", secondSlug: "all-voicemails" },
    { slug: "voicemail", secondSlug: "deleted-voicemails" },
    { slug: "add-ons-and-features", secondSlug: "market-place" },
    { slug: "add-ons-and-features", secondSlug: "active-add-ons" },
    { slug: "add-ons-and-features", secondSlug: "disabled-add-ons" },
  ];

  return secondLevelPaths.map((path) => ({
    slug: path.slug,
    secondSlug: path.secondSlug,
  }));
}

const Page = ({ params }) => {
  const { slug, secondSlug } = params;

  return (
    <>
      <DynamicComponentWithNoSSR params={{ slug, secondSlug }} />
    </>
  );
};

export default Page;
