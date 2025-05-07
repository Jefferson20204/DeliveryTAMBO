import React from "react";
import { RouterProvider } from "react-router-dom"; // Proveedor de rutas para navegación en la app
import { router } from "./routes"; // Configuración de rutas definida externamente
import { Provider } from "react-redux"; // Proveedor de Redux para compartir el estado global
import store from "./store/store"; // Store de Redux
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper"; // Componente de alto nivel de la app

/**
 * Componente principal de la aplicación.
 * Configura Redux y React Router para toda la aplicación.
 */
function App() {
  return (
    <>
      {/* Proveedor de Redux: hace que el store esté disponible en toda la app */}
      <Provider store={store}>
        {/* Proveedor de rutas: habilita la navegación en la app */}
        <RouterProvider router={router}>
          {/* Componente raíz que puede contener lógica global, layout o contextos adicionales */}
          <ShopApplicationWrapper />
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
