import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    address: "",
    avatar: "",
    email: "",
    fullname: "",
    id: "",
    phone_number: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    doGetUserAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    doLogoutAction: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        address: "",
        avatar: "",
        email: "",
        fullname: "",
        id: "",
        phone_number: "",
        role: "",
      };
    },
  },
});

export default userSlice.reducer;
export const {doLoginAction, doGetUserAction, doLogoutAction} = userSlice.actions;
