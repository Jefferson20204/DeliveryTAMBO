import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productApi";
import Slider from "../../components/Slider/MainSlider";
import ProductSection from "../../components/Section/ProductSection";

const productCategories = ["Comidas", "Bebidas", "Licores", "Helados"];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      setProducts(result);
    };

    fetchProducts();
  }, []);

  const getProductsByCategory = (category) =>
    products.filter(
      (p) => p.category.name.toLowerCase() === category.toLowerCase()
    );

  return (
    <>
      <Slider />
      {productCategories.map((category) => (
        <div key={category}>
          <ProductSection
            title={category}
            products={getProductsByCategory(category)}
            onSeeMore={() => (window.location.href = `/productos/${category}`)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
