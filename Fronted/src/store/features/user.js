import { createSlice } from "@reduxjs/toolkit";

// Intentamos recuperar el usuario desde localStorage
const storedUserInfo = localStorage.getItem("userInfo");
const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

// Estado inicial del usuario
export const initialState = {
  userInfo: parsedUserInfo, // Carga desde localStorage si existe
  orders: [],
};

// Creación del slice para manejar datos del usuario
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Carga o actualiza la información del usuario en el estado
    loadUserInfo: (state, action) => {
      const user = action?.payload;
      localStorage.setItem("userInfo", JSON.stringify(user));
      return {
        ...state,
        userInfo: user,
      };
    },
    // Limpia el usuario (por ejemplo, en logout)
    clearUserInfo: (state) => {
      localStorage.removeItem("userInfo");
      return {
        ...state,
        userInfo: {},
      };
    },
    saveAddress: (state, action) => {
      const addresses = [...state?.userInfo?.addressList] ?? [];
      addresses.push(action?.payload);
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          addressList: addresses,
        },
      };
    },
    removeAddress: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          addressList: state?.userInfo?.addressList?.filter(
            (address) => address?.id !== action?.payload
          ),
        },
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

export const {
  loadUserInfo,
  clearUserInfo,
  saveAddress,
  removeAddress,
  loadOrders,
} = userSlice.actions;

export const selectUserInfo = (state) => state?.userState?.userInfo ?? {};
export const selectAllOrders = (state) => state?.userState?.orders ?? [];

export const selectIsUserAdmin = (state) =>
  Array.isArray(state?.userState?.userInfo?.authorityList) &&
  state.userState.userInfo.authorityList.includes("ADMIN");

export default userSlice.reducer;
