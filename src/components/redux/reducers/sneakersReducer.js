import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSneakers = createAsyncThunk("sneakers/fetchByIdStatus", async (params) => {

  const {
    sortType,
  } = params;

    const res = await axios.get(
      `https://659bd21ed565feee2dabcad0.mockapi.io/items?sortBy=${sortType.replace('-','')}&order=${sortType.includes('-') ? 'asc' : 'desc'}`
    );
    return res.data;
  });



const sneakersSlice = createSlice({
  name: "sneakers",
  initialState: {
    items: [],

  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase (fetchSneakers.fulfilled, (state,action) => {
    state.items = action.payload;
  }),
});

export const { setItems } = sneakersSlice.actions;
export default sneakersSlice.reducer;
