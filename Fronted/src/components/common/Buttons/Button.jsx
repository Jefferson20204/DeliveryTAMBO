import React from "react";
import "./Button.css";
import "./GoogleSignIn.css"; // Solo si es botón Google

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary", // 'primary', 'outline', 'google'
  icon, // icono opcional
  ...props
}) => {
  let baseClass = "btn";
  if (variant === "primary") baseClass += " btn-primary";
  else if (variant === "outline") baseClass += " btn-outline";
  else if (variant === "google") baseClass = "btn-google-signin";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${className}`}
      type={type}
      {...props}
    >
      {icon && <img src={icon} alt="icon" className="google-signin-logo" />}
      <span className={variant === "google" ? "google-signin-text" : ""}>
        {children}
      </span>
    </button>
  );
};

export default Button;
