import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import QuantityInput from "../Quantity/QuantityInput";
import Button from "../Buttons/Button";
import "./ProductModal.css";

const ProductModal = ({ product, onClose, initialQuantity }) => {
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity || 0);

  useEffect(() => {
    setQuantity(initialQuantity || 0);
  }, [initialQuantity]);

  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const subtotal = (discountedPrice * quantity).toFixed(2);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setQuantity(1);
    }, 300);
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      className={`modal-overlay2 ${
        isClosing ? "overlay-fade-out" : "overlay-fade-in"
      }`}
      onClick={handleClose}
    >
      <div
        className={`modal-product ${isClosing ? "fade-out" : "fade-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {" "}
          <div className="modal-left">
            <div className="modal-image-wrapper">
              {hasDiscount && (
                <div className="discount-badge">
                  -{product.discountPercentage}%
                </div>
              )}
              <img
                src={
                  product.thumbnail ||
                  "https://www.nisira.com.pe/images/Features/default-box.png"
                }
                alt={product.name}
                className="modal-image"
              />
            </div>
          </div>
          <div className="modal-right">
            <h2>{product.name}</h2>
            <div className="price-info">
              <span className="price">S/ {discountedPrice.toFixed(2)}</span>
              {hasDiscount && (
                <span className="original-price">
                  S/ {product.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="description">
              {product.description.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <button className="modal-close" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="bottom-bar">
          <QuantityInput
            className="modal-version"
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={product.stock}
            product={product}
            dispatch={dispatch}
          />

          <Button>Agregar - S/ {subtotal}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
