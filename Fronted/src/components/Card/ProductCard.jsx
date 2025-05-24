import { useState } from "react";
import ProductModal from "../Modal/ProductModal";
import Button from "../Buttons/Button";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <>
      <div className="product-card" onClick={() => setShowModal(true)}>
        <div className="image-container">
          <img
            src={product.thumbnail || "/image/producto-defecto.jpg"}
            alt={product.name}
            className="product-image"
          />
          {hasDiscount && (
            <div className="card-discount">-{product.discountPercentage}%</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="price-section">
            <span className="price">${discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button variant="primary">Añadir al carrito</Button>
        </div>
      </div>

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
