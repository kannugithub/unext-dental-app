import React from "react";
import "./finalAnimatedStep.module.scss";
import "./multiStep.css";

const FinalAnimatedStep = ({ steps, currentStep }) => {
  return (
    <div className="progress-bar-container">
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${currentStep >= index ? "completed" : ""}`}
          >
            <div className="icon">{step.icon}</div>
            <div className="title">{step.title}</div>
            {index < steps.length - 1 && (
              <div
                className={`divider ${currentStep > index ? "completed" : ""}`}
              >
                <div className="dots"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="progress-line-container">
        <div
          className="progress-line"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FinalAnimatedStep;
