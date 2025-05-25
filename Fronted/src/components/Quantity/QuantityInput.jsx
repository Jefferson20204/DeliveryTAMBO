import trashIcon from "../../assets/img/Icons/delete-icon.svg";
import {
  addItemToCartAction,
  updateItemToCartAction,
  delteItemFromCartAction,
} from "../../store/actions/cartAction";
import "./QuantityInput.css";

const QuantityInput = ({
  value,
  onChange,
  min = 1,
  max = 99,
  product,
  dispatch,
  className = "",
}) => {
  const originalPrice = product.price;
  const price = product.discountedPrice || product.price;

  const updateQuantity = (quantity) => {
    onChange(quantity);

    const item = {
      id: product.id,
      name: product.name,
      priceOriginal: originalPrice,
      price,
      quantity,
      thumbnail: product.thumbnail,
      subTotal: originalPrice * quantity,
    };

    dispatch(updateItemToCartAction(item));
  };

  const handleAdd = () => {
    if (value < max) updateQuantity(value + 1);
  };

  const handleSubtract = () => {
    if (value > min) {
      updateQuantity(value - 1);
    } else {
      dispatch(delteItemFromCartAction({ productId: product.id }));
      onChange(0);
    }
  };

  const handleAddInitial = () => {
    onChange(min);
    dispatch(
      addItemToCartAction({
        id: product.id,
        name: product.name,
        priceOriginal: originalPrice,
        price,
        quantity: min,
        thumbnail: product.thumbnail,
        subTotal: originalPrice * min,
      })
    );
  };

  if (value === 0) {
    return (
      <div
        className={`quantity-add-wrapper ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="quantity-add"
          onClick={handleAddInitial}
          aria-label="Agregar al carrito"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div
      className={`quantity-container ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="quantity-btn"
        onClick={handleSubtract}
        aria-label="Reducir cantidad"
      >
        {value === min ? (
          <img
            src={trashIcon}
            alt="Eliminar del carrito"
            width={16}
            height={16}
          />
        ) : (
          "-"
        )}
      </button>
      <span className="quantity-number" aria-live="polite">
        {value}
      </span>
      <button
        className={value < max ? "quantity-btn" : "quantity-btn-disabled"}
        onClick={handleAdd}
        aria-label="Aumentar cantidad"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
