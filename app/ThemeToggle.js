import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme } from "./store/slices/darkThemeSlice";
import "./themetoggle.css";
import Image from "next/image";
import Images from "./Components/Images/Images";
import { useAppSelector } from "./store/lib/hooks";

const ThemeToggle = ({ isOpenProgress }) => {
  const [clinicId, setClinicId] = useState(null);
  const [incompleteProfile, setIncompleteProfile] = useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  const userInfoData = useAppSelector((state) => state.authWeb.userInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("clinicId");
      setClinicId(id);
    }
  }, []);

  useEffect(() => {
    if (clinicId) {
      const clinic = userInfoData?.user?.clinics.find(
        (clinic) => clinic?._id === clinicId
      );
      setIncompleteProfile(clinic);
    }
  }, [userInfoData]);

  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") || sessionStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setDarkTheme(storedTheme === "dark"));

      document.documentElement.classList.toggle(
        "dark-mode",
        storedTheme === "dark"
      );
    } else {
      dispatch(setDarkTheme(true));
      localStorage.setItem("theme", "dark");
      sessionStorage.setItem("theme", "dark");

      document.documentElement.classList.add("dark-mode");
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    dispatch(setDarkTheme(!isDarkTheme));
    localStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
    sessionStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
  };

  return (
    <div className={`toggle_wrapper`}>
      <button
        className={`toggle-button ${isDarkTheme ? "on" : "off"} ${
          incompleteProfile?.profile_completion === false ||
          isOpenProgress === true
            ? "toggle-empty"
            : ""
        }`}
        onClick={toggleTheme}
      >
        {isDarkTheme ? (
          <>
            <Image src={Images.sunLight} />
            <Image src={Images.moon_dark} />
          </>
        ) : (
          <>
            <Image src={Images.sun_dark} />
            <Image src={Images.moonLight} />
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
