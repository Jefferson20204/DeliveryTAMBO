import "./Spinner.css";

const Spinner = ({
  color = "#6366f1",
  text = "Cargando...",
  showDots = false,
  spinnerType = "dual",
}) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        {spinnerType === "dual" ? (
          <>
            <div className="spinner-modern" />
            {showDots && (
              <div className="spinner-dots">
                <div className="spinner-dot" />
                <div className="spinner-dot" />
                <div className="spinner-dot" />
              </div>
            )}
          </>
        ) : (
          <div className="spinner-dots">
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
          </div>
        )}
        <span className="spinner-text">{text}</span>
      </div>
    </div>
  );
};

export default Spinner;
