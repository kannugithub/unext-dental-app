import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../clinicSetupInto.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const FaqComponents = ({ eventKey, header, body }) => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  // console.log(isDarkTheme, "isDarkTheme");
  // const isDarkTheme = localStorage.getItem("theme");
  return (
    <>
      <div className={isDarkTheme ? styles.dark : styles.light}>
        <Accordion.Item eventKey={eventKey} className={styles.accordion_item}>
          <Accordion.Header className={styles.faq_headers}>
            {header}
          </Accordion.Header>
          <Accordion.Body className={styles.faq_headers}>{body}</Accordion.Body>
        </Accordion.Item>
        {/* <hfdf/> */}
      </div>
    </>
  );
};

export default FaqComponents;
