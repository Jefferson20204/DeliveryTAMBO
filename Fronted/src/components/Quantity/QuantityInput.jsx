import trashIcon from "../../assets/img/Icons/delete-icon.svg";
import "./QuantityInput.css";

const QuantityInput = ({ value, onChange, min = 1, max = 99 }) => {
  const handleAdd = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleSubtract = () => {
    if (value > min) {
      onChange(value - 1);
    } else if (value === min) {
      onChange(0);
    }
  };

  if (value === 0) {
    return (
      <button className="quantity-add" onClick={() => onChange(min)}>
        +
      </button>
    );
  }

  return (
    <div className="quantity-wrapper">
      <button className="quantity-btn" onClick={handleSubtract}>
        {value === min ? (
          <img src={trashIcon} alt="Eliminar" width={16} height={16} />
        ) : (
          "-"
        )}
      </button>
      <span className="quantity-number">{value}</span>
      {value < max ? (
        <button className="quantity-btn" onClick={handleAdd}>
          +
        </button>
      ) : (
        <button className="quantity-btn-disabled" onClick={handleAdd}>
          +
        </button>
      )}
    </div>
  );
};

export default QuantityInput;
