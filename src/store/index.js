import { configureStore } from "@reduxjs/toolkit";
// import menuItemsReducer from "./reducers/menuItems";

import { persistStore } from "redux-persist";
import persistedMenuItemsReducer from "./reducers/menuItems";

// export default configureStore({
//   reducer: { menuItems: menuItemsReducer },
// });

export const store = configureStore({
  reducer: {
    menuItems: persistedMenuItemsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
