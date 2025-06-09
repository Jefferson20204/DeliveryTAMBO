import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken } from "../utils/jwt-helper";
import { setLoading } from "../store/features/common";
import { fetchUserDetails } from "../api/userInfo";
import { loadUserInfo } from "../store/features/user";

/**
 * Componente de callback para el login con OAuth2.
 * Maneja el token de autenticación y obtiene los datos del usuario.
 */
const OAuth2LoginCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const processOAuthCallback = async () => {
      // Obtiene el token de la URL
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/v1/login");
        return;
      }

      try {
        dispatch(
          setLoading({ loading: true, message: "Procesando autenticación..." })
        );

        // 1. Guardar el token
        saveToken(token);

        // 2. Obtener detalles del usuario
        const userDetails = await fetchUserDetails();

        // 3. Guardar en Redux (y localStorage si está configurado)
        dispatch(loadUserInfo(userDetails));

        // 4. Redirigir al home
        navigate("/");
      } catch (error) {
        console.error("Error en OAuth callback:", error);
        navigate("/v1/login?error=oauth_failed");
      } finally {
        dispatch(setLoading({ loading: false, message: "" }));
      }
    };

    processOAuthCallback();
  }, [navigate, dispatch]);

  // Muestra un estado de carga mientras procesa
  return (
    <div className="oauth-callback-loading">
      <p>Procesando autenticación...</p>
    </div>
  );
};

export default OAuth2LoginCallback;
