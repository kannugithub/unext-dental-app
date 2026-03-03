import React from "react";

const DoubleArrow = () => {
  const styles = {
    border: "1px solid gray",
    padding: "0px 4px",
    borderRadius: "3px",
    color: "gray",
    background: "#3a3a3a",
  };
  return (
    <div style={styles}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 7 10"
        fill="gray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.00302 3.50098L3.50151 0.999467L1 3.50098"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.00888 6.58691L3.50737 9.08842L1.00586 6.58691"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default DoubleArrow;
