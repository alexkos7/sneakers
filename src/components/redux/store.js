import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import sneakersReducer from "./reducers/sneakersReducer";
import filter from "./reducers/filterReducer";
import favoriteReducer from "./reducers/favoriteReducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sneakers: sneakersReducer,
    filter,
    favorites: favoriteReducer
  },
});
