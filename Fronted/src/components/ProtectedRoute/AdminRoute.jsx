import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenValid } from "../../utils/jwt-helper";
import { selectIsUserAdmin } from "../../store/features/user";

/**
 * Componente de ruta protegida para administradores
 * Verifica si el token JWT es válido y si el usuario tiene el rol de administrador
 * Si el token no es válido, redirige a la página de inicio
 * Si el usuario no es valido, redirige a la página de inicio
 */
const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsUserAdmin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(isAdmin);

    if (!isTokenValid()) {
      navigate("/");
      return;
    }

    if (!isAdmin) {
      navigate("/");
      return;
    }

    setLoading(false);
  }, [navigate, isAdmin]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
};

export default AdminRoute;
