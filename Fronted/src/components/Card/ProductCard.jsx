import { useState, useEffect, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import QuantityInput from "../Quantity/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const cartItem = useSelector((state) =>
    state.cartState.cart.find((item) => item.id === product.id)
  );

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItem]);

  const handleCardClick = useCallback((e) => {
    // Evita abrir modal al interactuar con el QuantityInput
    const isInsideInput = e.target.closest(".quantity-input");
    if (!isInsideInput) {
      setShowModal(true);
    }
  }, []);

  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="image-container">
          <img
            src={product.thumbnail || "/image/producto-defecto.jpg"}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="card-discount">-{product.discountPercentage}%</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>

          <div className="price-section">
            <span className="price">S/ {discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="original-price">
                S/ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <QuantityInput
            className="card-version"
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={product.stock}
            product={product}
            dispatch={dispatch}
          />
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          initialQuantity={quantity}
        />
      )}
    </>
  );
};

export default ProductCard;
