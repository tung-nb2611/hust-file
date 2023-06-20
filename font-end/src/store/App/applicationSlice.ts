import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "./types";
import { createTheme } from "theme";

const initialState: ApplicationState = {
  loadingPage: false,
  sapoTheme: createTheme({}),
};

const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {},
});

const { actions, reducer } = applicationSlice;

export const { } = actions;
export default reducer;
