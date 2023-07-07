import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout as LayoutAntd, Menu } from "antd";
import styles from "./layout.module.css";
import SvgMenu from "../../icons/SvgMenu";
import Button from "../../packages/Button/Button";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const { Header, Sider, Content } = LayoutAntd;

type Props = {
  children: any;
};
const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutAntd>
      <Sider
        className={cx("sideBarContainer", { sideWidth: !collapsed })}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "My page",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Runs",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Procedures",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "Projects",
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "Assets",
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: "Settings",
            },
            {
              key: "7",
              icon: <UploadOutlined />,
              label: "Billing and subscriptions",
            },
          ]}
        />
      </Sider>
      <LayoutAntd className={styles.backgroundColor}>
        <Header className={styles.headerContainer}>
          <Button types="link" onClick={() => setCollapsed(!collapsed)}>
            <SvgMenu />
          </Button>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
