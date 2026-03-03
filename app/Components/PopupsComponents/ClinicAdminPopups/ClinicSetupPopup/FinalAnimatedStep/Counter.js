import React, { useEffect, useState } from "react";

const Counter = ({ targetValue, styles, setCount, count }) => {
  useEffect(() => {
    if (targetValue) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === targetValue) {
            clearInterval(interval);
            return prevCount;
          } else {
            return prevCount + 1;
          }
        });
      }, 35);

      return () => clearInterval(interval);
    }
  }, [targetValue]);

  return (
    <div className={styles.dot_progress} style={{ width: `${count}%` }}></div>
  );
};

export default Counter;
