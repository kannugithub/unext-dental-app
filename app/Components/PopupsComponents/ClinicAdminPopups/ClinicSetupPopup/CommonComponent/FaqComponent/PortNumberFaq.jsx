import React from "react";
import Accordion from "react-bootstrap/Accordion";

const PortNumberFaq = () => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className={styles.accordion_item}>
          <Accordion.Header>
            Can I choose a specific area code for my business phone number?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can choose a specific area code for your business phone
            number.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="1" className={styles.accordion_item}>
          <Accordion.Header>
            Is it possible to transfer or port an existing phone number to my
            new business phone service?
          </Accordion.Header>
          <Accordion.Body>
            Yes, it is possible to transfer or port an existing phone number to
            your new business phone service.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="2" className={styles.accordion_item}>
          <Accordion.Header>
            Are there any additional fees associated with selecting a specific
            phone number?
          </Accordion.Header>
          <Accordion.Body>
            There may be additional fees associated with selecting a specific
            phone number, depending on the provider.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="3" className={styles.accordion_item}>
          <Accordion.Header>
            Can I choose a vanity or memorable phone number for my business?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can choose a vanity or memorable phone number for your
            business, subject to availability of course.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="4" className={styles.accordion_item}>
          <Accordion.Header>
            What options are available if the desired phone number is not
            currently available?
          </Accordion.Header>
          <Accordion.Body>
            If the desired phone number is not currently available, alternative
            options will be provided by the service provider.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="5" className={styles.accordion_item}>
          <Accordion.Header>
            Can I have multiple phone numbers associated with my business
            account?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can have multiple phone numbers associated with your
            business account.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="6" className={styles.accordion_item}>
          <Accordion.Header>
            Is there a limit on the number of extensions or lines that can be
            connected to the chosen phone number?
          </Accordion.Header>
          <Accordion.Body>
            The limit on the number of extensions or lines connected to a chosen
            phone number varies depending on the service provider and plan
            chosen.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="7" className={styles.accordion_item}>
          <Accordion.Header>
            Are toll-free numbers available, and what are the associated costs,
            if any?
          </Accordion.Header>
          <Accordion.Body>
            Toll-free numbers are often available and associated costs depend on
            the service provider and plan selected.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="8" className={styles.accordion_item}>
          <Accordion.Header>
            Can I add international calling capabilities to my business phone
            service and obtain international numbers if needed?
          </Accordion.Header>
          <Accordion.Body>
            International calling capabilities and obtaining international
            numbers are typically offered as add-on features by most business
            phone service providers.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="9" className={styles.accordion_item}>
          <Accordion.Header>
            How long does it take to activate and assign a new business phone
            number once it's selected?
          </Accordion.Header>
          <Accordion.Body>
            The time it takes to activate and assign a new business phone number
            varies but is usually completed within a few hours to several days
            depending on the workload at that time.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PortNumberFaq;
