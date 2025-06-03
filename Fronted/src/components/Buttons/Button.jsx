import "./Button.css";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary", // 'primary', 'outline', 'google'
  icon,
  fullWidth = true, // Nueva prop para controlar el ancho
  form = "",
  ...props
}) => {
  let baseClass = "btn";
  if (variant === "primary") baseClass += " btn-primary";
  else if (variant === "outline") baseClass += " btn-outline";
  else if (variant === "google") baseClass = "btn-google-signin";

  // Clase adicional para controlar el ancho
  const widthClass = fullWidth ? "btn-full-width" : "btn-auto-width";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${widthClass} ${className}`}
      type={type}
      form={form}
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
