import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del slice común, usado típicamente para manejar estados globales como loaders
export const initialState = {
  loading: false, // Indica si hay una carga en curso
  loadingMessage: "", // Mensaje opcional que se puede mostrar durante la carga
};

// Creación del slice usando Redux Toolkit
export const commonSlice = createSlice({
  name: "commonSlice", // Nombre del slice
  initialState, // Estado inicial definido arriba
  reducers: {
    // Reducer para activar/desactivar el estado de carga
    setLoading: (state, action) => {
      const { loading, message } = action.payload;
      state.loading = loading; // Actualiza si está cargando
      state.loadingMessage = message || ""; // Establece mensaje de carga (o vacío)
    },
  },
});

// Exporta la acción para usarla en componentes o thunks
export const { setLoading } = commonSlice?.actions;

// Exporta el reducer para combinarlo en el store
export default commonSlice?.reducer;
