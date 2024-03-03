import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    totalPrice: localStorage.getItem("totalPrice")
      ? JSON.parse(localStorage.getItem("totalPrice"))
      : 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      const itemExists = state.cartItems.some(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (!itemExists) {
        state.cartItems.push(action.payload);
      }
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeAllItems: (state) => {
      state.cartItems = [];
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

export const selectCart = (state) => state.cart;

export const { setCartItems, deleteCartItem, removeAllItems } =
  cartSlice.actions;
export default cartSlice.reducer;
