import { createBrowserRouter } from "react-router-dom"; // Función para crear el enrutador usando el navegador
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper"; // Componente envolvente para la aplicación de tienda
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback"; // Componente para manejar el callback de OAuth2
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Componente que protege rutas privadas
import AdminRoute from "./components/ProtectedRoute/AdminRoute"; // Componente que protege ritas de administrador
import Account from "./pages/Auth/Account/Account"; // Componente para la página de cuenta
import Profile from "./pages/Auth/Account/Profile"; // Componente para la página de perfil
import Settings from "./pages/Auth/Account/Settings"; // Componente para la página de configuración
import Home from "./pages/Home/Home"; // Componente para la página de inicio
import Login from "./pages/Auth/Login/Login"; // Componente para la página de inicio de sesión
import Register from "./pages/Auth/Register/Register"; // Componente para la página de registro
import ForgotPassword from "./pages/Auth/Login/ForgotPassword"; // Componente para la página de olvido de contraseña
import ResetPassword from "./pages/Auth/Login/ResetPassword"; // Componente para la página de restablecimiento de contraseña
import AdminHome from "./pages/Admin/AdminHome"; // Componente para la página de inicio del panel de administrador
import ProductsList from "./pages/Admin/ProductsList"; // Componente para la pagina de productos del adminstrador
import DiscountList from "./pages/Admin/DiscountList"; // Componente para la página de descuentos
import CategoryList from "./pages/Admin/CategoryList"; // Componente para la página de lista de categorías
import CategoryForm from "./pages/Admin/CategoryForm"; // Componente para la página de formulario de categoría
import ProductForm from "./pages/Admin/ProductForm"; // Componente para la página de formulario de producto
import DiscountForm from "./pages/Admin/DiscountForm";
import AdminProductSections from "./pages/Admin/AdminProductSections";

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
            <Account />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      // Aquí puedes añadir más rutas protegidas o públicas
    ],
  },

  // Rutas relacionadas con la autenticación (login, registro, etc.)
  {
    path: "/v1/", // Prefijo de ruta para todas las páginas de autenticación
    element: <ShopApplicationWrapper />, // Componente envolvente para la autenticación
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  // Ruta para el callback de OAuth2 (después de que el usuario se autentique con OAuth2)
  {
    path: "/oauth2/callback",
    element: <OAuth2LoginCallback />,
  },

  // Rutas protegidas para el panel de administrador
  {
    path: "/admin/",
    element: (
      <AdminRoute>
        <AdminHome />
      </AdminRoute>
    ),
    children: [
      {
        path: "products",
        element: <ProductsList />,
      },
      {
        path: "products/new",
        element: <ProductForm />,
      },
      {
        path: "products/edit/:id",
        element: <ProductForm />,
      },
      {
        path: "categories",
        element: <CategoryList />,
      },
      {
        path: "categories/new",
        element: <CategoryForm />,
      },
      {
        path: "categories/edit/:id",
        element: <CategoryForm />,
      },
      {
        path: "discounts",
        element: <DiscountList />,
      },
      {
        path: "discounts/new",
        element: <DiscountForm />,
      },
      {
        path: "discounts/edit/:id",
        element: <DiscountForm />,
      },
      {
        path: "productSection",
        element: <AdminProductSections />,
      },

      // Aquí puedes añadir más rutas protegidas para el administrador
    ],
  },
]);
