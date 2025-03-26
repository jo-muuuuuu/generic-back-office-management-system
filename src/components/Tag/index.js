import React from "react";
import { Tag, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeTab, setCurrentMenu } from "../../store/reducers/menuItems";

import "./tag.css";

const NavigationTag = () => {
  const tabsList = useSelector((state) => state.menuItems.tabsList);
  const currentMenu = useSelector((state) => state.menuItems.currentMenu);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = (tag, index) => {
    // console.log(tabsList);

    let len = tabsList.length - 1;

    dispatch(closeTab(tag));

    if (tag.path !== location.pathname) {
      return;
    }

    if (index === len) {
      const currentData = tabsList[index - 1];
      dispatch(setCurrentMenu(currentData));

      navigate(currentData.path);
    } else {
      if (tabsList.length > 1) {
        const nextData = tabsList[index + 1];
        dispatch(setCurrentMenu(nextData));

        navigate(nextData.path);
      }
    }
  };

  const handleClick = (tag) => {
    dispatch(setCurrentMenu(tag));
    navigate(tag.path);
  };

  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag
        color="#55acee"
        closeIcon
        onClose={() => handleClose(item, index)}
        key={item.name}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag
        onClick={() => {
          handleClick(item);
        }}
        key={item.name}
      >
        {item.label}
      </Tag>
    );
  };

  return (
    <Space size={[0, 8]} wrap className="tag-container">
      {currentMenu &&
        tabsList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index)
        )}
    </Space>
  );
};

export default NavigationTag;
