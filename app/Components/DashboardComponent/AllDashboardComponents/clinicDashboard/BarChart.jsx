import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styles from "./lineChart.module.scss";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const BarChart = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: "#F96046",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 40, 20, 30, 15, 40, 20, 30, 10, 40, 20],
      },
    ],
  };

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
        <div>
          <div className={styles.performance_chart}>PERFORMANCE</div>
          <div className={styles.appointment_month}>Appointments by month</div>
        </div>
        {/* <div className={styles.chart_select}>
          <select name="" id="">
            <option value="">2024</option>
            <option value="">2023</option>
            <option value="">2022</option>
            <option value="">2021</option>
          </select>
        </div> */}
      </div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
