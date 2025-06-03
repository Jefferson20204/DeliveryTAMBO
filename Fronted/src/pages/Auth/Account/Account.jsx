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

  if (!userInfo?.email) return null;

  return (
    <div className="account-container">
      {/* Sidebar */}
      <aside className={`account-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>Mi Cuenta</h2>
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              &times;
            </button>
          </div>

          <div className="user-greeting">
            <p className="greeting-text">Hola, {userInfo?.firstName}</p>
            <p className="welcome-text">Bienvenido a tu cuenta</p>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink
                  to="/account-details/profile"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                >
                  <span className="nav-icon-sidebar">👤</span>
                  Perfil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account-details/address"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                >
                  <span className="nav-icon-sidebar">👤</span>
                  Direcciones
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account-details/settings"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav-icon-sidebar">⚙️</span>
                  Ajustes
                </NavLink>
              </li>
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
        ☰
      </button>
    </div>
  );
};

export default Account;
