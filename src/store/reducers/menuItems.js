import { createSlice } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState: {
    isCollapse: false,
    identity: "",
    menuList: [],
    tabsList: [
      {
        path: "/home",
        name: "home",
        label: "HOMEPAGE",
      },
    ],
    currentTab: { path: "/home", name: "home", label: "HOMEPAGE" },
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },

    setMenuList: (state, { payload: value }) => {
      state.menuList = value;
    },

    setIdentity: (state, { payload: value }) => {
      state.identity = value;
    },

    setTabsList: (state, { payload: value }) => {
      state.currentTab = value;

      if (value.name !== "home") {
        const tagExists = state.tabsList.findIndex((item) => item.name === value.name);

        if (tagExists === -1) {
          state.tabsList.push(value);
        }
      }
    },

    setcurrentTab: (state, { payload: value }) => {
      state.currentTab = value;
    },

    closeTab: (state, { payload: value }) => {
      const i = state.tabsList.findIndex((item) => item.name === value.name);
      state.tabsList.splice(i, 1);
    },

    reset: (state) => {
      state.isCollapse = false;
      state.identity = "";
      state.menuList = [];
      state.tabsList = [
        {
          path: "/home",
          name: "home",
          label: "HOMEPAGE",
        },
      ];
      state.currentTab = { path: "/home", name: "home", label: "HOMEPAGE" };
    },
  },
});

const persistConfig = {
  key: "menuItems",
  storage,
};

const persistedMenuItemsReducer = persistReducer(persistConfig, menuItemsSlice.reducer);

export const {
  collapseMenu,
  setIdentity,
  setMenuList,
  setTabsList,
  setcurrentTab,
  closeTab,
  reset,
} = menuItemsSlice.actions;

// export default menuItemsSlice.reducer;
export default persistedMenuItemsReducer;
