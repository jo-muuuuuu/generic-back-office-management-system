import React from "react";
import * as Icon from "@ant-design/icons";
import { Button, Layout, Avatar, Dropdown, theme } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { collapseMenu } from "../store/reducers/menuItems";
import { useNavigate, Outlet } from "react-router-dom";

import NavigationTag from "../components/Tag";

import CustomSider from "./customSider";
import RouterAuth from "../router/routerAuth";

const { Header, Content } = Layout;

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collapsed = useSelector((state) => state.menuItems.isCollapse);

  const setCollapsed = () => {
    dispatch(collapseMenu());
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logOut = () => {
    localStorage.removeItem("token");

    navigate("/login");
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

  return (
    <RouterAuth>
      <Layout className="main-container">
        <CustomSider />

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
    </RouterAuth>
  );
};
export default Main;
