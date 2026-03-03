// import dynamic from "next/dynamic";

// const DynamicComponentWithNoSSR = dynamic(
//   () => import("@/app/Components/DashboardComponent/MainDashboard"),
//   { ssr: false }
// );

// export async function generateStaticParams() {
//   const posts = [
// { slug: "clinic-dashboard" },
// { slug: "messages" },
// { slug: "support" },
// { slug: "my-dental-office" },
// { slug: "clinic-staff" },
// { slug: "extensions" },
// { slug: "eFax" },
// { slug: "devices" },
// { slug: "call-forward" },
// { slug: "voicemail" },
// { slug: "ring-group" },
// { slug: "billing" },
// { slug: "office-setting" },
// { slug: "office" },
// { slug: "add-clinic" },
// { slug: "edit-clinic" },
// { slug: "view-clinic-details" },
// { slug: "patients" },
// { slug: "add-patient" },
// { slug: "edit-patient" },
// { slug: "view-patient" },
// { slug: "office-staff" },
// { slug: "add-office-staff" },
// { slug: "office-staff-details" },
// { slug: "edit-staff-details" },
// { slug: "users" },
// { slug: "add-user" },
// { slug: "user-officeinfo_list" },
// { slug: "UsersList" },
// { slug: "profile" },
// { slug: "transaction" },
// { slug: "add-staff" },
// { slug: "edit-clinic-staff" },
// { slug: "edit-staff" },
// { slug: "clinic-staff-details" },
// { slug: "view-dental-office-details" },
// { slug: "user-details" },
// { slug: "edit-user" },
// { slug: "/dashboard/edit-user" },
// { slug: "coupon" },
// { slug: "edit-coupon" },
// { slug: "add-coupon" },
// { slug: "transactions" },
// { slug: "demo-requests" },
// { slug: "appointments" },
// { slug: "payment-methods" },
// { slug: "call-logs" },
// { slug: "missed-call" },
// { slug: "other" },
// { slug: "bill-payment" },
// { slug: "subscription" },
// { slug: "user-setting" },
// { slug: "security" },
//   ];

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// // const Page = ({ params }) => {
// //   return <MainDashboard params={params.slug} />;
// // };

// const Page = ({ params }) => {
//   console.log("params======>", params);
//   return <DynamicComponentWithNoSSR params={params.slug} />;
// };

// export default Page;

// pages/dashboard/[slug]/page.js
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/app/Components/DashboardComponent/MainDashboard"),
  { ssr: false }
);

export async function generateStaticParams() {
  const firstLevelPaths = [
    { slug: "clinic-dashboard" },
    { slug: "messages" },
    { slug: "support" },
    { slug: "my-dental-office" },
    { slug: "clinic-staff" },
    { slug: "extensions" },
    { slug: "/dashboard/eFax" },
    { slug: "devices" },
    { slug: "call-forward" },
    { slug: "voicemail" },
    { slug: "ring-group" },
    { slug: "billing" },
    { slug: "office-setting" },
    { slug: "office" },
    { slug: "add-clinic" },
    { slug: "edit-clinic" },
    { slug: "view-clinic-details" },
    { slug: "patients" },
    { slug: "add-patient" },
    { slug: "edit-patient" },
    { slug: "view-patient" },
    { slug: "office-staff" },
    { slug: "add-office-staff" },
    { slug: "office-staff-details" },
    { slug: "edit-staff-details" },
    { slug: "users" },
    { slug: "add-user" },
    { slug: "user-officeinfo_list" },
    { slug: "UsersList" },
    { slug: "profile" },
    { slug: "transaction" },
    { slug: "add-staff" },
    { slug: "edit-clinic-staff" },
    { slug: "edit-staff" },
    { slug: "clinic-staff-details" },
    { slug: "view-dental-office-details" },
    { slug: "user-details" },
    { slug: "edit-user" },
    { slug: "/dashboard/edit-user" },
    { slug: "coupon" },
    { slug: "edit-coupon" },
    { slug: "add-coupon" },
    { slug: "transactions" },
    { slug: "demo-requests" },
    { slug: "appointments" },
    { slug: "payment-methods" },
    { slug: "call-logs" },
    { slug: "missed-call" },
    { slug: "marketing" },
    { slug: "bill-payment" },
    { slug: "subscription" },
    { slug: "user-setting" },
    { slug: "security" },
    { slug: "voicemail-setting" },
    { slug: "voicemail" },
    { slug: "supports" },
    { slug: "add-ons-and-features" },
  ];

  return firstLevelPaths.map((path) => ({
    slug: path.slug,
  }));
}

const Page = ({ params }) => {
  const { slug } = params;

  return (
    <>
      <DynamicComponentWithNoSSR params={{ slug }} />
    </>
  );
};

export default Page;
