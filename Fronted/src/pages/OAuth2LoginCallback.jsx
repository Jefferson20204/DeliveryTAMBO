import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/jwt-helper";

/**
 * Componente de callback para el login con OAuth2.
 * Este componente se renderiza cuando el proveedor OAuth redirige de vuelta a tu app
 * con un token JWT en la URL (por ejemplo: /oauth2/callback?token=...).
 */
const OAuth2LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtiene el token de la URL (query param: ?token=...)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Si hay token, lo guarda en localStorage
      saveToken(token);

      // Redirige al home
      navigate("/");
    } else {
      // Si no hay token, redirige al login
      navigate("/v1/login");
    }
  }, [navigate]);

  // No se muestra nada en este componente, solo se usa para procesar el token
  return <></>;
};

export default OAuth2LoginCallback;
