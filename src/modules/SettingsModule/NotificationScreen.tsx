import { useState } from "react";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./notificationscreen.module.css";
import Switch from "../../packages/Switch/Switch";

import SettingScreenHeader from "./SettingScreenHeader";

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

  const handleChange = (id: number, val: string) => {
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
      <SettingScreenHeader
        title={"Notification Settings"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch
      />

      <Flex className={styles.alertContainer}>
        <Text type="button-4" color="shade-2">
          Alerts
        </Text>
        <Text style={{ marginTop: 4 }} type="bodyMedium" color="shade-2">
          Select the options you want to get alerted via email and notification.
        </Text>
      </Flex>

      {cardDetails.map((list) => {
        return (
          <Flex row between className={styles.listContainer}>
            <Flex column>
              <Text type="button-3">{list.heading}</Text>
              <Text type="bodyMedium" color="shade-2" style={{ marginTop: 8 }}>
                {list.subHead}
              </Text>
            </Flex>

            <Flex between end>
              <Switch
                left
                label="Notification"
                labelColor="gray"
                checked={list.isNotifyActive}
                onClick={() => handleChange(list.id, "notify")}
              />

              <Switch
                left
                label="Email"
                labelColor="gray"
                checked={list.isNotifyActive}
                onClick={() => handleChange(list.id, "notify")}
              />
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default NotificationScreen;
