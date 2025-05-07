import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/Logo/logo-tambo2.png";
import { isTokenValid } from "../../../utils/jwt-helper";
import "./Navigation.css";

const Navigation = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const isLoggedIn = isTokenValid();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

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
        {variant === "default" && (
          <div
            className="nav-user"
            onClick={() =>
              handleNavigate(isLoggedIn ? "/account-details/" : "/v1/login")
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(-1, 0, 0, 1, 0, 0)"
              className="nav-icon"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#000000"
                strokeWidth="0.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1554 18.5659L18.087 18.4067C17.6996 17.3756 17.0535 16.6988 16.0488 16.2901C15.0618 15.8886 13.7385 15.75 12.0001 15.75C10.275 15.75 8.95912 15.8972 7.97442 16.3031C6.97373 16.7156 6.32558 17.3909 5.93304 18.4043L5.85652 18.5771C4.09876 16.9345 3 14.5956 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.5897 19.9062 16.9239 18.1554 18.5659ZM8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10Z"
                  fill="#b12a90"
                ></path>{" "}
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#b12a90"
                  strokeWidth="2"
                ></path>{" "}
                <path
                  d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                  stroke="#b12a90"
                  strokeWidth="2"
                ></path>{" "}
                <path
                  d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5"
                  stroke="#b12a90"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
            {!isLoggedIn && <span>Iniciar sesión</span>}
          </div>
        )}
        <div className="nav-cart" onClick={() => handleNavigate("/cart")}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="nav-icon"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#b12a90"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
