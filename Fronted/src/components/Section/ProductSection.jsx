import { useRef } from "react";
import ProductCard from "../Card/ProductCard";
import "./ProductSection.css";
import ArrowIcon from "../../common/ArrowIcon";

const ProductSection = ({ title, products, onSeeMore }) => {
  const scrollRef = useRef();

  // Limitar a 8 productos
  const limitedProducts = products.slice(0, 12);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="see-more" onClick={onSeeMore}>
          Ver más →
        </button>
      </div>

      <div className="carousel-container">
        <button className="scroll-button left" onClick={() => scroll(-300)}>
          <ArrowIcon direction="left" size={24} />
        </button>

        <div className="product-carousel" ref={scrollRef}>
          {limitedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button className="scroll-button right" onClick={() => scroll(300)}>
          <ArrowIcon direction="right" size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
