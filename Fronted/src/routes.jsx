import { createBrowserRouter } from "react-router-dom";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import Account from "./pages/Auth/Account/Account";
import Profile from "./pages/Auth/Account/Profile";
import Settings from "./pages/Auth/Account/Settings";
import Home from "./pages/Public/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ForgotPassword from "./pages/Auth/Login/ForgotPassword";
import ResetPassword from "./pages/Auth/Login/ResetPassword";
import AdminHome from "./pages/Admin/AdminHome";
import ProductsList from "./pages/Admin/ProductsList";
import DiscountList from "./pages/Admin/DiscountList";
import CategoryList from "./pages/Admin/CategoryList";
import CategoryForm from "./pages/Admin/CategoryForm";
import ProductForm from "./pages/Admin/ProductForm";
import DiscountForm from "./pages/Admin/DiscountForm";
import Cart from "./pages/Public/CartPage";
import BrandsList from "./pages/Admin/BrandsList";
import BrandForm from "./pages/Admin/BrandForm";
import AdminProductSections from "./pages/Admin/AdminProductSections";
import Address from "./pages/Auth/Account/Address";
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
    element: <ShopApplicationWrapper type="shop" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/account-details/",
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
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
