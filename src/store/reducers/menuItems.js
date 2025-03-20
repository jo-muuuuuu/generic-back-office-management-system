import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState: {
    isCollapse: false,
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },
  },
});

export const { collapseMenu } = menuItemsSlice.actions;
export default menuItemsSlice.reducer;
