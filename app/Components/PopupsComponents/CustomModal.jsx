import React, { useState, useEffect } from "react";
import "./customModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({
  children,
  isOpen,
  onClose,
  shouldCloseOnOutsideClick = true,
}) => {
  const [show, setShow] = useState(isOpen);
  const reduxTheme = useSelector((state) => state.darkTheme.isDarkTheme);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && shouldCloseOnOutsideClick) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${show ? "show" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`custom-modal-container ${reduxTheme ? "dark" : "light"}`}
      >
        <div className="custom-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
