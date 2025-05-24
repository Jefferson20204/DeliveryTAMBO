import { Outlet } from "react-router-dom"; // Componente para renderizar las rutas anidadas
import { useSelector } from "react-redux"; // Hook para acceder al estado global de Redux
import Navigation from "../components/Navbar/Navbar"; // Componente de navegación superior
import Footer from "../components/Footer/Footer"; // Componente de pie de página (footer)
// import Spinner from "../components/Spinner/Spinner"; // Componente Spinner para mostrar carga
import IconLoader from "../components/IconLoader/IconLoader";

/**
 * Componente envolvente de la aplicación de la tienda.
 * Este componente tiene la lógica básica de la estructura de la página, como la navegación, el contenido y el pie de página.
 */
const ShopApplicationWrapper = () => {
  // Obtiene el estado de carga desde Redux (si está cargando algún recurso)
  const isLoading = useSelector((state) => state.commonState.loading);

  // Obtiene el mensaje de carga desde Redux, si está definido
  const loadingMessage = useSelector(
    (state) => state.commonState.loadingMessage
  );

  return (
    <div>
      {/* Barra de navegación superior */}
      <Navigation />

      {/* Rutas anidadas se renderizan aquí (dependiendo de la ruta actual) */}
      <Outlet />

      {/* Pie de página */}
      <Footer />

      {/* Si hay un proceso de carga, muestra el Spinner con el mensaje adecuado */}
      {isLoading && <IconLoader text={loadingMessage || "Cargando..."} />}
    </div>
  );
};

export default ShopApplicationWrapper;
