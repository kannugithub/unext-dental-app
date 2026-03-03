export const SidebarData = [
  {
    title: "Dashboard",
    path: "/clinic-dashboard",
    slug: "clinic-dashboard",
    icon: "/assets/icons/monitorAdmin.svg",
  },
  {
    title: "Patients",
    slug: "patients",

    nestedItems: [
      { title: "All-Patients", slug: "all-patients" },
      { title: "New Patients", slug: "new-patients" },
      { title: "Re-Calls", slug: "re-calls" },
      { title: "Due Balance", slug: "due-balance" },
      { title: "Overdue", slug: "overdue" },
    ],
    icon: "/assets/icons/patientIcon2.svg",
  },
  {
    title: "Staff",
    path: "/clinic-staff",
    slug: "clinic-staff",
    icon: "/assets/icons/users_icon.svg",
  },
  {
    title: "eFax",
    slug: "eFax",
    nestedItems: [
      { title: "Inbox", slug: "inbox" },
      { title: "Sent", slug: "sent" },
      { title: "archive", slug: "archive" },
      { title: "Setting", slug: "setting" },
    ],
    icon: "/assets/icons/printer.svg",
  },
  {
    title: "Messages",
    path: "/messages",
    slug: "messages",
    icon: "/assets/icons/messages.svg",
  },
  {
    title: "Call",
    slug: "call",

    nestedItems: [
      { title: "Call-Logs", slug: "call-logs" },
      { title: "Missed Call", slug: "missed-call" },
      { title: "Call Forward", slug: "call-forward" },
    ],
    icon: "/assets/icons/call.svg",
  },
  {
    title: "Appointments",
    slug: "appointments",
    nestedItems: [
      { title: "New-Appointments", slug: "new-appointments" },
      { title: "New Patients", slug: "new-patients" },
      { title: "Re-Calls", slug: "re-calls" },
      { title: "Potential Patients", slug: "potential-patients" },
      { title: "Cancelled Appointment", slug: "cancelled-appointment" },
    ],
    icon: "/assets/icons/calendar_icon.svg",
  },

  {
    title: "Voicemail",
    slug: "voicemail",
    nestedItems: [
      { title: "All-Voicemails", slug: "all-voicemails" },
      { title: "Deleted-Voicemails", slug: "deleted-voicemails" },
    ],
    icon: "/assets/icons/voicemail.svg",
  },
  {
    title: "Setting",
    slug: "setting",
    nestedItems: [
      { title: "Office-Setting", slug: "office-setting" },
      { title: "Extensions", slug: "extensions" },
      { title: "Ring Group", slug: "ring-group" },
      { title: "Voicemail", slug: "voicemail-setting" },
      { title: "Marketing", slug: "marketing" },
    ],
    icon: "/assets/icons/setting2.svg",
  },
  {
    title: "Add-Ons-And-Features",
    slug: "add-ons-and-features",
    nestedItems: [
      { title: "Market-Place", slug: "market-place" },
      { title: "Active-Add-Ons", slug: "active-add-ons" },
      { title: "Disabled-Add-Ons", slug: "disabled-add-ons" },
    ],
    icon: "/assets/icons/chart2.svg",
  },

  {
    title: "Billing",
    slug: "billing",
    nestedItems: [
      { title: "Subscription", slug: "subscription" },
      { title: "Bill Payment", slug: "bills-&-payment" },
      { title: "Payment Methods", slug: "payment-methods" },
    ],
    icon: "/assets/icons/billingIcon.svg",
  },
  {
    title: "My Dental Office",
    path: "/my-dental-office",
    slug: "my-dental-office",
    icon: "/assets/icons/VectormydO.svg",
  },

  // {
  //   title: "Extensions",
  //   path: "/extensions",
  //   slug: "extensions",
  //   icon: "/assets/icons/extension_icon.svg",
  // },

  {
    title: "Supports",
    path: "/supports",
    slug: "supports",
    nestedItems: [
      { title: "Submit-Ticket", slug: "submit-ticket" },
      { title: "Report-Issue", slug: "report-issue" },
      { title: "Request-Feature", slug: "request-feature" },
    ],

    icon: "/assets/icons/support.svg",
  },

  {
    title: "Devices",
    path: "/devices",
    slug: "devices",
    icon: "/assets/icons/devices.svg",
  },

  // {
  //   title: "Call Forward",
  //   path: "/call-forward",
  //   slug: "call-forward",
  //   icon: "/assets/icons/callIcon.svg",
  // },

  // {
  //   title: "Ring Group",
  //   path: "/ring-group",
  //   slug: "ring-group",
  //   icon: "/assets/icons/clinic_staff.svg",
  // },
  // {
  //   title: "Billing",
  //   path: "/billing",
  //   slug: "billing",
  //   icon: "/assets/icons/billingIcon.svg",
  // },

  {
    title: "Office setting",
    path: "/office-setting",
    slug: "office-setting",
    icon: "/assets/icons/office_setting.svg",
  },

  {
    title: "Office",
    slug: "Office",
    nestedItems: [
      { title: "All-office", slug: "all-office" },
      { title: "Add-new-office", slug: "add-new-office" },
    ],
    icon: "/assets/icons/office_setting.svg",
  },

  // {
  //   title: "Office Staff",
  //   path: "/office-staff",
  //   slug: "office-staff",
  //   icon: "/assets/icons/officeStaff.svg",
  // },
  {
    title: "Users",
    slug: "Users",
    nestedItems: [
      { title: "All-users", slug: "all-users" },
      { title: "Office-Admins", slug: "office-admins" },
      { title: "Super-Admin", slug: "super-admin" },
      { title: "Supports", slug: "supports" },
      { title: "Staff", slug: "staff" },
    ],
    icon: "/assets/icons/clinic_staff.svg",
  },
  {
    title: "Transactions",
    path: "/transactions",
    slug: "transactions",
    icon: "/assets/icons/billingIcon.svg",
  },
  {
    title: "Demo Requests",
    path: "/demo-requests",
    slug: "demo-requests",
    icon: "/assets/icons/demo_request.svg",
  },
  // {
  //   title: "Profile",
  //   path: "/profile",
  //   slug: "profile",
  //   icon: "/assets/icons/profileAdmin.svg",
  // },
  {
    title: "Coupon",
    path: "/coupon",
    slug: "coupon",
    icon: "/assets/icons/coupon_icon.svg",
  },
  // {
  //   title: "Support",
  //   path: "/Support",
  //   slug: "support",
  //   icon: "/assets/icons/headphone.svg",
  // },
  {
    title: "Support",
    slug: "support",
    nestedItems: [
      { title: "Ticket", slug: "ticket" },
      { title: "Report", slug: "report" },
      { title: "Request-Feature", slug: "Request-feature" },
    ],
    icon: "/assets/icons/headphone.svg",
  },
];
