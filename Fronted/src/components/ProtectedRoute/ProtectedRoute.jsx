import React, { useEffect, useState } from "react";
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
  const [checkingAuth, setCheckingAuth] = useState(true); // Controla la evaluación

  useEffect(() => {
    const isValid = isTokenValid();
    if (!isValid) {
      navigate("/v1/login");
    }
    setCheckingAuth(false); // Ya verificamos
  }, [navigate]);

  if (checkingAuth) {
    // Aquí puedes mostrar un spinner si quieres
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
