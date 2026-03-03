// import "./globals.css";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./Components/DashboardComponent/AllDashboardComponents/clinicDashboard/Appointments/CreateAppointment/reactCalender.css";
import MainPage from "./MainPage";
import StoreProvider from "./store/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["400", "100", "300", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "uNext - Designed For The Modern Dentist",
  description: "Designed For The Modern Dentist",

  icons: {
    icon: {
      url: "/frvic.png",
      type: "image/png",
    },
    shortcut: { url: "/frvic.png", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer />
        <StoreProvider>
          <MainPage attribute="class">{children}</MainPage>
        </StoreProvider>
      </body>
    </html>
  );
}
