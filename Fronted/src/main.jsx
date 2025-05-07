import { StrictMode } from "react"; // Ayuda a identificar problemas potenciales en la app durante el desarrollo
import { createRoot } from "react-dom/client"; // Nueva API de React 18 para crear la raíz del árbol de componentes
import App from "./App.jsx"; // Componente principal de la aplicación

// Crea el punto de entrada de la aplicación React y monta el componente App dentro del elemento con id "root"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode activa verificaciones adicionales y advertencias en desarrollo */}
    <App />
  </StrictMode>
);
