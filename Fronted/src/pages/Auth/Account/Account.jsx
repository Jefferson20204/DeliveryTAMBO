import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { fetchUserDetails } from "../../../api/userInfo";
import { loadUserInfo, selectUserInfo } from "../../../store/features/user";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando información...",
      })
    );

    const fetchData = fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      });

    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchData, minDelay]).finally(() => {
      dispatch(
        setLoading({
          loading: false,
          message: "",
        })
      );
    });
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const SidebarLink = ({ to, icon, children }) => {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          end
          onClick={toggleSidebar}
        >
          <span className="nav-icon-sidebar">{icon}</span>
          {children}
        </NavLink>
      </li>
    );
  };

  if (!userInfo?.email) return null;

  return (
    <div className="account-container">
      {/* Sidebar */}
      <aside className={`account-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>Mi Cuenta</h2>
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="user-greeting">
            <p className="greeting-text">Hola, {userInfo?.firstName}</p>
            <p className="welcome-text">Bienvenido a tu cuenta</p>
          </div>

          <nav className="account-sidebar-nav">
            <ul>
              <SidebarLink
                to="/account-details/profile"
                icon={<i class="fa-solid fa-user"></i>}
              >
                Perfil
              </SidebarLink>
              <SidebarLink
                to="/account-details/address"
                icon={<i class="fa-solid fa-location-dot"></i>}
              >
                Direcciones
              </SidebarLink>
              <SidebarLink
                to="/account-details/orders"
                icon={<i class="fa-solid fa-truck"></i>}
              >
                Pedidos
              </SidebarLink>
              <SidebarLink
                to="/account-details/settings"
                icon={<i class="fa-solid fa-gear"></i>}
              >
                Ajustes
              </SidebarLink>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Contenido principal donde se renderizarán los children (Profile/Settings) */}
      <main className="account-main-content">
        <Outlet />
      </main>

      {/* Botón de toggle para móvil */}
      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  );
};

export default Account;
