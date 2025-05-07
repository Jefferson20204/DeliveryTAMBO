import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del usuario
export const initialState = {
  userInfo: {}, // Aquí se almacenará la información del usuario autenticado
};

// Creación del slice para manejar datos del usuario
export const userSlice = createSlice({
  name: "userSlice", // Nombre del slice
  initialState, // Estado inicial definido arriba
  reducers: {
    // Carga o actualiza la información del usuario en el estado
    loadUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: action?.payload, // payload es el objeto con los datos del usuario
      };
    },
  },
});

// Exporta la acción para poder llamarla desde componentes o thunks
export const { loadUserInfo } = userSlice?.actions;

// Selector: obtiene la información del usuario desde el store
export const selectUserInfo = (state) => state?.userState?.userInfo ?? {};

// Selector: determina si el usuario tiene rol ADMIN
export const selectIsUserAdmin = (state) =>
  state?.userState?.userInfo?.authorityList?.find(
    (authority) => authority?.roleCode === "ADMIN"
  )?.authority === "ADMIN";

// Exporta el reducer para combinarlo en el store
export default userSlice?.reducer;
