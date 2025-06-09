import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import store from "./store/store";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";

function App() {
  return (
    <>
      {/* Proveedor de Redux: hace que el store esté disponible en toda la app */}
      <Provider store={store}>
        {/* Proveedor de rutas: habilita la navegación en la app */}
        <RouterProvider router={router}>
          <ShopApplicationWrapper />
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
