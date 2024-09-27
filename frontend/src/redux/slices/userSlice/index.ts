import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState, userDataType } from "./types";

const initialState: UserState = {
  userData: {
    email: "",
    name: "",
    pic: "",
    token: "",
    _id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userDataType>) => {
      state.userData = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, resetState } = userSlice.actions;

export default userSlice.reducer;
