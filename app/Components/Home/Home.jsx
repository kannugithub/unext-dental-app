"use client";
import React from "react";
import styles from "./home.module.scss";
import Header from "../Header/Header";
import TopComponent from "./ModernDentist/TopComponent";
import AboutApp from "./AboutUs/AboutApp";
import ContactUs from "./ContantUs/ContactUs";
import Features from "./Features/Features";
import Comunication from "./ComunicationSolution/Comunication";
import Download from "./DownloadExplore/Download";
import Footer from "../Footer/Footer";
import FooterLine from "../Footer/FooterLine";
import SubscriptionPlan from "./SubscriptionPlan/SubscriptionPlan";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.home_wrapper}>
          <div className={styles.home_wrapper2}>
            <Header />

            <div className="container">
              <TopComponent />
            </div>
          </div>
          <div className={styles.home_wrapper3}>
            <div className="container">
              <AboutApp />
            </div>
          </div>
          <div className={styles.home_wrapper4}>
            <div className="container">
              <Comunication />
            </div>
          </div>
          <div className={styles.home_wrapper5}>
            <div className="container">
              <Features />
              <Download />
            </div>
          </div>
          <div className={styles.home_wrapper6}>
            <div className="container">
              <SubscriptionPlan />
            </div>
          </div>
          <div className={styles.home_wrapper5}>
            <div className="container">
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
