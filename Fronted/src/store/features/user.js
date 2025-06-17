import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userInfo");
const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

export const initialState = {
  userInfo: parsedUserInfo,
  orders: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      const user = action?.payload;
      localStorage.setItem("userInfo", JSON.stringify(user));
      return {
        ...state,
        userInfo: user,
      };
    },
    clearUserInfo: (state) => {
      localStorage.removeItem("userInfo");
      return {
        ...state,
        userInfo: {},
      };
    },
    loadOrders: (state, action) => {
      return {
        ...state,
        orders: action?.payload,
      };
    },
  },
});

export const { loadUserInfo, clearUserInfo, loadOrders } = userSlice.actions;

export const selectUserInfo = (state) => state?.userState?.userInfo ?? {};
export const selectAllOrders = (state) => state?.userState?.orders ?? [];
export const selectIsUserAdmin = (state) =>
  Array.isArray(state?.userState?.userInfo?.authorityList) &&
  state.userState.userInfo.authorityList.includes("ADMIN");
export default userSlice.reducer;
