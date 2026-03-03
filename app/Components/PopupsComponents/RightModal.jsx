import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./rightmodal.css";
import { setDarkTheme } from "@/app/store/slices/darkThemeSlice";
import { useSelector } from "react-redux";

const RightCustomModal = ({
  children,
  isOpen,
  onClose,
  width,
  shouldCloseOnOutsideClick,
}) => {
  const [show, setShow] = useState(isOpen);
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  console.log("show", show);

  const handleClose = () => {
    setShow(false);
    return onClose();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(reduxTheme ? "dark" : "light");
    }
  }, [reduxTheme]);

  return (
    <div className={isDarkTheme ? "darkHeader" : "lightHeader"}>
      <Modal
        autoFocus
        centered={false}
        show={show}
        onHide={handleClose}
        dialogClassName={`modal-${width}`}
        backdrop={shouldCloseOnOutsideClick ? true : "static"}
      >
        <div
          className={
            isDarkTheme === "dark" ? "modal-content-dark" : "modal-content"
          }
        >
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default RightCustomModal;
