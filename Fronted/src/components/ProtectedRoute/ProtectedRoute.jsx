import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils/jwt-helper";

/**
 * Componente de ruta protegida
 * Verifica si el token JWT es válido antes de permitir el acceso a los hijos
 * Si el token no es válido, redirige al login
 *
 * @param {Object} props - Props con los componentes hijos (children)
 * @returns {JSX.Element} - Los hijos si el usuario está autenticado, redirección en caso contrario
 */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el token es válido (existe y no expiró)
    if (!isTokenValid()) {
      // Si no es válido, redirige al login
      navigate("/v1/login");
    }
  }, [navigate]);

  // Si el token es válido, muestra el contenido protegido
  return <div>{children}</div>;
};

export default ProtectedRoute;
