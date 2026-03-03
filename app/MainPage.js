"use client";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { useDispatch } from "react-redux";
import { setAuthState } from "./store/slices/authSlices";
import { useEffect } from "react";
import useIsNotFoundPage from "./Components/hooks/useIsNotFoundPage";

const MainPage = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuthState(token));
    }
  }, []);

  const isNotFoundPage = useIsNotFoundPage();

  return (
    <>
      {isNotFoundPage ||
      pathname === "/login/" ||
      pathname === "/" ||
      pathname === "/signup/" ||
      pathname === "/terms-and-condition/" ||
      pathname === "/privacy-policy/" ||
      pathname === "/forgotPassword/" ||
      pathname === "/new-pasword/" ||
      pathname === "/otp-verification/" ||
      pathname.split("/")[1] === "dashboard" ? (
        ""
      ) : (
        <div>
          <Header />
        </div>
      )}
      {children}
      {pathname === "/login/" ||
      pathname === "/forgotPassword/" ||
      pathname === "/new-pasword/" ||
      pathname === "/otp-verification/" ||
      pathname.split("/")[1] === "dashboard" ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

export default MainPage;
