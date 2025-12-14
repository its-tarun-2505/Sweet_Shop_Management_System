import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSweets,
  searchSweets,
  addSweet,
  updateSweetById,
  deleteSweetById,
  restockSweetById,
  purchaseSweetById,
} from "./shopController";

const initialState = {
  sweets: [],
  isLoading: false,
  isError: false,
  message: "",
};

const shopSlice = createSlice({
  name: "sweetshop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const upsertSweet = (state, sweet) => {
      const idx = state.sweets.findIndex((s) => s._id === sweet._id);
      if (idx === -1) state.sweets.push(sweet);
      else state.sweets[idx] = sweet;
    };

    builder
      // list
      .addCase(getAllSweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllSweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sweets = action.payload.data.sweets;
      })
      .addCase(getAllSweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // search
      .addCase(searchSweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchSweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sweets = action.payload.data.sweets;
      })
      .addCase(searchSweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // add
      .addCase(addSweet.fulfilled, (state, action) => {
        upsertSweet(state, action.payload.data);
      })

      // update
      .addCase(updateSweetById.fulfilled, (state, action) => {
        upsertSweet(state, action.payload.data.sweet);
      })

      // restock
      .addCase(restockSweetById.fulfilled, (state, action) => {
        upsertSweet(state, action.payload.data);
      })

      // purchase
      .addCase(purchaseSweetById.fulfilled, (state, action) => {
        upsertSweet(state, action.payload.data);
      })

      // delete
      .addCase(deleteSweetById.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.sweets = state.sweets.filter((s) => s._id !== id);
      });
  },
});

export default shopSlice.reducer;
