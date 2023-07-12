import React, { useState } from "react";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settings.module.css";
import SvgNotify from "../../icons/SvgNotify";
import SvgProfile from "../../icons/SvgProfile";
import SvgUser from "../../icons/SvgUser";
import SvgRole from "../../icons/SvgRole";
import ScreenHeader from "./ScreenHeader";
import NotificationScreen from "./NotificationScreen";
import ProfileScreen from "./ProfileScreen";

const cx = classNames.bind(styles);

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
