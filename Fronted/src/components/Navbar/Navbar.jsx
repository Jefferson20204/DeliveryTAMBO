import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo/logo-tambo2.png";
import { isTokenValid } from "../../utils/jwt-helper";
import { countCartItems } from "../../store/features/cart";
import { selectUserInfo } from "../../store/features/user";
import "./Navbar.css";

const Avatar = ({ user, size = 32 }) => {
  // Si hay imagen de perfil
  if (user?.profileImageUrl) {
    return (
      <img
        src={user.profileImageUrl}
        alt={`${user.firstName || ""} ${user.lastName || ""}`}
        className="avatar-image"
        style={{ width: size, height: size }}
      />
    );
  }

  // Si no hay imagen, mostrar inicial con fondo de color
  const initial = user?.firstName?.[0]?.toUpperCase() || "U";
  const colors = [
    "#FFB900",
    "#FF8C00",
    "#E81123",
    "#D13438",
    "#C239B3",
    "#B146C2",
    "#881798",
    "#0099BC",
    "#2D7D9A",
    "#00B294",
    "#018574",
    "#00CC6A",
  ];
  const colorIndex = initial.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className="avatar-initial"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.5,
      }}
    >
      {initial}
    </div>
  );
};

const Navigation = ({ type = "shop" }) => {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const isLoggedIn = isTokenValid();
  const navRef = useRef();

  const totalItems = useSelector(countCartItems); // Obtiene el numero total de articulos en el carrito

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      {type === "shop" && (
        <div className="top-bar">
          <a>¡Sobrin@ entregamos tu pedido en 30 minutos!</a>
        </div>
      )}

      <nav className="navigation-container" ref={navRef}>
        <div className="navigation px-auto">
          <div className="nav-left">
            <a href="/">
              <img src={Logo} alt="Logo" className="nav-logo" />
            </a>
          </div>

          {type === "shop" && (
            <div className="nav-right ">
              <div
                className="nav-user"
                onClick={() =>
                  handleNavigate(
                    isLoggedIn ? "/account-details/profile" : "/v1/login"
                  )
                }
              >
                {isLoggedIn ? (
                  <Avatar user={userInfo} size={32} />
                ) : (
                  <>
                    <i class="fa-solid fa-user nav-icon"></i>
                    <span>Iniciar sesión</span>
                  </>
                )}
              </div>

              <div className="nav-cart" onClick={() => handleNavigate("/cart")}>
                <i class="fa-solid fa-cart-shopping nav-icon"></i>
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
