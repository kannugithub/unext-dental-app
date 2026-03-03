"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "./voicemailSetting.module.scss";

import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Link from "next/link";
import OutsideVoicemailSetting from "./OutsideVoicemailSetting";
import InsideVoicemailSetting from "./InsideVoicemailSetting";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const VoiceMailSetting = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  return (
    <div
      className={
        isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
      }
    >
      <div className={styles.assisted_wrapper}>
        <div className={styles.head1}>
          <h4>Voicemail Setting</h4>
        </div>
        <div className={styles.slide_div}>
          <div className="col-md-6">
            <div
              className={currentTab === 0 ? styles.slide1 : styles.slide2}
              onClick={() => setCurrentTab(0)}
            >
              Outside Business Hours Vm
            </div>
          </div>
          <div className="col-md-6">
            <div
              className={currentTab === 1 ? styles.slide1 : styles.slide2}
              onClick={() => setCurrentTab(1)}
            >
              Business Hours Vm
            </div>
          </div>
        </div>

        {currentTab === 0 && <OutsideVoicemailSetting />}
        {currentTab === 1 && <InsideVoicemailSetting />}
      </div>
    </div>
  );
};
export default VoiceMailSetting;
