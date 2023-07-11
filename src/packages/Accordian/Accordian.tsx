import React, { useState } from "react";
import styles from  "./accordian.module.css"; // Import the CSS file for styling
import Flex from "../Flex/Flex";

const Accordion = ({ title, children }: { title: string; children: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <div onClick={handleToggle} className={styles.overallAccordian} >
        <Flex row between className={styles.accordianHeads}>
          <Flex column>
            <div className={styles.accordianInnerHead} >
              <h3>{title}</h3>
            </div>
          </Flex>

          <Flex column className={styles.alingCenter}>
            <div className={styles.accordianInnerHead}>
              <span className={`accordion-icon ${isOpen ? "open" : ""}`}>
                &#9660;
              </span>
            </div>
          </Flex>
        </Flex>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
