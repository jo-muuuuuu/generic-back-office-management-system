import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState: {
    isCollapse: false,
    menuList: [],
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "HOMEPAGE",
      },
    ],
    currentTab: {},
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },

    setMenuList: (state, { payload: value }) => {
      state.menuList = value;
    },

    setTabsList: (state, { payload: value }) => {
      if (value.name !== "home") {
        state.currentTab = value;
        const tagExists = state.tabsList.findIndex((item) => item.name === value.name);

        if (tagExists === -1) {
          state.tabsList.push(value);
        }
      } else if (value.name === "home" && state.tabsList.length === 1) {
        state.currentTab = {};
      }
    },

    setcurrentTab: (state, { payload: value }) => {
      if (value.name === "home") {
        state.currentTab = {};
      } else {
        state.currentTab = value;
      }
    },

    closeTab: (state, { payload: value }) => {
      const i = state.tabsList.findIndex((item) => item.name === value.name);
      state.tabsList.splice(i, 1);
    },
  },
});

export const { collapseMenu, setMenuList, setTabsList, setcurrentTab, closeTab } =
  menuItemsSlice.actions;
export default menuItemsSlice.reducer;
