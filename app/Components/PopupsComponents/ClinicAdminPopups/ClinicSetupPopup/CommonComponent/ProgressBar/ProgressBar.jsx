import React from "react";
import "./ProgressBar.css";

const ProgressBar = () => (
  <div className="container">
    <div className="step line-only">
      <div className="v-stepper">
        <div className="line"></div>
      </div>
    </div>
    <div className="step active">
      <div className="v-stepper">
        <div className="circle">
          <span>1</span>
        </div>
        <div className="line"></div>
      </div>
      <div className="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
    </div>
    <div className="step">
      <div className="v-stepper">
        <div className="circle">
          <span>2</span>
        </div>
        <div className="line"></div>
      </div>
      <div className="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
    </div>
    <div className="step">
      <div className="v-stepper">
        <div className="circle">
          <span>3</span>
        </div>
        <div className="line"></div>
      </div>
      <div className="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
    </div>
  </div>
);

export default ProgressBar;
