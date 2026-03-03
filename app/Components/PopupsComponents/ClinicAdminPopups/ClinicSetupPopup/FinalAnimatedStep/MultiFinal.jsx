import React, { useEffect, useState } from "react";
import FinalAnimatedStep from "./FinalAnimatedStep";

const steps = [
  { title: "Business Profile Setup", icon: "🏢" },
  { title: "Activating Phone Lines And Communication Channels", icon: "📱" },
  { title: "Finalizing Custom Configuration Settings", icon: "📞" },
];
const MultiFinal = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 5000); // 5000ms or 5 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Multi-Step Progress Bar</h1>
      <FinalAnimatedStep steps={steps} currentStep={currentStep} />
    </div>
  );
};

export default MultiFinal;
