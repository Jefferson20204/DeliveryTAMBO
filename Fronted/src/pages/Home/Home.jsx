import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productApi";
import { getProductSectionsConfig } from "../../api/configApi";
import Slider from "../../components/Slider/MainSlider";
import ProductSection from "../../components/Section/ProductSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sectionsConfig, setSectionsConfig] = useState([]);

  useEffect(() => {
    // 1) Carga todos los productos
    getAllProducts().then(setProducts);

    // 2) Carga la configuración de secciones
    getProductSectionsConfig().then((sections) => {
      // opcional: ordenar por position
      sections.sort((a, b) => a.position - b.position);
      setSectionsConfig(sections);
    });
  }, []);

  // filtra productos por nombre de categoría (asumiendo que product.category.name existe)
  const getProductsByCategoryName = (categoryName) =>
    products
      .filter(
        (p) => p.category.name.toLowerCase() === categoryName.toLowerCase()
      )
      .slice(0, 8); // opcional: limitar a 8, o usar maxProducts desde config

  return (
    <>
      <Slider />

      {sectionsConfig.map((section) => {
        // obtenemos el nombre de la categoría de uno de los productos
        const prods = products.filter(
          (p) => p.category.id === section.categoryId
        );
        const title =
          prods.length > 0 ? prods[0].category.name : "Categoría desconocida";

        // limitar al máximo configurado
        const sliceProds = prods.slice(0, section.maxProducts);

        return (
          <div key={section.id}>
            <ProductSection
              title={title}
              products={sliceProds}
              onSeeMore={() => (window.location.href = `/productos/${title}`)}
            />
          </div>
        );
      })}
    </>
  );
};

export default Home;
