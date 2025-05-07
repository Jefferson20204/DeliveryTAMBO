import React from "react";
import Navigation from "../components/Navigation/Header/Navigation"; // Componente de navegación superior
import { Outlet } from "react-router-dom"; // Componente para renderizar las rutas hijas
import { useSelector } from "react-redux"; // Hook para acceder al estado global de Redux
import Spinner from "../components/common/Spinner/Spinner"; // Componente para mostrar un spinner de carga

/**
 * Componente envolvente para las rutas relacionadas con la autenticación.
 * Proporciona la barra de navegación y muestra las rutas hijas (login, registro, etc.)
 * También muestra un spinner de carga si hay una operación en curso.
 */
const AuthenticationWrapper = () => {
  // Obtiene el estado de carga desde Redux (indica si hay una operación en curso)
  const isLoading = useSelector((state) => state.commonState.loading);

  // Obtiene el mensaje de carga desde Redux, si se ha definido uno
  const loadingMessage = useSelector(
    (state) => state.commonState.loadingMessage
  );

  return (
    <div>
      {/* Barra de navegación superior */}
      <Navigation />

      {/* Renderiza las rutas hijas (como login, registro, etc.) */}
      <Outlet />

      {/* Si está en estado de carga, muestra el Spinner con el mensaje correspondiente */}
      {isLoading && <Spinner text={loadingMessage || "Cargando..."} />}
    </div>
  );
};

export default AuthenticationWrapper;
