import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Images from "../Images/Images";
import { scroller } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "react-responsive-modal";
import { Nav } from "react-bootstrap";
import RequestDemo from "../common/RequestDemo/RequestDemo";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useAppSelector } from "@/app/store/lib/hooks";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDarkTheme = useAppSelector((state) => state.darkTheme.isDarkTheme);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sectionId = localStorage.getItem("scrollTo");
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
      localStorage.removeItem("scrollTo");
    }
  }, []);

  const routes = ["/terms-and-condition/", "/privacy-policy/"];

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    localStorage.setItem("scrollTo", "aboutus");
    router.push("/");
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    localStorage.setItem("scrollTo", "comunication");
    router.push("/");
  };

  const AboutUsLink = () => (
    <Link
      style={{ color: "#D2D2D4", textDecoration: "none" }}
      href=""
      onClick={handleAboutUsClick}
    >
      <span className={styles.green_greater}>&gt;</span>About Us
    </Link>
  );
  const ServicesLink = () => (
    <Link
      style={{ color: "#D2D2D4", textDecoration: "none" }}
      href=""
      onClick={handleServicesClick}
    >
      <span className={styles.green_greater}>&gt;</span>Services
    </Link>
  );

  const AboutUsNavLink = () => (
    <Nav.Link
      href=""
      onClick={() => {
        scroller.scrollTo("aboutus", {
          smooth: true,
          offset: -70,
          duration: 50,
        });
      }}
      className={styles.nav_link}
    >
      <span className={styles.green_greater}>&gt;</span>About Us
    </Nav.Link>
  );

  const ServicesNavLink = () => (
    <Nav.Link
      href=""
      onClick={() => {
        scroller.scrollTo("comunication", {
          smooth: true,
          offset: -70,
          duration: 50,
        });
      }}
      className={styles.nav_link}
    >
      <span className={styles.green_greater}>&gt;</span>Services
    </Nav.Link>
  );

  // const scrollToSection = (sectionId) => {
  //   scroller.scrollTo(sectionId, {
  //     smooth: true,
  //     offset: -70,
  //     duration: 500,
  //   });
  // };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className={styles.footer_wrapper}>
          <div className="container">
            <div className={styles.ffot_main}>
              <div className={styles.footer_conts}>
                {isDarkTheme ? (
                  <Image src={Images.unextlogodarktheme} alt="" />
                ) : (
                  <Image src={Images.unext_logo2} alt="" />
                )}

                <div className={styles.footdiv}>
                  <p>
                    Uncover the Potential of the uNext Platform to Elevate Your
                    Business Through Improved Patient And Staff Communication,
                    All Within A Single, Integrated Platform. Grow Your Business
                    to Unprecedented Heights
                  </p>
                </div>
                <div className={styles.footer_icons}>
                  <a
                    className={styles.link_remove}
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <div className={styles.icon_box}>
                      {isDarkTheme ? (
                        <svg
                          width="10"
                          height="19"
                          viewBox="0 0 10 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.4908 18.7899V10.2189H9.43911L9.88051 6.87861H6.4908V4.74595C6.4908 3.77889 6.76604 3.11978 8.18733 3.11978L10 3.11896V0.131477C9.68636 0.0909176 8.61042 0 7.35864 0C4.74517 0 2.95593 1.55658 2.95593 4.41531V6.87871H0V10.219H2.95584V18.79L6.4908 18.7899Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.facebookIcon} alt="facebook icon" />
                      )}
                    </div>
                  </a>
                  <a
                    className={styles.link_remove}
                    href="https://www.twitter.com/"
                    target="_blank"
                  >
                    <div className={styles.icon_box}>
                      {isDarkTheme ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_7534_1171)">
                            <path
                              d="M9.39698 6.87774L14.8576 0.666748H13.5638L8.82018 6.05854L5.03427 0.666748H0.666656L6.39298 8.82081L0.666656 15.3334H1.96047L6.96672 9.63818L10.9657 15.3334H15.3333L9.39698 6.87774ZM7.62434 8.89239L7.04326 8.07992L2.42705 1.62116H4.41461L8.14113 6.83552L8.71976 7.64799L13.5631 14.4255H11.5756L7.62434 8.89239Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_7534_1171">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <Image src={Images.twitterIcon} alt="twitter icon" />
                      )}
                    </div>
                  </a>
                  <Link
                    className={styles.link_remove}
                    href="https://www.instagram.com/"
                    target="_blank"
                  >
                    <div className={styles.icon_box}>
                      {isDarkTheme ? (
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.155 12.0845C10.773 12.0845 12.0846 10.7729 12.0846 9.15494C12.0846 7.53697 10.773 6.22534 9.155 6.22534C7.53703 6.22534 6.2254 7.53697 6.2254 9.15494C6.2254 10.7729 7.53703 12.0845 9.155 12.0845Z"
                            fill="#FDFDFD"
                          />
                          <path
                            d="M13.1832 0H5.1268C3.76709 0 2.46307 0.540143 1.5016 1.5016C0.540143 2.46307 0 3.76709 0 5.1268V13.1832C0 14.5429 0.540143 15.8469 1.5016 16.8084C2.46307 17.7699 3.76709 18.31 5.1268 18.31H13.1832C14.5429 18.31 15.8469 17.7699 16.8084 16.8084C17.7699 15.8469 18.31 14.5429 18.31 13.1832V5.1268C18.31 3.76709 17.7699 2.46307 16.8084 1.5016C15.8469 0.540143 14.5429 0 13.1832 0ZM9.155 13.5494C8.28587 13.5494 7.43626 13.2917 6.7136 12.8088C5.99095 12.3259 5.42771 11.6396 5.0951 10.8367C4.7625 10.0337 4.67548 9.15013 4.84504 8.2977C5.0146 7.44527 5.43312 6.66226 6.04769 6.04769C6.66226 5.43312 7.44527 5.0146 8.2977 4.84504C9.15013 4.67548 10.0337 4.7625 10.8367 5.0951C11.6396 5.42771 12.3259 5.99095 12.8088 6.7136C13.2917 7.43626 13.5494 8.28587 13.5494 9.155C13.5494 10.3205 13.0864 11.4382 12.2623 12.2623C11.4382 13.0864 10.3205 13.5494 9.155 13.5494ZM13.9156 5.493C13.6983 5.493 13.4859 5.42857 13.3053 5.30785C13.1246 5.18714 12.9838 5.01556 12.9006 4.81482C12.8175 4.61407 12.7957 4.39318 12.8381 4.18007C12.8805 3.96697 12.9851 3.77121 13.1388 3.61757C13.2924 3.46393 13.4882 3.3593 13.7013 3.31691C13.9144 3.27452 14.1353 3.29628 14.336 3.37943C14.5368 3.46258 14.7083 3.60339 14.8291 3.78405C14.9498 3.96471 15.0142 4.17712 15.0142 4.3944C15.0142 4.68577 14.8985 4.9652 14.6924 5.17123C14.4864 5.37725 14.207 5.493 13.9156 5.493Z"
                            fill="#FDFDFD"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.instaIcon} alt="instaIcon icon" />
                      )}
                    </div>
                  </Link>
                  <Link
                    className={styles.link_remove}
                    href="https://www.youtube.com/"
                    target="_blank"
                  >
                    <div className={styles.icon_box}>
                      {isDarkTheme ? (
                        <svg
                          width="20"
                          height="15"
                          viewBox="0 0 20 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clip-rule="evenodd"
                            d="M7.935 10.3129L7.93417 4.77922L13.3383 7.55545L7.935 10.3129ZM19.8 3.82013C19.8 3.82013 19.6042 2.46338 19.005 1.86527C18.2442 1.08056 17.3921 1.0769 17.0012 1.03126C14.2025 0.832031 10.0046 0.832031 10.0046 0.832031H9.99542C9.99542 0.832031 5.7975 0.832031 2.99875 1.03167C2.6075 1.0769 1.75583 1.08056 0.994583 1.86527C0.395 2.46297 0.2 3.82013 0.2 3.82013C0.2 3.82013 0 5.4144 0 7.00786V8.50232C0 10.0962 0.2 11.6896 0.2 11.6896C0.2 11.6896 0.395 13.0468 0.994583 13.6445C1.75583 14.4292 2.755 14.4048 3.2 14.4867C4.8 14.6378 10 14.6847 10 14.6847C10 14.6847 14.2025 14.6786 17.0012 14.4789C17.3921 14.4329 18.2442 14.4292 19.005 13.6445C19.6046 13.0468 19.8 11.6896 19.8 11.6896C19.8 11.6896 20 10.0966 20 8.50232V7.00786C20 5.4144 19.8 3.82013 19.8 3.82013Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <Image src={Images.youtubeIcon} alt="yt icon" />
                      )}
                    </div>
                  </Link>
                </div>
              </div>
              <div className={styles.footer_links_col}>
                <div className={styles.pages_tags}>
                  <div className={styles.footer_links_tags}>
                    <div className={styles.footer_head}>Useful Link</div>
                    <Link className={styles.link_remove} href="/">
                      <div
                        className={styles.footer_links}
                        // onClick={() => scrollToSection("home")}
                      >
                        <span className={styles.green_greater}>&gt;</span>Home
                      </div>
                    </Link>
                    <Link className={styles.link_remove} href="/">
                      <div
                        className={styles.footer_links}
                        // onClick={() => scrollToSection("aboutus")}
                      >
                        {routes.includes(pathname) ? (
                          <AboutUsLink />
                        ) : (
                          pathname === "/" && <AboutUsNavLink />
                        )}
                      </div>
                    </Link>
                    <Link
                      className={styles.link_remove}
                      href="/"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={styles.footer_links}
                        // onClick={() => scrollToSection("comunication")}
                      >
                        {/* <span className={styles.green_greater}>&gt;</span>Services */}
                        {routes.includes(pathname) ? (
                          <ServicesLink />
                        ) : (
                          pathname === "/" && <ServicesNavLink />
                        )}
                      </div>
                    </Link>
                    {/* <Link className={styles.link_remove} href="/"> */}
                    <button className={styles.request_demo_btn}>
                      <div
                        className={styles.footer_links}
                        onClick={onOpenModal}
                      >
                        <span className={styles.green_greater}>&gt;</span>
                        Request Demo
                      </div>
                    </button>
                    {/* </Link> */}
                  </div>
                  <div className={styles.footer_links_tags}>
                    <div className={styles.footer_head}>Other</div>

                    <Link
                      className={styles.link_remove}
                      href="/terms-and-condition"
                    >
                      <div className={styles.footer_links}>
                        <span className={styles.green_greater}>&gt;</span>Terms
                        and Conditions{" "}
                      </div>
                    </Link>
                    <Link className={styles.link_remove} href="/privacy-policy">
                      <div className={styles.footer_links}>
                        <span className={styles.green_greater}>&gt;</span>
                        Privacy Policy
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isDarkTheme ? (
          <div className={styles.footer_div}>
            <span>Designed and Developed by CYBERTOUCH LLC.</span>
          </div>
        ) : (
          ""
        )}
      </div>
      {open && (
        <Modal open={open} onClose={onCloseModal} center width="50w">
          <RequestDemo onCloseModal={onCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default Footer;
