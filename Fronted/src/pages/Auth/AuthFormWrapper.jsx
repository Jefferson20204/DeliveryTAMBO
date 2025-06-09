import Logo from "../../assets/img/Logo/logo-tambo2.png";
import "./AuthStyles.css";

const AuthFormWrapper = ({ title, variant, children }) => {
  return (
    <div className="form-page">
      {variant === "registro" && <div className="form-image bg-login"></div>}
      {variant === "login" && <div className="form-image bg-register"></div>}

      {/* Zona del formulario */}
      <div className="form-container">
        <img src={Logo} alt="Logo" className="form-logo" />
        <h1 className="form-title">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
