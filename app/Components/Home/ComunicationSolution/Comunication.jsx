"use client";
import React from "react";
import styles from "./comunication.module.scss";
import HomeCard from "../../common/homeCard/HomeCard";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";
import Images from "../../Images/Images";
import Image from "next/image";

const Comunication = () => {
  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);
  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.comunication_wrapper} id="comunication">
          <div className={styles.comunication_head}>
            <h2>Communication Solutions that just works</h2>
            <p>An easy-to-use and affordable platform for your Business</p>
          </div>
          <div className={styles.card_div}>
            <HomeCard
              svg={
                isDarkTheme ? (
                  <Image src={Images.communication_arow}></Image>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3150_122)">
                      <path
                        d="M30.9722 15.6051C28.3584 16.7721 26.0893 18.4652 24.2234 20.6396C22.36 22.8111 21.019 25.3307 20.2351 28.1231L20.1901 28.2748L20.2836 28.4051C21.0752 29.525 22.0048 30.5481 23.0488 31.4439C24.0927 32.3398 25.2451 33.1033 26.4751 33.7182L26.6181 33.7908L26.764 33.7257C29.4025 32.5299 31.6865 30.8194 33.5499 28.648C35.4133 26.4765 36.7448 23.9737 37.5015 21.213C37.5411 21.0618 37.7791 20.0492 37.7791 20.0492C38.3503 17.3297 38.3094 14.4655 38.2307 13.752C37.5135 13.7825 34.6763 14.177 32.075 15.1544C32.0775 15.1515 31.1128 15.5405 30.9722 15.6051Z"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32.3288 20.6298C31.6626 20.0582 31.5828 19.0483 32.1569 18.3793C32.7286 17.7131 33.7384 17.6333 34.4075 18.2074C35.0736 18.7791 35.1534 19.7889 34.5793 20.458C34.0052 21.127 32.9978 21.2039 32.3288 20.6298ZM28.7529 24.7969C28.0868 24.2252 28.007 23.2154 28.5811 22.5463C29.1552 21.8773 30.1626 21.8004 30.8316 22.3745C31.4978 22.9461 31.5776 23.956 31.0035 24.625C30.4293 25.2941 29.422 25.371 28.7529 24.7969ZM25.1746 28.9668C24.5084 28.3952 24.4286 27.3853 25.0028 26.7163C25.5744 26.0501 26.5843 25.9703 27.2533 26.5444C27.9194 27.1161 27.9992 28.1259 27.4251 28.795C26.851 29.464 25.8436 29.5409 25.1746 28.9668Z"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.4597 33.6369C18.6166 33.4291 17.7612 33.6965 17.1202 34.4434C16.1997 35.5162 16.0024 38.8621 15.9358 39.2956L15.8527 39.8302L16.3684 39.6668C16.7868 39.5352 20.0639 38.8322 20.9845 37.7595C21.6254 37.0126 21.7574 36.1294 21.4265 35.3246"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.8816 29.2137C20.2393 30.1898 19.6353 31.1737 19.0771 32.1568L18.8873 32.4947L18.9527 32.681C19.147 33.2483 20.2782 34.2991 20.4627 34.4575C20.6473 34.6159 21.8552 35.5773 22.4479 35.6803L22.642 35.7167L22.9442 35.4753C23.8366 34.7739 24.7145 34.0251 25.5793 33.2449"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.1075 27.9649L11.8751 29.3866L10.094 31.0129L15.4391 33.817"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.2433 35.8046L26.7867 42.1777L25.4498 44.185L21.8666 39.3276"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3150_122">
                        <rect
                          width="38"
                          height="38"
                          fill="white"
                          transform="translate(25) rotate(40.6338)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )
              }
              head="No Contracts"
              para="Don't like contracts or long terms commitments? Neither we do! That's
              why uNextComm allows you to pay-as-you-go."
            />
            <HomeCard
              svg={
                isDarkTheme ? (
                  <Image src={Images.communication_msg}></Image>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M23.0386 10.655H31.6472C33.8042 10.655 35.5658 12.4162 35.5658 14.5733V22.536C35.5658 24.693 33.8042 26.4546 31.6472 26.4546H30.1496L27.6954 32.424C27.396 33.1524 26.3696 33.1375 26.0762 32.424L23.622 26.4546H16.88C14.7229 26.4546 12.9618 24.693 12.9618 22.536V18.8346H12.378L9.9237 24.8044C9.63031 25.5175 8.60388 25.5328 8.30496 24.8044L5.85071 18.8346H4.35273C2.19569 18.8346 0.434082 17.0734 0.434082 14.9164V6.95325C0.434082 4.79664 2.19569 3.03503 4.35273 3.03503H19.1199C21.277 3.03503 23.0386 4.79621 23.0386 6.95325V10.655ZM4.31701 10.2796C3.16217 10.2796 3.16217 8.52352 4.31701 8.52352H19.1556C20.3105 8.52352 20.3105 10.2796 19.1556 10.2796H4.31701ZM14.7178 18.8346V22.536C14.7178 23.7236 15.6928 24.6986 16.88 24.6986L24.2075 24.7011C24.5514 24.7015 24.878 24.9056 25.017 25.2437L26.8858 29.7899L28.7269 25.3117C28.8392 24.9562 29.1717 24.6986 29.5641 24.6986H31.6472C32.8348 24.6986 33.8093 23.7236 33.8093 22.536V14.5733C33.8093 13.3861 32.8343 12.4111 31.6472 12.4111H23.0386V14.9164C23.0386 17.0734 21.277 18.8346 19.1199 18.8346H14.7178ZM19.1199 4.79111H4.35273C3.16557 4.79111 2.19058 5.7661 2.19058 6.95325V14.9164C2.19058 16.1036 3.16557 17.0785 4.35273 17.0785H6.43578C6.82824 17.0785 7.16075 17.3362 7.27343 17.6917L9.11412 22.1699L10.9833 17.6237C11.1219 17.2856 11.4485 17.0815 11.7925 17.0811L19.1199 17.0785C20.3075 17.0785 21.2821 16.1036 21.2821 14.9164V6.95325C21.2821 5.7661 20.3075 4.79111 19.1199 4.79111Z"
                      fill="white"
                    />
                  </svg>
                )
              }
              head="Free Equipment"
              para="All included. No need to invest in equipment or installation fees."
            />
            <HomeCard
              svg={
                isDarkTheme ? (
                  <Image src={Images.communication_user}></Image>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3150_148)">
                      <path
                        d="M13.2039 33.5864C13.2039 30.7784 15.4719 28.5104 18.2799 28.5104C21.0879 28.5104 23.3559 30.7784 23.3559 33.5864H13.2039Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.2799 26.5303C19.9102 26.5303 21.2319 25.2087 21.2319 23.5783C21.2319 21.948 19.9102 20.6263 18.2799 20.6263C16.6495 20.6263 15.3279 21.948 15.3279 23.5783C15.3279 25.2087 16.6495 26.5303 18.2799 26.5303Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.294 7.91842C19.9244 7.91061 21.2397 6.58262 21.2319 4.95227C21.2241 3.32193 19.8961 2.00661 18.2657 2.01442C16.6354 2.02223 15.3201 3.35022 15.3279 4.98056C15.3357 6.61091 16.6637 7.92623 18.294 7.91842Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.2039 14.9743C13.2039 12.1663 15.4719 9.89832 18.2799 9.89832C21.0879 9.89832 23.3559 12.1663 23.3559 14.9743H13.2039Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25.4077 25.2702C25.4077 22.4622 27.6757 20.1942 30.4837 20.1942C33.2917 20.1942 35.5597 22.4622 35.5597 25.2702H25.4077Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M30.4984 18.2144C32.1287 18.2065 33.444 16.8785 33.4361 15.2482C33.4282 13.6178 32.1002 12.3025 30.4698 12.3104C28.8395 12.3183 27.5242 13.6464 27.5321 15.2767C27.54 16.9071 28.868 18.2223 30.4984 18.2144Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.999756 25.2702C0.999756 22.4622 3.26776 20.1942 6.07576 20.1942C8.88376 20.1942 11.1518 22.4622 11.1518 25.2702H0.999756Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.08989 18.2145C7.72023 18.2066 9.03556 16.8787 9.02775 15.2483C9.01995 13.618 7.69196 12.3026 6.06162 12.3105C4.43127 12.3183 3.11595 13.6462 3.12375 15.2766C3.13156 16.9069 4.45954 18.2223 6.08989 18.2145Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3150_148">
                        <rect width="36" height="36" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )
              }
              head="Personalize Support"
              para="Access to our personalized support team, we configure your system based on your business needs"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comunication;
