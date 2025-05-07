import React, { useState, useEffect } from "react";
import QuantityInput from "../Quantity/QuantityInput";
import Button from "../Buttons/Button";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
      className={`modal-overlay ${
        isClosing ? "overlay-fade-out" : "overlay-fade-in"
      }`}
      onClick={handleClose}
    >
      <div
        className={`modal-product ${isClosing ? "fade-out" : "fade-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="modal-left">
          <div className="modal-image-wrapper">
            {hasDiscount && (
              <div className="discount-badge">
                -{product.discountPercentage}%
              </div>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="modal-image"
            />
          </div>
        </div>

        <div className="modal-right">
          <h2>{product.name}</h2>
          <div className="price-info">
            <span className="price">${discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="description">{product.description}</p>
        </div>

        <div className="bottom-bar">
          <QuantityInput
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={product.stock || 10} // Usa la propiedad correcta que tengas como stock
          />

          <Button>Agregar - ${subtotal}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
