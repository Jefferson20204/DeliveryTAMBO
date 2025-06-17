import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./features/common";
import userReducer from "./features/user";
import cartReducer from "./features/cart";

// Combina múltiples reducers en uno solo (estructura del store)
const rootReducer = combineReducers({
  commonState: commonReducer, // Accedido como state.commonState
  userState: userReducer, // Accedido como state.userState
  cartState: cartReducer, // Accedido como state.cartState
});

// Configura el store de Redux con el reducer combinado
const store = configureStore({
  reducer: rootReducer,
});

export default store;
