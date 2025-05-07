import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./features/common"; // Reducer para estado global (como loading)
import userReducer from "./features/user"; // Reducer para manejar datos del usuario

// Combina múltiples reducers en uno solo (estructura del store)
const rootReducer = combineReducers({
  commonState: commonReducer, // Accedido como state.commonState
  userState: userReducer, // Accedido como state.userState
});

// Configura el store de Redux con el reducer combinado
const store = configureStore({
  reducer: rootReducer,
});

// Exporta el store para ser usado en tu aplicación React
export default store;
