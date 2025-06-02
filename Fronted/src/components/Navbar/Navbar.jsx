import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo/logo-tambo2.png";
import { isTokenValid } from "../../utils/jwt-helper";
import { useSelector } from "react-redux";
import { countCartItems } from "../../store/features/cart";
import UserIcon from "../../common/UserIcon";
import CartIcon from "../../common/CartIcon";
import "./Navbar.css";

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = isTokenValid();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const totalItems = useSelector(countCartItems); // Obtiene el numero total de articulos en el carrito

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
  };

  return (
    <>
      <div className="top-bar">
        <a>¡Sobrin@ entregamos tu pedido en 30 minutos!</a>
      </div>
      <nav className="navigation" ref={navRef}>
        <div className="nav-left">
          <a href="/" onClick={() => setMenuOpen(false)}>
            <img src={Logo} alt="Logo" className="nav-logo" />
          </a>
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-right ${menuOpen ? "show" : ""}`}>
          <div
            className="nav-user"
            onClick={() =>
              handleNavigate(
                isLoggedIn ? "/account-details/profile" : "/v1/login"
              )
            }
          >
            <UserIcon />
            {!isLoggedIn && <span>Iniciar sesión</span>}
          </div>

          <div className="nav-cart" onClick={() => handleNavigate("/cart")}>
            <CartIcon />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
