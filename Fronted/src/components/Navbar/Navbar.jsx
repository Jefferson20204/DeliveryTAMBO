<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
=======
import { useRef } from "react";
import { useSelector } from "react-redux";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo/logo-tambo2.png";
import { isTokenValid } from "../../utils/jwt-helper";
import { countCartItems } from "../../store/features/cart";
<<<<<<< HEAD
import UserIcon from "../../common/UserIcon";
import CartIcon from "../../common/CartIcon";
import { selectUserInfo } from "../../store/features/user"; // TEMPORAL
import "./Navbar.css";

// Nuevo componente Avatar (puedes moverlo a un archivo aparte después)
=======
import { selectUserInfo } from "../../store/features/user";
import "./Navbar.css";

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
  const [menuOpen, setMenuOpen] = useState(false);
=======
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
  const navRef = useRef();

  const totalItems = useSelector(countCartItems); // Obtiene el numero total de articulos en el carrito

<<<<<<< HEAD
  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Cierra el menú al navegar
=======
  const handleNavigate = (path) => {
    navigate(path);
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
            <a href="/" onClick={() => setMenuOpen(false)}>
=======
            <a href="/">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
              <img src={Logo} alt="Logo" className="nav-logo" />
            </a>
          </div>

          {type === "shop" && (
<<<<<<< HEAD
            <div className={`nav-right ${menuOpen ? "show" : ""}`}>
=======
            <div className="nav-right ">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
                    <UserIcon className={"nav-icon"} />
=======
                    <i className="fa-solid fa-user nav-icon"></i>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
                    <span>Iniciar sesión</span>
                  </>
                )}
              </div>

              <div className="nav-cart" onClick={() => handleNavigate("/cart")}>
<<<<<<< HEAD
                <CartIcon className={"nav-icon"} />
=======
                <i className="fa-solid fa-cart-shopping nav-icon"></i>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
