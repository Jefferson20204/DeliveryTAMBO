import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ type = "info", title, children, buttons, className = "" }) => {
  return (
    <div className={`card ${type} ${className}`}>
      {/* Header de la card */}
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}

      {/* Contenido principal */}
      <div className="card-content">{children}</div>

      {/* Footer solo para formularios */}
      {type === "form" && buttons && (
        <div className="card-footer">{buttons}</div>
      )}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(["info", "form"]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttons: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
