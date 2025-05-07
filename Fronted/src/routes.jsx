import { createBrowserRouter } from "react-router-dom"; // Función para crear el enrutador usando el navegador
import AuthenticationWrapper from "./pages/AuthenticationWrapper"; // Componente envolvente para la sección de autenticación
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper"; // Componente envolvente para la aplicación de tienda
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback"; // Componente para manejar el callback de OAuth2
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Componente que protege rutas privadas
import Account from "./pages/Auth/Account/Account"; // Componente para la página de cuenta
import Profile from "./pages/Auth/Account/Profile"; // Componente para la página de perfil
import Settings from "./pages/Auth/Account/Settings"; // Componente para la página de configuración
import Home from "./pages/Home/Home"; // Componente para la página de inicio
import Login from "./pages/Auth/Login/Login"; // Componente para la página de inicio de sesión
import Register from "./pages/Auth/Register/Register"; // Componente para la página de registro
import ForgotPassword from "./pages/Auth/Login/ForgotPassword"; // Componente para la página de olvido de contraseña
import ResetPassword from "./pages/Auth/Login/ResetPassword"; // Componente para la página de restablecimiento de contraseña

/**
 * Definición del enrutador de la aplicación usando createBrowserRouter.
 * Se configuran las rutas públicas, protegidas y de autenticación.
 */
export const router = createBrowserRouter([
  // Ruta principal de la tienda
  {
    path: "/",
    element: <ShopApplicationWrapper />, // Componente envolvente para la tienda
    children: [
      {
        index: true, // Define esta ruta como la ruta raíz
        element: <Home />, // Página de inicio
      },
      {
        path: "/account-details/", // Ruta para la sección de detalles de cuenta
        element: (
          <ProtectedRoute>
            {" "}
            {/* Ruta protegida: solo accesible si el usuario está autenticado */}
            <Account /> {/* Componente de cuenta */}
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile", // Ruta para ver el perfil del usuario
            element: <Profile />, // Componente de perfil
          },
          {
            path: "settings", // Ruta para ver la configuración de la cuenta
            element: <Settings />, // Componente de configuración
          },
        ],
      },
      // Aquí puedes añadir más rutas protegidas o públicas
    ],
  },

  // Rutas relacionadas con la autenticación (login, registro, etc.)
  {
    path: "/v1/", // Prefijo de ruta para todas las páginas de autenticación
    element: <AuthenticationWrapper />, // Componente envolvente para la autenticación
    children: [
      {
        path: "login", // Ruta para la página de inicio de sesión
        element: <Login />, // Componente de login
      },
      {
        path: "register", // Ruta para la página de registro
        element: <Register />, // Componente de registro
      },
      {
        path: "forgot-password", // Ruta para la página de olvido de contraseña
        element: <ForgotPassword />, // Componente de olvido de contraseña
      },
      {
        path: "reset-password", // Ruta para la página de restablecimiento de contraseña
        element: <ResetPassword />, // Componente de restablecimiento de contraseña
      },
    ],
  },

  // Ruta para el callback de OAuth2 (después de que el usuario se autentique con OAuth2)
  {
    path: "/oauth2/callback", // Ruta para el callback de OAuth2
    element: <OAuth2LoginCallback />, // Componente que maneja el callback de OAuth2
  },
]);
