"use client";
import React from "react";
import styles from "./download.module.scss";
import { Button } from "react-bootstrap";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const Download = () => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.download_wrapper}>
          <div className={styles.download_div}>
            <h4>Download And Explore The uNext App</h4>
            <p>
              Experience the Future of Dental Practice Management – Download and
              Explore the uNext App Today
            </p>
            <h6>Available For Download Soon:</h6>
            <div className={styles.btn_div_logo}>
              <Button className={styles.btn_logo}>
                <span className={styles.span_1}>
                  <svg
                    enable-background="new 0 0 40 40"
                    height="35px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 56.693 56.693"
                    width="35px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        d="M41.777,30.517c-0.062-6.232,5.082-9.221,5.312-9.372c-2.891-4.227-7.395-4.807-8.998-4.873   c-3.83-0.389-7.477,2.256-9.42,2.256c-1.939,0-4.941-2.199-8.117-2.143c-4.178,0.062-8.029,2.43-10.179,6.17   c-4.339,7.527-1.11,18.682,3.118,24.791c2.067,2.986,4.532,6.346,7.766,6.223c3.117-0.123,4.293-2.016,8.061-2.016   s4.826,2.016,8.123,1.953c3.352-0.061,5.477-3.043,7.527-6.041c2.373-3.469,3.35-6.828,3.408-6.998   C48.305,40.433,41.844,37.958,41.777,30.517z"
                        fill="#ffffff"
                      />
                      <path
                        d="M35.582,12.229c1.715-2.082,2.877-4.975,2.561-7.855c-2.475,0.1-5.471,1.645-7.248,3.725   c-1.592,1.846-2.984,4.785-2.611,7.613C31.045,15.926,33.861,14.307,35.582,12.229z"
                        fill="#ffffff"
                      />
                    </g>
                  </svg>
                </span>
                <span className={styles.span_2}>
                  <span className={styles.span_21}> Download on the</span>
                  <span className={styles.span_22}> App Store</span>
                </span>
              </Button>
              <Button className={styles.btn_logo}>
                <span className={styles.span_1}>
                  {" "}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 480 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M264.8 246.201L27.4698 484.201C21.8632 478.846 17.4188 472.395 14.4132 465.248C11.4077 458.102 9.90537 450.413 9.9998 442.661V69.4208C9.9518 61.5328 11.5339 53.7199 14.6468 46.4719C17.7597 39.2239 22.3363 32.6972 28.0898 27.3008L264.8 246.201Z"
                      fill="#2299F8"
                    />
                    <path
                      d="M469.93 256.001C469.93 277.521 458.27 296.581 438.93 307.351L371.51 344.901L287.8 267.411L264.8 246.201L353.41 157.351L439 204.691C458.31 215.461 470 234.521 470 256.041L469.93 256.001Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M264.8 246.2L28.0898 27.3004C31.4322 24.1283 35.1223 21.3439 39.0898 19.0004C58.4098 7.32036 81.7098 7.00036 101.64 18.0804L353.41 157.35L264.8 246.2Z"
                      fill="#5ACF5F"
                    />
                    <path
                      d="M371.51 344.9L101.68 494C92.3372 499.324 81.753 502.084 71 502C59.7457 502.095 48.6939 499.007 39.12 493.09C34.8583 490.642 30.9379 487.643 27.46 484.17L264.79 246.17L287.79 267.38L371.51 344.9Z"
                      fill="#F84437"
                    />
                  </svg>
                </span>
                <span className={styles.span_2}>
                  <span className={styles.span_21}>Get it on</span>
                  <span className={styles.span_22}>Google Play</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;
