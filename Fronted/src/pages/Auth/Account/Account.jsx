import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { fetchUserDetails } from "../../../api/userInfo";
import { loadUserInfo, selectUserInfo } from "../../../store/features/user";
import CloseIcon from "../../../common/CloseIcon";
import MenuIcon from "../../../common/MenuIcon";
import "./Account.css";
import UserIcon from "../../../common/UserIcon";
import AddressIcon from "../../../common/AddressIcon";
import SettingsIcon from "../../../common/SettingsIcon";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
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
              <CloseIcon />
            </button>
          </div>

          <div className="user-greeting">
            <p className="greeting-text">Hola, {userInfo?.firstName}</p>
            <p className="welcome-text">Bienvenido a tu cuenta</p>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <SidebarLink
                to="/account-details/profile"
                icon={<UserIcon size={20} />}
              >
                Perfil
              </SidebarLink>
              <SidebarLink
                to="/account-details/address"
                icon={<AddressIcon size={20} />}
              >
                Direcciones
              </SidebarLink>
              <SidebarLink
                to="/account-details/settings"
                icon={<SettingsIcon size={20} />}
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
        <MenuIcon size={32} />
      </button>
    </div>
  );
};

export default Account;
