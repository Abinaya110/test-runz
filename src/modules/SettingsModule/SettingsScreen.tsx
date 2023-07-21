import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settingsscreen.module.css";
import SvgNotify from "../../icons/SvgNotify";
import SvgProfile from "../../icons/SvgProfile";
import SvgUser from "../../icons/SvgUser";
import SvgRole from "../../icons/SvgRole";
import NotificationScreen from "./NotificationScreen";
import ProfileScreen from "./ProfileScreen";
import UserScreen from "./UserScreen";
import RoleScreen from "./RoleScreen";
import { textShade1, textShade3 } from "../../theme/colors";
import Button from "../../packages/Button/Button";
import { HEADER_HEIGHT } from "../../utils/constants";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getSettingMiddleWare } from "./store/settingsMiddleware";

const cx = classNames.bind(styles);

const SettingsScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [activeModule, setActiveModule] = useState(1);

  useEffect(() => {
    dispatch(getSettingMiddleWare());
  }, []);
  const handleChangeSettings = (e: number) => {
    setActiveModule(e);
  };

  const settingsModuleList = [
    {
      id: 1,
      title: "Notification Settings",
      icon: <SvgNotify fill={activeModule === 1 ? textShade1 : textShade3} />,
    },
    {
      id: 2,
      title: "Profile Settings",
      icon: <SvgProfile fill={activeModule === 2 ? textShade1 : textShade3} />,
    },
    {
      id: 3,
      title: "User Management",
      icon: <SvgUser fill={activeModule === 3 ? textShade1 : textShade3} />,
    },
    {
      id: 4,
      title: "Role Management",
      icon: <SvgRole fill={activeModule === 4 ? textShade1 : textShade3} />,
    },
  ];

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      <Flex row flex={1}>
        <Flex width={300} className={styles.leftContainer}>
          <Text type="subTitle" color="shade-2" className={styles.settingText}>
            Settings
          </Text>

          {settingsModuleList.map((list: any) => {
            return (
              <Button
                types="link"
                onClick={() => handleChangeSettings(list.id)}
                className={cx("listText", {
                  activeModule: activeModule === list.id,
                })}
              >
                <Flex row center>
                  {list.icon}
                  <Text
                    color={activeModule === list.id ? "primary" : "shade-3"}
                    style={{ marginLeft: 8 }}
                    type="bodyBold"
                  >
                    {list.title}
                  </Text>
                </Flex>
              </Button>
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
