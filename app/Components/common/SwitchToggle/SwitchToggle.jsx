import React, { useEffect, useState } from "react";
import styles from "./toggle.module.scss";
import Popup from "./Popup";

const SwitchToggle = ({ onToggle, id, toggleStates }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    onToggle(id, !isChecked);
  };

  useEffect(() => {
    setIsChecked(toggleStates[id] || false);
  }, [toggleStates, id]);

  return (
    <div className={styles.toggle_wrapper}>
      <input
        type="checkbox"
        id={`switch-${id}`}
        checked={isChecked}
        onChange={handleClick}
      />
      <label htmlFor={`switch-${id}`}></label>
      {isChecked && <Popup />}
    </div>
  );
};

export default SwitchToggle;
