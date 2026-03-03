import React, { useEffect, useState } from "react";
import styles from "./finalStep.module.scss";
import Image from "next/image";
import Images from "@/app/Components/Images/Images";
import Counter from "./Counter";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";

const FinalStep = ({ setIsOpenProgress, changeTab }) => {
  const [count, setCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          return prevCount;
        } else {
          return prevCount + 1;
        }
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={reduxTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.final_onboarding}>
          <div className={styles.logos_text}>
            {reduxTheme ? (
              <Image src={Images.unextlogodarktheme} alt="unext logo" />
            ) : (
              <Image src={Images.unext_logo} alt="unext logo" />
            )}

            <div className={styles.office_create}>
              {progressCount === 100
                ? " Your Account has Been successfully created"
                : "Please wait your office is under process..."}
            </div>
          </div>
          <div className={styles.final_steps_animated}>
            <div className={styles.image_with_contant}>
              <div className={styles.image_box}>
                <Image
                  src={Images.hospital_1}
                  alt="hospital image"
                  width={65}
                  height={65}
                />
                {count > 10 && (
                  <div className={styles.right_tick_div}>
                    <Image
                      src={Images.white_right_tick}
                      alt="right tick"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
              </div>
              <div className={styles.steps_bussiness_content}>
                Business Profile Setup
              </div>
            </div>
            <div className={styles.image_with_contant}>
              <div className={styles.image_box}>
                <Image
                  src={Images.mobile_1}
                  alt="mobile image"
                  width={65}
                  height={65}
                />
                {count > 40 && (
                  <div className={styles.right_tick_div}>
                    <Image
                      src={Images.white_right_tick}
                      alt="right tick"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
              </div>
              <div className={styles.steps_bussiness_content}>
                Activating Phone Lines and Communication Channels.
              </div>
            </div>
            <div className={styles.image_with_contant}>
              <div className={styles.image_box}>
                <Image
                  src={Images.fax_1}
                  alt="fax image"
                  width={65}
                  height={65}
                />
                {count === 80 && (
                  <div className={styles.right_tick_div}>
                    <Image
                      src={Images.white_right_tick}
                      alt="right tick"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
              </div>
              <div className={styles.steps_bussiness_content}>
                Finalizing Custom Configuration Settings
              </div>
            </div>
            <Counter
              targetValue={80}
              styles={styles}
              setCount={setCount}
              count={count}
            />
          </div>
          <div className={styles.progress_bar_control}>
            <ProgressBar now={progressCount} label={`${progressCount}%`} />
          </div>
          {progressCount === 100 && (
            <div className={styles.buttons_control}>
              <button
                className={styles.go_dashboard}
                onClick={() => setIsOpenProgress(false)}
              >
                Go To Dashboard
              </button>
              <button
                className={styles.team_members}
                onClick={() => {
                  changeTab("clinic-staff");
                  setIsOpenProgress(false);
                }}
              >
                Invite Team Members
              </button>
            </div>
          )}
          <div className={styles.side_unext_image}>
            {reduxTheme ? (
              <Image src={Images.unext_side_img} alt="unext image" />
            ) : (
              <Image src={Images.unext_side_white_img} alt="unext image" />
            )}
          </div>
          <div className={styles.right_side_unext_image}>
            {reduxTheme ? (
              <Image src={Images.unext_side_img} alt="unext image" />
            ) : (
              <Image src={Images.unext_side_white_img} alt="unext image" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalStep;
