import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState: {
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "HOMEPAGE",
      },
    ],
    currentMenu: {},
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },

    setTabsList: (state, { payload: value }) => {
      if (value.name !== "home") {
        state.currentMenu = value;
        const tagExists = state.tabsList.findIndex((item) => item.name === value.name);

        if (tagExists === -1) {
          state.tabsList.push(value);
        }
      } else if (value.name === "home" && state.tabsList.length === 1) {
        state.currentMenu = {};
      }
    },

    setCurrentMenu: (state, { payload: value }) => {
      if (value.name === "home") {
        state.currentMenu = {};
      } else {
        state.currentMenu = value;
      }
    },

    closeTab: (state, { payload: value }) => {
      const i = state.tabsList.findIndex((item) => item.name === value.name);
      state.tabsList.splice(i, 1);
    },
  },
});

export const { collapseMenu, setTabsList, setCurrentMenu, closeTab } =
  menuItemsSlice.actions;
export default menuItemsSlice.reducer;
