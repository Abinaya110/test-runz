import { useState } from "react";
import { Layout as LayoutAntd, Menu } from "antd";
import styles from "./layout.module.css";
import SvgMenu from "../../icons/SvgMenu";
import Button from "../../packages/Button/Button";
import classNames from "classnames/bind";
import SvgMypage from "../../icons/SvgMypage";
import SvgRunz from "../../icons/SvgRunz";
import SvgProcedures from "../../icons/SvgProcedures";
import SvgProjects from "../../icons/SvgProjects";
import SvgAssets from "../../icons/SvgAssets";
import SvgSettings from "../../icons/SvgSettings";
import SvgDoller from "../../icons/SvgDoller";
import { routes } from "../../routes/routesPath";
import { gray3, textShade1 } from "../../theme/colors";
import { useNavigate } from "react-router-dom";
import SvgTestRunz from "../../icons/SvgTestRunz";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SvgQuestionRound from "../../icons/SvgQuestionRound";
import SvgBell from "../../icons/SvgBell";
import Text from "../../packages/Text/Text";
import SvgUserProfile from "../../icons/SvgUserProfile";
import SvgSearch from "../../icons/SvgSearch";
import SvgSeePlans from "../../icons/SvgSeePlans";

const cx = classNames.bind(styles);

const { Header, Sider, Content } = LayoutAntd;

type Props = {
  children: any;
};

const svgFill = (value: boolean) => {
  return value ? textShade1 : gray3;
};
const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const myPage = window.location.pathname === routes.MY_PAGE;
  const runz = window.location.pathname === routes.RUNZ;
  const procedures = window.location.pathname === routes.PROCEDURES;
  const projects = window.location.pathname === routes.PROJECTS;
  const assets = window.location.pathname === routes.ASSETS;
  const settings = window.location.pathname === routes.SETTINGS;
  const billing = window.location.pathname === routes.BILLING;

  const hideLayout =
    window.location.pathname === routes.LOGIN ||
    window.location.pathname === routes.FORGOT_PASSWORD ||
    window.location.pathname === routes.SIGNUP;

  const menuNavigate = (value: string) => {
    switch (value) {
      case "1":
        return navigate(routes.MY_PAGE);
      case "2":
        return navigate(routes.RUNZ);
      case "3":
        return navigate(routes.PROCEDURES);
      case "4":
        return navigate(routes.PROJECTS);
      case "5":
        return navigate(routes.ASSETS);
      case "6":
        return navigate(routes.SETTINGS);
      case "7":
        return navigate(routes.BILLING);
    }
  };

  if (hideLayout) {
    return children;
  }
  return (
    <LayoutAntd>
      <Sider
        className={cx("sideBarContainer", { sideWidth: !collapsed })}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          onClick={(a) => {
            menuNavigate(a.key);
          }}
          mode="inline"
          items={[
            {
              key: "1",
              icon: <SvgMypage fill={svgFill(myPage)} />,
              label: collapsed ? "" : "My page",
            },
            {
              key: "2",
              icon: <SvgRunz fill={svgFill(runz)} />,
              label: collapsed ? "" : "Runs",
            },
            {
              key: "3",
              icon: <SvgProcedures fill={svgFill(procedures)} />,
              label: collapsed ? "" : "Procedures",
            },
            {
              key: "4",
              icon: <SvgProjects fill={svgFill(projects)} />,
              label: collapsed ? "" : "Projects",
            },
            {
              key: "5",
              icon: <SvgAssets fill={svgFill(assets)} />,
              label: collapsed ? "" : "Assets",
            },
            {
              key: "6",
              icon: <SvgSettings fill={svgFill(settings)} />,
              label: collapsed ? "" : "Settings",
            },
            {
              key: "7",
              icon: <SvgDoller fill={svgFill(billing)} />,
              label: collapsed ? "" : "Billing and subscriptions",
            },
          ]}
        />
        {!collapsed && (
          <Flex center className={styles.seePlansDiv}>
            <SvgSeePlans />
          </Flex>
        )}
      </Sider>
      <LayoutAntd className={styles.backgroundColor}>
        <Header className={styles.headerContainer}>
          <Flex row center between>
            <Flex row center>
              <Button
                className={styles.svgMenu}
                types="link"
                onClick={() => setCollapsed(!collapsed)}
              >
                <SvgMenu />
              </Button>
              <SvgTestRunz />
            </Flex>
            <Flex row center>
              <InputText
                placeholder="Search"
                actionRight={() => <SvgSearch />}
              />
              <Button types="link" className={styles.svgQuestion}>
                <SvgQuestionRound />
              </Button>
              <Button types="link">
                <SvgBell />
              </Button>

              <Text className={styles.svgQuestion}>Arul</Text>
              <Button className={styles.svgProfile} types="link">
                <SvgUserProfile />
              </Button>
            </Flex>
          </Flex>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
