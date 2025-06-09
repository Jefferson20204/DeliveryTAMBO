import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  loadingMessage: "",
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { loading, message } = action.payload;
      state.loading = loading;
      state.loadingMessage = message || "";
    },
  },
});

export const { setLoading } = commonSlice?.actions;
export default commonSlice?.reducer;
