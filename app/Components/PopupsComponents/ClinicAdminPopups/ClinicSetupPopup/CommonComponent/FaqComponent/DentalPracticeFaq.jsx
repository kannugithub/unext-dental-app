import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../clinicSetupInto.module.scss";
import FaqComponents from "./FaqComponents";

const DentalPracticeFaq = () => {
  const faqs = [
    {
      key: "0",
      header: "How many offices can be added per account?",
      body: "Once you create the main account, you can add an unlimited number of offices. Each office can have its individual logins, while as the owner, you will be able to view them all from a single Dashboard.",
    },
    {
      key: "1",
      header: "Is there a cost for porting numbers or initial setup?",
      body: "We do not charge for your initial setup, porting numbers, or choosing new numbers. As long as you have at least one extension, you can open an account without any additional fees.",
    },
    {
      key: "2",
      header: "Is there a limit on the number of extensions?",
      body: "There is no limit on the number of extensions that can be added to each location. You have the flexibility to add them during the setup process or at a later time through our online Dashboard. Additionally, we will ship out physical phones to your location at no cost on the next business day.",
    },
    {
      key: "3",
      header: "Do I have to pay for talk time or any other fees?",
      body: "No, uNext was designed to provide affordable services with high-quality IP Phones specifically tailored for the Dental Industry. All services including phone calls, text messaging and fax are unlimited and included in our service package without any additional charges.",
    },
  ];
  return (
    <>
      {faqs.map((faq) => (
        <Accordion defaultActiveKey="0" key={faq.key}>
          <FaqComponents
            eventKey={faq.key}
            header={faq.header}
            body={faq.body}
          />
        </Accordion>
      ))}
    </>
  );
};

export default DentalPracticeFaq;
