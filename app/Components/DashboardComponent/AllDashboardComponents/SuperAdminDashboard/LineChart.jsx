import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "./LineChart2.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "All Calls",
      backgroundColor: "rgba(79, 118, 248, 1)",
      borderColor: "rgba(79, 118, 248, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Inbound Calls",
      backgroundColor: "rgba(32, 185, 229, 1)",
      borderColor: "rgba(32, 185, 229, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Out Bound Calls",
      backgroundColor: "rgba(252, 154, 11, 1)",
      borderColor: "rgba(252, 154, 11, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Internal Calls",
      backgroundColor: "rgba(255, 62, 116, 1)",
      borderColor: "rgba(255, 62, 116, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "External Calls",
      backgroundColor: "rgba(108, 28, 195, 1)",
      borderColor: "rgba(108, 28, 195, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  // const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
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
      <div className={styles.linear_char_title}>
        <div className={styles.overview_tab}>
          <div>overview</div>
          <div>Call value</div>
        </div>
        <div className={styles.all_calls_list}>
          <div className={styles.all_graph_tab}>Inbound Calls</div>
          <div className={styles.all_graph_tab}>Outbound Calls</div>
          <div className={styles.all_graph_tab}>Missed Calls</div>
          <button className={styles.month_btn}>Month</button>
          <button className={styles.week_btn}>Week</button>
        </div>
      </div>
      <Line data={data} height={150} />
    </div>
  );
};

export default LineChart;
