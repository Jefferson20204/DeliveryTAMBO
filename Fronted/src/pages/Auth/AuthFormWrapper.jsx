import Logo from "../../assets/img/Logo/logo-tambo2.png";
import "./AuthStyles.css";

const AuthFormWrapper = ({ title, children }) => {
  return (
    <div className="form-page">
      <div className="form-image bg-login"></div>

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
