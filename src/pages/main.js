import React from "react";
import * as Icon from "@ant-design/icons";
import { Button, Layout, Menu, Avatar, Dropdown, theme } from "antd";

import menuConfig from "../config/index";
import NavigationTag from "../components/Tag";

import { useSelector, useDispatch } from "react-redux";
import { collapseMenu, setTabsList } from "../store/reducers/menuItems";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// Create Icon Elements
const createIconElement = (name) => {
  return React.createElement(Icon[name]);
};

// Menu Items pre-processing
const items = menuConfig.map((menuItem) => {
  // No sub-menu
  const child = {
    key: menuItem.path,
    label: menuItem.label,
    icon: createIconElement(menuItem.icon),
  };

  if (menuItem.children) {
    child.children = menuItem.children.map((childrenItem) => {
      return {
        key: childrenItem.path,
        label: childrenItem.label,
      };
    });
  }

  return child;
});

const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const collapsed = useSelector((state) => state.menuItems.isCollapse);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setCollapsed = () => {
    dispatch(collapseMenu());
  };

  const setTabs = (value) => {
    dispatch(setTabsList(value));
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logOut = () => {
    console.log("log out");
  };

  const dropdownItems = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logOut()} target="_blank" rel="noopener noreferrer">
          Log Out
        </a>
      ),
    },
  ];

  const selectMenu = (event) => {
    let data;
    menuConfig.forEach((item) => {
      if (item.path === event.keyPath[event.keyPath.length - 1]) {
        data = item;
        if (event.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === event.key;
          });
        }
      }
    });

    // console.log("tag data", data);
    setTabs({
      path: data.path,
      name: data.name,
      label: data.label,
    });

    navigate(event.key);
  };

  return (
    <Layout className="main-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 className="app-name">
          {collapsed ? "Back Office" : "Generic Back Office Management System"}
        </h3>
        {/* <div className="demo-logo-vertical" /> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ height: "100%" }}
          onClick={selectMenu}
        />
      </Sider>

      <Layout>
        <Header
          className="header-container"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            onClick={() => {
              setCollapsed();
            }}
            icon={collapsed ? <Icon.MenuUnfoldOutlined /> : <Icon.MenuFoldOutlined />}
            // onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Dropdown menu={{ items: dropdownItems }}>
            <Avatar
              src={<img src={require("../assets/kira.jpeg")} />}
              style={{ marginRight: "32px" }}
            />
          </Dropdown>
        </Header>

        <NavigationTag />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
