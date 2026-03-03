import React, { useEffect, useState } from "react";
import styles from "./CalenderAppointment.module.scss";
import Table from "react-bootstrap/Table";
import CallSvg from "./CallSvg";
import CalendarRange from "@/app/Components/common/CalendarPopup/CalendarRange";
import CustomCalendar from "./CustomCalendar/CustomCalendar";
import CheckSvg from "@/app/assets/svgComponent/CheckSvg";
import CalendarSvg from "@/app/assets/svgComponent/CalendarSvg";
import CancelSvg from "@/app/assets/svgComponent/CancelSvg";
import { useSelector } from "react-redux";

const CalenderAppointment = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);
  return (
    <>
      <div
        className={
          isDarkTheme === "dark" ? styles.darkHeader : styles.lightHeader
        }
      >
        <div className={styles.main_caleneder}>
          <div className={styles.left_bar}>
            <div className={styles.main_format}>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Operatory 1</th>
                    <th>2 High Production</th>
                    <th>3 Low Production</th>
                    <th>4 Hygienist</th>
                    <th>5 Hygienist</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>7 AM</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>8 AM</td>
                    <td>
                      <div className={styles.eight_am_operatory}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>9 AM</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className={styles.nine_am_production}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10 AM</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>11 AM</td>
                    <td></td>
                    <td>
                      <div className={styles.eleven_am_high}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>12 AM</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>1 PM</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className={styles.eleven_am_high}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2 PM</td>
                    <td>
                      <div className={styles.two_pm_operatory}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3 PM</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className={styles.eleven_am_high}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className={styles.two_pm_operatory}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4 PM</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5 PM</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className={styles.nine_am_production}>
                        <div className={styles.inner}>
                          <span className={styles.icon}>
                            <CallSvg />
                          </span>
                          <span>$500.00</span>
                        </div>
                        <span>Westover Mack</span>
                        <span>Dr. Jack Smith</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className={styles.right_bar}>
            <CustomCalendar />
            <div className={styles.main_status}>
              <div className={styles.confirmed}>
                <div className={styles.text}>
                  <span>Confirmed: </span>
                  <span>4</span>
                </div>
                <div className={styles.icon2}>
                  <span>
                    <CheckSvg />
                  </span>
                </div>
              </div>
              <div className={styles.reschedule}>
                <div className={styles.text}>
                  <span>Re-Scheduled: </span>
                  <span>2</span>
                </div>
                <div className={styles.icon2}>
                  <span>
                    <CalendarSvg />
                  </span>
                </div>
              </div>
              <div className={styles.cancel}>
                <div className={styles.text}>
                  <span>Cancel: </span>
                  <span>2</span>
                </div>
                <div className={styles.icon2}>
                  <span>
                    <CancelSvg />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderAppointment;
