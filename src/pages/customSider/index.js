import React from "react";
import { Layout, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setTabsList } from "../../store/reducers/menuItems";
import menuConfig from "../../config/index";

const { Sider } = Layout;

// Create Icon Elements
const createIconElement = (name) => {
  return React.createElement(Icon[name]);
};

const CustomSider = () => {
  const collapsed = useSelector((state) => state.menuItems.isCollapse);
  const menuList = useSelector((state) => state.menuItems.menuList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const items = menuList.map((menuItem) => {
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

  const setTabs = (value) => {
    dispatch(setTabsList(value));
  };

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
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">
        {collapsed ? "Backend System" : "Generic Backend Management System"}
      </h3>

      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={["/home"]}
        selectedKeys={[location.pathname]}
        items={items}
        style={{ height: "100%" }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CustomSider;
