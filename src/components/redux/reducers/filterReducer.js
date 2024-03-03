import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: {
    name: "цене (возрастанию)",
    sortProperty: "price",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setSortId(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setSortId } = filterSlice.actions;
export default filterSlice.reducer;
