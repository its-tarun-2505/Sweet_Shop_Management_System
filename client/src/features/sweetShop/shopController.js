import api from "../../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET /api/sweets  -> { sweets }
export const getAllSweets = createAsyncThunk(
  "sweetshop/getAllSweet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/sweets");
      return res.data; // { data: { sweets }, message, ... }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data!"
      );
    }
  }
);

// GET /api/sweets/search -> { sweets }
export const searchSweets = createAsyncThunk(
  "sweetshop/searchSweets",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== "")
      ).toString();
      const res = await api.get(`/sweets/search?${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Search failed!"
      );
    }
  }
);

// POST /api/sweets  (Admin)
export const addSweet = createAsyncThunk(
  "sweetshop/addSweet",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/sweets", payload);
      return res.data; // { data: sweet }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Create failed!"
      );
    }
  }
);

// PUT /api/sweets/:id (Admin)
export const updateSweetById = createAsyncThunk(
  "sweetshop/updateSweet",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/sweets/${id}`, data);
      return res.data; // { data: { sweet } }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed!"
      );
    }
  }
);

// DELETE /api/sweets/:id (Admin)
export const deleteSweetById = createAsyncThunk(
  "sweetshop/deleteSweet",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/sweets/${id}`);
      return { id, ...res.data }; // keep id for reducer
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Delete failed!"
      );
    }
  }
);

// POST /api/sweets/:id/restock (Admin)
export const restockSweetById = createAsyncThunk(
  "sweetshop/restockSweet",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/sweets/${id}/restock`, { quantity });
      return res.data; // { data: sweet } (from controller)
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Restock failed!"
      );
    }
  }
);

// POST /api/sweets/:id/purchase (Public)
export const purchaseSweetById = createAsyncThunk(
  "sweetshop/purchaseSweet",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/sweets/${id}/purchase`, { quantity });
      return res.data; // { data: sweet }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Purchase failed!"
      );
    }
  }
);
