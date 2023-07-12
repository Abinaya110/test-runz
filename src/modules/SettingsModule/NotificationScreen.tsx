import React, { useState } from "react";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settings.module.css";
// import Switch from "react-switch";
import Switch from "../../packages/Switch/Switch";

import ScreenHeader from "./ScreenHeader";

const cx = classNames.bind(styles);

const NotificationScreen = () => {
  const notifyCard = [
    {
      id: 1,
      heading: "New procedure created",
      subHead:
        "You will receive notifications whenever a new procedure is created.",
      isNotifyActive: true,
      isEmailActive: false,
    },
    {
      id: 2,
      heading: "Task submitted",
      subHead:
        "You will receive notifications whenever an assigned task is submitted.",
      isNotifyActive: true,
      isEmailActive: true,
    },
    {
      id: 3,
      heading: "Messages",
      subHead:
        "You will receive notifications whenever a new message or comment is received on runz.",
      isNotifyActive: false,
      isEmailActive: false,
    },
  ];
  const [cardDetails, setCardDetails] = useState(notifyCard);
  const handleLogin = () => {
    console.log("hitted");
  };

  const handleChange = (id: any, val: any) => {
    const updated = cardDetails.map((res) => {
      if (res.id === id) {
        res.isNotifyActive =
          val === "notify" ? !res.isNotifyActive : res.isNotifyActive;
        res.isEmailActive =
          val === "email" ? !res.isEmailActive : res.isEmailActive;
        return res;
      } else {
        return res;
      }
    });

    setCardDetails(updated);
  };
  return (
    <Flex>
      <ScreenHeader
        title={"Notification Settings"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch={true}
        isBtn={false}
      />

      <Flex row between className={styles.contentSpace}>
        <Flex column>
          <Text size={20} bold="semiBold" className={styles.rightHead}>
            Alerts
          </Text>

          <Text size={16} bold="light" className={styles.rightHead}>
            Select the options you want to get alerted via email and
            notification.
          </Text>
        </Flex>
      </Flex>

      {cardDetails.map((c: any) => {
        return (
          <Flex className={styles.notifyCardLayout}>
            <Flex row between className={styles.contentSpace}>
              <Flex column>
                <Text size={16} bold="semiBold" className={styles.rightHead}>
                  {c.heading}
                </Text>

                <Text
                  size={16}
                  bold="light"
                  className={cx("rightHead", "marginTopToggel")}
                >
                  {c.subHead}
                </Text>
              </Flex>

              <Flex column className={styles.rightSearch}>
                <Flex row between>
                    <Switch 
                    label="Notification"
                    labelColor="gray"
                    checked={c.isNotifyActive}
                    onClick={() => handleChange(c.id, "notify")}
                    />
                </Flex>

                <Flex row between className={styles.marginTopToggel}>
                  <Switch 
                    label="Email"
                    labelColor="gray"
                    checked={c.isNotifyActive}
                    onClick={() => handleChange(c.id, "notify")}
                    />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default NotificationScreen;
