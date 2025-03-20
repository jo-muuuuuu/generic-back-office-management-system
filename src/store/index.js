import { configureStore } from "@reduxjs/toolkit";
import menuItemsReducer from "./reducers/menuItems";

export default configureStore({
  reducer: { menuItems: menuItemsReducer },
});
