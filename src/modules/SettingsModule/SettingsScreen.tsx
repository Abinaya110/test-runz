import React, { useState } from "react";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settings.module.css";
import SvgNotify from "../../icons/SvgNotify";
import SvgProfile from "../../icons/SvgProfile";
import SvgUser from "../../icons/SvgUser";
import SvgRole from "../../icons/SvgRole";
import InputText from "../../packages/InputText/InputText";
import Button from "../../packages/Button/Button";
import SvgSearch from "../../icons/SvgSearch";
import Switch from "react-switch";

const cx = classNames.bind(styles);

const ScreenHeader = (props: any) => {
  const { title, description, isSearch, isBtn } = props;

  const handleLogin = () => {};
  return (
    <Flex row between className={styles.contentSpace}>
      <Flex column>
        <Text size={24} bold="semiBold" className={styles.rightHead}>
          {title}
        </Text>

        <Text size={16} bold="light" className={styles.rightHead}>
          {description}
        </Text>
      </Flex>

      <Flex column className={styles.rightSearch}>
        {isSearch && (
          <InputText placeholder="Search" actionRight={() => <SvgSearch />} />
        )}

        {isBtn && (
          <Button
            style={{ marginLeft: 4 }}
            types="primary"
            onClick={handleLogin}
          >
            + Add New
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

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
                  <Flex column className={styles.rightSearch}>
                    <Text
                      size={12}
                      bold="semiBold"
                      className={styles.toggelLabel}
                    >
                      Notification
                    </Text>
                  </Flex>

                  <Flex column>
                    <Switch
                      uncheckedIcon={false}
                      onColor="#ffc60b"
                      checkedIcon={false}
                      onChange={() => handleChange(c.id, "notify")}
                      checked={c.isNotifyActive}
                      id="normal-switch"
                      className={styles.marginLeft10}
                    />
                  </Flex>
                </Flex>

                <Flex row between className={styles.marginTopToggel}>
                  <Flex column className={styles.rightSearch}>
                    <Text
                      size={12}
                      bold="semiBold"
                      className={styles.toggelLabel}
                    >
                      Email
                    </Text>
                  </Flex>

                  <Flex column>
                    <Switch
                      uncheckedIcon={false}
                      onColor="#ffc60b"
                      checkedIcon={false}
                      onChange={() => handleChange(c.id, "email")}
                      checked={c.isEmailActive}
                      id="normal-switch"
                      className={styles.marginLeft10}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

const ProfileScreen = () => {
  return (
    <Flex>
      <ScreenHeader
        title={"Profile Settings"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch={true}
        isBtn={false}
      />
    </Flex>
  );
};

const UserScreen = () => {
  return (
    <Flex>
      <ScreenHeader
        title={"User Management"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch={false}
        isBtn={true}
      />
    </Flex>
  );
};

const RoleScreen = () => {
  return (
    <Flex>
      <ScreenHeader
        title={"Role Management"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch={true}
        isBtn={false}
      />
    </Flex>
  );
};

const SettingsScreen = () => {
  const settingsModule = [
    {
      id: 1,
      isSelected: true,
      title: "Notification Settings",
    },
    {
      id: 2,
      isSelected: false,
      title: "Profile Settings",
    },
    {
      id: 3,
      isSelected: false,
      title: "User Management",
    },
    {
      id: 4,
      isSelected: false,
      title: "Role Management",
    },
  ];

  const [moduleArray, setModuleArray] = useState(settingsModule);
  const [activeModule, setActiveModule] = useState(1);

  const handleChangeSettings = (e: any) => {
    const updated = moduleArray.map((c) => {
      if (c.id === e) {
        c.isSelected = true;
        return c;
      } else {
        c.isSelected = false;
        return c;
      }
    });
    setActiveModule(e);
    setModuleArray(updated);
  };

  return (
    <Flex>
      <Flex row>
        <Flex column className={styles.leftOverall}>
          <Flex className={styles.rightHeadFlex}>
            <Text size={20} bold="semiBold" className={styles.rightHead}>
              settings
            </Text>
          </Flex>

          {moduleArray.map((c: any) => {
            return (
              <div
                role="presentation"
                onClick={() => handleChangeSettings(c.id)}
              >
                <Flex
                  className={
                    c.isSelected
                      ? styles.rightListFlexStyle
                      : styles.rightListFlexStyleInactive
                  }
                >
                  <Flex row>
                    <Flex column className={styles.iconCenter}>
                      {c.id === 1 && (
                        <SvgNotify fill={c.isSelected ? "#000" : "#9f9f9f"} />
                      )}
                      {c.id === 2 && (
                        <SvgProfile fill={c.isSelected ? "#000" : "#9f9f9f"} />
                      )}
                      {c.id === 3 && (
                        <SvgUser fill={c.isSelected ? "#000" : "#9f9f9f"} />
                      )}
                      {c.id === 4 && (
                        <SvgRole fill={c.isSelected ? "#000" : "#9f9f9f"} />
                      )}
                    </Flex>

                    <Flex column middle>
                      <Text
                        size={16}
                        bold="semiBold"
                        className={
                          c.isSelected
                            ? styles.rightListActive
                            : styles.rightListInactive
                        }
                      >
                        {c.title}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            );
          })}
        </Flex>

        <Flex className={styles.rightOverall}>
          {activeModule === 1 && <NotificationScreen />}
          {activeModule === 2 && <ProfileScreen />}
          {activeModule === 3 && <UserScreen />}
          {activeModule === 4 && <RoleScreen />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingsScreen;
