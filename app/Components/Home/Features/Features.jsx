"use client";
import React from "react";
import styles from "./features.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Images from "../../Images/Images";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const Features = () => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.feature_wrapper} id="features">
          <div className={styles.feature_upper}>
            <h2>
              Features That Makes The <span> uNext APP Different!</span>{" "}
            </h2>
            <p>
              A Robust System is Essential for Business Success, uNext Provides
              The Solution With Simplicity With The Help Of Our State-Of-The-Art
              App
            </p>
          </div>
          <Row className={styles.mid_part}>
            <Col lg={4} className={styles.mid_part_col}>
              <div className={styles.mid_card}>
                <div className={styles.svg_card}>
                  {isDarkTheme ? (
                    <Image src={Images.feature1}></Image>
                  ) : (
                    <svg
                      width="146"
                      height="147"
                      viewBox="0 0 146 147"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_3334_837)">
                        <circle cx="73" cy="64" r="50" fill="#E7EAFF" />
                      </g>
                      <g filter="url(#filter1_d_3334_837)">
                        <circle cx="73" cy="64" r="41" fill="#E7EAFF" />
                      </g>
                      <path
                        d="M78.6562 65.5C78.6562 66.8675 78.113 68.179 77.146 69.146C76.179 70.113 74.8675 70.6562 73.5 70.6562C72.1325 70.6562 70.821 70.113 69.854 69.146C68.887 68.179 68.3438 66.8675 68.3438 65.5C68.3438 64.1325 68.887 62.821 69.854 61.854C70.821 60.887 72.1325 60.3438 73.5 60.3438C74.8675 60.3438 76.179 60.887 77.146 61.854C78.113 62.821 78.6562 64.1325 78.6562 65.5Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M57 65.5C57 65.5 63.1875 54.1562 73.5 54.1562C83.8125 54.1562 90 65.5 90 65.5C90 65.5 83.8125 76.8438 73.5 76.8438C63.1875 76.8438 57 65.5 57 65.5ZM73.5 72.7188C75.4145 72.7188 77.2506 71.9582 78.6044 70.6044C79.9582 69.2506 80.7188 67.4145 80.7188 65.5C80.7188 63.5855 79.9582 61.7494 78.6044 60.3956C77.2506 59.0418 75.4145 58.2812 73.5 58.2812C71.5855 58.2812 69.7494 59.0418 68.3956 60.3956C67.0418 61.7494 66.2812 63.5855 66.2812 65.5C66.2812 67.4145 67.0418 69.2506 68.3956 70.6044C69.7494 71.9582 71.5855 72.7188 73.5 72.7188Z"
                        fill="#0A22A8"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3334_837"
                          x="0"
                          y="1"
                          width="146"
                          height="146"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="10" />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.21 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3334_837"
                          x="9"
                          y="0"
                          width="128"
                          height="128"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.18 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  )}
                </div>
                <h4>A Single, Integrated Platform</h4>
                <p>
                  Texting. Scheduling. Reminders. Payments. Reviews, And Much
                  More
                </p>
              </div>
              <div className={styles.mid_card2}>
                <div className={styles.svg_card}>
                  {isDarkTheme ? (
                    <Image src={Images.feature2}></Image>
                  ) : (
                    <svg
                      width="146"
                      height="147"
                      viewBox="0 0 146 147"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_3334_837)">
                        <circle cx="73" cy="64" r="50" fill="#E7EAFF" />
                      </g>
                      <g filter="url(#filter1_d_3334_837)">
                        <circle cx="73" cy="64" r="41" fill="#E7EAFF" />
                      </g>
                      <path
                        d="M78.6562 65.5C78.6562 66.8675 78.113 68.179 77.146 69.146C76.179 70.113 74.8675 70.6562 73.5 70.6562C72.1325 70.6562 70.821 70.113 69.854 69.146C68.887 68.179 68.3438 66.8675 68.3438 65.5C68.3438 64.1325 68.887 62.821 69.854 61.854C70.821 60.887 72.1325 60.3438 73.5 60.3438C74.8675 60.3438 76.179 60.887 77.146 61.854C78.113 62.821 78.6562 64.1325 78.6562 65.5Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M57 65.5C57 65.5 63.1875 54.1562 73.5 54.1562C83.8125 54.1562 90 65.5 90 65.5C90 65.5 83.8125 76.8438 73.5 76.8438C63.1875 76.8438 57 65.5 57 65.5ZM73.5 72.7188C75.4145 72.7188 77.2506 71.9582 78.6044 70.6044C79.9582 69.2506 80.7188 67.4145 80.7188 65.5C80.7188 63.5855 79.9582 61.7494 78.6044 60.3956C77.2506 59.0418 75.4145 58.2812 73.5 58.2812C71.5855 58.2812 69.7494 59.0418 68.3956 60.3956C67.0418 61.7494 66.2812 63.5855 66.2812 65.5C66.2812 67.4145 67.0418 69.2506 68.3956 70.6044C69.7494 71.9582 71.5855 72.7188 73.5 72.7188Z"
                        fill="#0A22A8"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3334_837"
                          x="0"
                          y="1"
                          width="146"
                          height="146"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="10" />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.21 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3334_837"
                          x="9"
                          y="0"
                          width="128"
                          height="128"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.18 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  )}
                </div>

                <h4>Enhanced Patient Communication</h4>
                <p>
                  Connect With Patients Anywhere Using Text, Phone, Or Email.
                  Send Reminders, Quickly Fill Schedule Openings, Collect
                  Payments Faster, And Send Reminders. Increase Patient
                  Retention And Reduce Missed Appointments
                </p>
              </div>
              <div></div>
            </Col>
            <Col lg={4} className={styles.mid_part_col2}>
              {isDarkTheme ? (
                <Image src={Images.mob_dark} alt="" />
              ) : (
                <Image src={Images.mob_3} alt="" />
              )}
            </Col>
            <Col lg={4} className={styles.mid_part_col3}>
              <div className={styles.mid_card}>
                <div className={styles.svg_card}>
                  {isDarkTheme ? (
                    <Image src={Images.feature3}></Image>
                  ) : (
                    <svg
                      width="146"
                      height="147"
                      viewBox="0 0 146 147"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_3334_837)">
                        <circle cx="73" cy="64" r="50" fill="#E7EAFF" />
                      </g>
                      <g filter="url(#filter1_d_3334_837)">
                        <circle cx="73" cy="64" r="41" fill="#E7EAFF" />
                      </g>
                      <path
                        d="M78.6562 65.5C78.6562 66.8675 78.113 68.179 77.146 69.146C76.179 70.113 74.8675 70.6562 73.5 70.6562C72.1325 70.6562 70.821 70.113 69.854 69.146C68.887 68.179 68.3438 66.8675 68.3438 65.5C68.3438 64.1325 68.887 62.821 69.854 61.854C70.821 60.887 72.1325 60.3438 73.5 60.3438C74.8675 60.3438 76.179 60.887 77.146 61.854C78.113 62.821 78.6562 64.1325 78.6562 65.5Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M57 65.5C57 65.5 63.1875 54.1562 73.5 54.1562C83.8125 54.1562 90 65.5 90 65.5C90 65.5 83.8125 76.8438 73.5 76.8438C63.1875 76.8438 57 65.5 57 65.5ZM73.5 72.7188C75.4145 72.7188 77.2506 71.9582 78.6044 70.6044C79.9582 69.2506 80.7188 67.4145 80.7188 65.5C80.7188 63.5855 79.9582 61.7494 78.6044 60.3956C77.2506 59.0418 75.4145 58.2812 73.5 58.2812C71.5855 58.2812 69.7494 59.0418 68.3956 60.3956C67.0418 61.7494 66.2812 63.5855 66.2812 65.5C66.2812 67.4145 67.0418 69.2506 68.3956 70.6044C69.7494 71.9582 71.5855 72.7188 73.5 72.7188Z"
                        fill="#0A22A8"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3334_837"
                          x="0"
                          y="1"
                          width="146"
                          height="146"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="10" />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.21 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3334_837"
                          x="9"
                          y="0"
                          width="128"
                          height="128"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.18 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  )}
                </div>

                <h4>Enhance Patient Acquisition</h4>
                <p>
                  Boost Your Daily Business Influx By Amplifying Reviews,
                  Receiving Practice Analytics, Turning More Web Visits Into
                  Appointments, And Bringing More New Patients
                </p>
              </div>
              <div className={styles.mid_card2}>
                <div className={styles.svg_card}>
                  {isDarkTheme ? (
                    <Image src={Images.feature4}></Image>
                  ) : (
                    <svg
                      width="146"
                      height="147"
                      viewBox="0 0 146 147"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_3334_837)">
                        <circle cx="73" cy="64" r="50" fill="#E7EAFF" />
                      </g>
                      <g filter="url(#filter1_d_3334_837)">
                        <circle cx="73" cy="64" r="41" fill="#E7EAFF" />
                      </g>
                      <path
                        d="M78.6562 65.5C78.6562 66.8675 78.113 68.179 77.146 69.146C76.179 70.113 74.8675 70.6562 73.5 70.6562C72.1325 70.6562 70.821 70.113 69.854 69.146C68.887 68.179 68.3438 66.8675 68.3438 65.5C68.3438 64.1325 68.887 62.821 69.854 61.854C70.821 60.887 72.1325 60.3438 73.5 60.3438C74.8675 60.3438 76.179 60.887 77.146 61.854C78.113 62.821 78.6562 64.1325 78.6562 65.5Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M57 65.5C57 65.5 63.1875 54.1562 73.5 54.1562C83.8125 54.1562 90 65.5 90 65.5C90 65.5 83.8125 76.8438 73.5 76.8438C63.1875 76.8438 57 65.5 57 65.5ZM73.5 72.7188C75.4145 72.7188 77.2506 71.9582 78.6044 70.6044C79.9582 69.2506 80.7188 67.4145 80.7188 65.5C80.7188 63.5855 79.9582 61.7494 78.6044 60.3956C77.2506 59.0418 75.4145 58.2812 73.5 58.2812C71.5855 58.2812 69.7494 59.0418 68.3956 60.3956C67.0418 61.7494 66.2812 63.5855 66.2812 65.5C66.2812 67.4145 67.0418 69.2506 68.3956 70.6044C69.7494 71.9582 71.5855 72.7188 73.5 72.7188Z"
                        fill="#0A22A8"
                      />
                      <defs>
                        <filter
                          id="filter0_d_3334_837"
                          x="0"
                          y="1"
                          width="146"
                          height="146"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="10" />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.21 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_3334_837"
                          x="9"
                          y="0"
                          width="128"
                          height="128"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="11.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0.136709 0 0 0 0 0.9 0 0 0 0.18 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_3334_837"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_3334_837"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  )}
                </div>
                <h4>
                  Build A Stronger Dental Team With A Family-Like Atmosphere
                </h4>
                <p>
                  Build A Stronger Dental Team With A Family-Like Atmosphere
                  Empowers Your Dental Team by Enhancing Collaboration,
                  Communication, and Efficiency. Create Groups, Social Media,
                  All Communication On A Single Platform
                </p>
              </div>
              <div></div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Features;
