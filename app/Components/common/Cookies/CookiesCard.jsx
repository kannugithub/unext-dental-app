"use client";
import React, { useEffect, useState } from "react";
import "./cookiesCard.css";
import CookieConsent from "react-cookie-consent";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useAppSelector } from "@/app/store/lib/hooks";
import Images from "../../Images/Images";
import Image from "next/image";

const CookieCard = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined
      return window.localStorage.getItem("cookieCardDeclined") !== "true";
    }
    return true; // Default value if window is not defined
  });
  // const [isDarkTheme, setIsDarkTheme] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsDarkTheme(localStorage.getItem("theme"));
  //   }
  // }, []);

  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "myAwesomeCookieName3=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      // Check if window is defined
      window.localStorage.setItem("cookieCardDeclined", "true");
    }
    setIsVisible(false);
  };
  const backgroundColor = isDarkTheme ? "#0000" : "#ffff";
  return (
    isVisible && (
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myAwesomeCookieName3"
        overlay={true}
        style={{
          width: "100%",
          margin: "0",
          left: "0",
          right: "0",
          zIndex: "9999",
          backgroundColor: backgroundColor,
        }}
        buttonStyle={{ display: "none" }}
        declineButtonStyle={{ display: "none" }}
        enableDeclineButton
        flipButtons={true}
        hideOnAccept={true}
        expires={150}
        onAccept={handleAccept}
        onDecline={handleDecline}
      >
        <div className={isDarkTheme ? "darkCookies" : "lightCookies"}>
          <div className="container">
            <div className="cookie_wrapper">
              <div className="leftside">
                <div>
                  {isDarkTheme ? (
                    <Image src={Images.dark_cookies}></Image>
                  ) : (
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="36"
                        cy="36"
                        r="36"
                        fill="#0A22A8"
                        fill-opacity="0.09"
                      />
                      <path
                        d="M24.4 33.1C26.0016 33.1 27.3 31.8017 27.3 30.2C27.3 28.5984 26.0016 27.3 24.4 27.3C22.7984 27.3 21.5 28.5984 21.5 30.2C21.5 31.8017 22.7984 33.1 24.4 33.1Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M36.0001 38.9C37.6018 38.9 38.9001 37.6016 38.9001 36C38.9001 34.3984 37.6018 33.1 36.0001 33.1C34.3985 33.1 33.1001 34.3984 33.1001 36C33.1001 37.6016 34.3985 38.9 36.0001 38.9Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M44.6999 47.6C44.6999 49.2016 43.4016 50.5 41.7999 50.5C40.1982 50.5 38.8999 49.2016 38.8999 47.6C38.8999 45.9983 40.1982 44.7 41.7999 44.7C43.4016 44.7 44.6999 45.9983 44.6999 47.6Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M27.2999 47.6C28.9015 47.6 30.1999 46.3017 30.1999 44.7C30.1999 43.0984 28.9015 41.8 27.2999 41.8C25.6983 41.8 24.3999 43.0984 24.3999 44.7C24.3999 46.3017 25.6983 47.6 27.2999 47.6Z"
                        fill="#0A22A8"
                      />
                      <path
                        d="M36 12.8C23.187 12.8 12.8 23.187 12.8 36C12.8 48.8131 23.187 59.2 36 59.2C48.8131 59.2 59.2 48.8131 59.2 36C59.2 34.5754 59.0716 33.1796 58.8248 31.8238C58.7253 31.2766 58.3216 30.8346 57.7857 30.686C57.2498 30.5373 56.6762 30.7084 56.309 31.1262C55.2439 32.3384 53.6869 33.1 51.95 33.1C48.7467 33.1 46.15 30.5033 46.15 27.3C46.15 26.5344 45.6176 25.876 44.8764 25.7101C42.2852 25.1302 40.35 22.8144 40.35 20.05C40.35 18.4183 41.022 16.946 42.108 15.8904C42.4871 15.5221 42.6355 14.9767 42.4958 14.467C42.356 13.9574 41.9497 13.5641 41.4358 13.4407C39.6909 13.0217 37.8703 12.8 36 12.8ZM15.7 36C15.7 24.7887 24.7887 15.7 36 15.7C36.8561 15.7 37.6992 15.7529 38.5262 15.8556C37.8407 17.0994 37.45 18.5296 37.45 20.05C37.45 23.8593 39.8971 27.0942 43.3037 28.2734C43.7877 32.6201 47.4742 36 51.95 36C53.5213 36 54.9959 35.5827 56.2681 34.854C56.2893 35.2332 56.3 35.6153 56.3 36C56.3 47.2114 47.2114 56.3 36 56.3C24.7887 56.3 15.7 47.2114 15.7 36Z"
                        fill="#0A22A8"
                      />
                    </svg>
                  )}
                </div>
                <div className="cookies_contant">
                  <div style={{ flexBasis: "60%" }}>
                    {/* <h4>Do you need a cookie policy and privacy policy?</h4> */}
                    <div className="collect_cookies">
                      At <span style={{ textTransform: "none" }}>uNEXT</span>,
                      we prioritize the privacy and security of our users. This
                      Cookie Policy outlines how we utilize cookies on our
                      website. Please read this policy carefully to understand
                      how we collect and use these cookies.{" "}
                      <a
                        style={{
                          color: "rgba(64, 158, 238, 1)",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        href="/cookie-policy"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                  <div className="cookies_buttons">
                    <button className="decline_buttons" onClick={handleDecline}>
                      Decline
                    </button>
                    <button className="accept_buttons" onClick={handleAccept}>
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CookieConsent>
    )
  );
};

export default CookieCard;
