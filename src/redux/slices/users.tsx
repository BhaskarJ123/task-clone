import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState: { users: any[] } = {
  users: [],
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = [...action.payload];
    },
  },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.reducer;
