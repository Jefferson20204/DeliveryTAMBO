import { createBrowserRouter } from "react-router-dom"; // Función para crear el enrutador usando el navegador
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper"; // Componente envolvente para la aplicación de tienda
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback"; // Componente para manejar el callback de OAuth2
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Componente que protege rutas privadas
import AdminRoute from "./components/ProtectedRoute/AdminRoute"; // Componente que protege ritas de administrador
import Account from "./pages/Auth/Account/Account"; //  Página de cuenta
import Profile from "./pages/Auth/Account/Profile"; //  Página de perfil del usuario
import Settings from "./pages/Auth/Account/Settings"; //  Página de configuración de cuenta
import Home from "./pages/Public/Home"; //  Página de inicio
import Login from "./pages/Auth/Login/Login"; //  Página de inicio de sesión
import Register from "./pages/Auth/Register/Register"; //  Página de registro
import ForgotPassword from "./pages/Auth/Login/ForgotPassword"; //  Página de olvido de contraseña
import ResetPassword from "./pages/Auth/Login/ResetPassword"; //  Página de restablecimiento de contraseña
import AdminHome from "./pages/Admin/AdminHome"; //  Página de inicio del panel de administrador
import ProductsList from "./pages/Admin/ProductsList"; //  Página de lista de productos del adminstrador
import DiscountList from "./pages/Admin/DiscountList"; //  Página de lista de descuentos
import CategoryList from "./pages/Admin/CategoryList"; //  Página de lista de categorías
import CategoryForm from "./pages/Admin/CategoryForm"; //  Página de crear/editar de categoría
import ProductForm from "./pages/Admin/ProductForm"; //  Página de crear/editar de producto
import DiscountForm from "./pages/Admin/DiscountForm"; // Página de crear/editar descuento
import Cart from "./pages/Public/CartPage"; // Página del carrito
import BrandsList from "./pages/Admin/BrandsList"; //  Página de lista de marcas
import BrandForm from "./pages/Admin/BrandForm"; //  Página de crear/editar marcas
import AdminProductSections from "./pages/Admin/AdminProductSections"; //  Página de la configuracion deladministrador
import Address from "./pages/Auth/Account/Address"; //  Página de direcciones del usuario
import Checkout from "./pages/Public/Checkout";
import Orders from "./pages/Auth/Account/Orders";

/**
 * Definición del enrutador de la aplicación usando createBrowserRouter.
 * Se configuran las rutas públicas, protegidas y de autenticación.
 */
export const router = createBrowserRouter([
  // Ruta principal de la tienda
  {
    path: "/",
    element: <ShopApplicationWrapper type="shop" />, // Componente envolvente para la tienda
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
            path: "address",
            element: <Address />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />, // Carrito
      },
      {
        path: "/checkout",
        element: <Checkout />, // Carrito
      },
      // Aquí puedes añadir más rutas protegidas o públicas
    ],
  },

  // Rutas relacionadas con la autenticación (login, registro, etc.)
  {
    path: "/v1/", // Prefijo de ruta para todas las páginas de autenticación
    element: <ShopApplicationWrapper type="login" />,
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
        path: "brands",
        element: <BrandsList />,
      },
      {
        path: "brands/new",
        element: <BrandForm />,
      },
      {
        path: "brands/edit/:id",
        element: <BrandForm />,
      },
      {
        path: "productSection",
        element: <AdminProductSections />,
      },

      // Aquí puedes añadir más rutas protegidas para el administrador
    ],
  },
]);
