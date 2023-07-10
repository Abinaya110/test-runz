import React, { useState } from "react";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settings.module.css";
import SvgNotify from "../../icons/SvgNotify";
import SvgProfile from "../../icons/SvgProfile";
import SvgUser from "../../icons/SvgUser";
import SvgRole from "../../icons/SvgRole";

const NotificationScreen = () => {
  return (
    <Flex>
      <Flex className={styles.rightHeadFlex}>
        <Text size={20} bold="semiBold" className={styles.rightHead}>
          NotificationScreen
        </Text>
      </Flex>
    </Flex>
  );
};

const ProfileScreen = () => {
  return (
    <Flex>
      <Flex className={styles.rightHeadFlex}>
        <Text size={20} bold="semiBold" className={styles.rightHead}>
          ProfileScreen
        </Text>
      </Flex>
    </Flex>
  );
};

const UserScreen = () => {
  return (
    <Flex>
      <Flex className={styles.rightHeadFlex}>
        <Text size={20} bold="semiBold" className={styles.rightHead}>
          UserScreen
        </Text>
      </Flex>
    </Flex>
  );
};

const RoleScreen = () => {
  return (
    <Flex>
      <Flex className={styles.rightHeadFlex}>
        <Text size={20} bold="semiBold" className={styles.rightHead}>
          RoleScreen
        </Text>
      </Flex>
    </Flex>
  );
};

const SettingsScreen = () => {
  const settingsModule = [
    {
      id: 1,
      isSelected: true,
      title: "Notification Settings"
    },
    {
      id: 2,
      isSelected: false,
      title: "Profile Settings"
    },
    {
      id: 3,
      isSelected: false,
      title: "User Management"
    },
    {
      id: 4,
      isSelected: false,
      title: "Role Management"
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

        {activeModule === 1 && <NotificationScreen />}
        {activeModule === 2 && <ProfileScreen />}
        {activeModule === 3 && <UserScreen />}
        {activeModule === 4 && <RoleScreen />}
      </Flex>
    </Flex>
  );
};

export default SettingsScreen;
