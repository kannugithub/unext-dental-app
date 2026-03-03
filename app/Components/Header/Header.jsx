"use client";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import styles from "./header.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { validateInput } from "../common/ValidateInput/validateInput";
import { sendDemoDetails } from "@/app/store/slices/authSlices";
import { unwrapResult } from "@reduxjs/toolkit";
import RequestDemo from "../common/RequestDemo/RequestDemo";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/app/ThemeToggle";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";

function Header() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const toggleMenu = () => {
    setMenuOpen(true);
  };

  const isDarkTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  const handleChangeMode = (tab) => {
    dispatch(handleDarkTheme(tab));
  };

  const onOpenModal = () => {
    setOpen(true);
    setMenuOpen(false);
  };
  const onCloseModal = () => setOpen(false);

  const handleClose = () => setMenuOpen(false);

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

  const routes = ["/terms-and-condition/", "/privacy-policy/", "/signup/"];

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    if (typeof window !== undefined) {
      localStorage.setItem("scrollTo", "aboutus");
    }
    router.push("/");
  };

  const AboutUsLink = () => (
    <Link href="" onClick={handleAboutUsClick}>
      About us
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
        setMenuOpen(false);
      }}
    >
      About Us
    </Nav.Link>
  );
  const SigupNavLink = () => (
    <Nav.Link
      href=""
      onClick={() => {
        scroller.scrollTo("subscribeSection", {
          smooth: true,
          offset: -70,
          duration: 50,
        }),
          setMenuOpen(false);
      }}
    >
      <Button
        className={styles.login_head_btn}
        style={{
          backgroundColor: "#0a22a8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Image
          src={isDarkTheme ? Images.userIcon2 : Images.userIcon2}
          alt="user icon"
        />
        Sign up
      </Button>
    </Nav.Link>
  );
  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (typeof window !== undefined) {
      localStorage.setItem("scrollTo", "subscribeSection");
    }
    router.push("/");
  };

  const SignupLink = () => (
    <Link href="" onClick={handleSignUpClick}>
      <Button
        className={styles.login_head_btn}
        style={{
          backgroundColor: "#0a22a8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Image
          src={Images.userIcon2}
          alt="user icon"
        />
        Sign up
      </Button>
    </Link>
  );

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    localStorage.setItem("scrollTo", "features");
    router.push("/");
  };

  const FeaturesLink = () => (
    <Link href="" onClick={handleFeaturesClick}>
      Features
    </Link>
  );
  const FeaturesNavLink = () => (
    <Nav.Link
      href=""
      onClick={() => {
        scroller.scrollTo("features", {
          smooth: true,
          offset: -70,
          duration: 50,
        }),
          setMenuOpen(false);
      }}
    >
      Features
    </Nav.Link>
  );

  const inputHeaderHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokens = window.localStorage.getItem("token");
      setIsLoggedIn(!!tokens);
    }
  }, []);

  const seduleSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors(validateInput(values));

    const data = {
      email: values?.email,
      title: "Testing Demo",
      first_name: values?.first_name,
      last_name: values?.last_name,
      date: values?.date,
      address: values?.address,
    };
    try {
      const actionResult = await dispatch(sendDemoDetails({ data, setOpen }));
      const { success, message } = unwrapResult(actionResult);
      if (success) {
        toast.success(message);
        // setOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, []);

  return (
    <>
      <div className={isDarkTheme ? styles.darkHeader : styles.lightHeader}>
        <div className="container">
          <Navbar expand="lg" className={styles.navbars}>
            <Container fluid>
              <div className={styles.header_wrapper}>
                <div className={styles.img_div}>
                  <Link href="/">
                    <Image
                      src={
                        isDarkTheme
                          ? Images.unextlogodarktheme
                          : Images.unext_logo
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>

              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand`}
                onClick={toggleMenu}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand`}
                aria-labelledby={`offcanvasNavbarLabel-expand`}
                placement="end"
                show={menuOpen}
                onHide={handleClose}
                className={
                  menuOpen && isDarkTheme ? styles.darkMenu : styles.lightMenu
                }
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                    uNext
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body hide>
                  <Nav className={styles.navs}>
                    <Nav.Link
                      href="/"
                      className={styles.active_home}
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Nav.Link>

                    {routes.includes(pathname) ? (
                      <AboutUsLink />
                    ) : (
                      pathname === "/" && <AboutUsNavLink />
                    )}

                    {routes.includes(pathname) ? (
                      <FeaturesLink />
                    ) : (
                      pathname === "/" && <FeaturesNavLink />
                    )}

                    {isLoggedIn ? (
                      <>
                        <Nav.Link href="/dashboard/clinic-dashboard">
                          Dashboard
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <div
                          className={
                            isDarkTheme
                              ? styles.light_login_btn
                              : styles.login_btn_link
                          }
                        >
                          <Link href="/login">Login</Link>
                        </div>

                        {routes.includes(pathname) ? (
                          <SignupLink />
                        ) : (
                          pathname === "/" && <SigupNavLink />
                        )}
                      </>
                    )}
                    <Button className={styles.btn_head} onClick={onOpenModal}>
                      <Image
                        src={
                          isDarkTheme
                            ? Images.calenderIcon
                            : Images.theme_calender
                        }
                        alt="celender icon"
                      />
                      Schedule A Demo
                    </Button>
                    <ThemeToggle />
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        overlayClassName="modal_overlay"
        className="modal_wrapper"
      >
        <RequestDemo onCloseModal={onCloseModal} />
      </Modal>
    </>
  );
}

export default Header;
