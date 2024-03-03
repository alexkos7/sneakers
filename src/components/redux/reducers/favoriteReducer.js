import { createSlice} from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteProducts: localStorage.getItem("favoriteProducts")
    ? JSON.parse(localStorage.getItem("favoriteProducts"))
    : [],
  },
  reducers: {
    setFavoriteProducts: (state, action) => {
      const existingItem = state.favoriteProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItem !== -1) {
        state.favoriteProducts.splice(existingItem, 1);
      } else {
        state.favoriteProducts.push(action.payload);
      }
      localStorage.setItem("favoriteProducts", JSON.stringify(state.favoriteProducts));
    },
    
  },
});

export const { setFavoriteProducts } = favoriteSlice.actions;
export default favoriteSlice.reducer;
