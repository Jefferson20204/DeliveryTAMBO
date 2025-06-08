import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../api/productApi";
import { getProductSectionsConfig } from "../../api/configApi";
import Slider from "../../components/Slider/MainSlider";
import ProductSection from "../../components/Section/ProductSection";
import { setLoading } from "../../store/features/common";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sectionsConfig, setSectionsConfig] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando productos...",
      })
    );

    getAllProducts().then(setProducts); // Obtener todos los productos

    const fetchData = getProductSectionsConfig().then((sections) => {
      // opcional: ordenar por position
      sections.sort((a, b) => a.position - b.position);
      setSectionsConfig(sections);
    });

    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchData, minDelay]).finally(() => {
      dispatch(
        setLoading({
          loading: false,
          message: "",
        })
      );
    });
  }, [dispatch]);

  return (
    <>
      <main>
        <Slider />
        <div className="px-auto ">
          <div className="py-auto">
            {sectionsConfig.map((section) => {
              // obtenemos el nombre de la categoría de uno de los productos
              const prods = products.filter(
                (p) => p.category.id === section.categoryId
              );
              const title =
                prods.length > 0
                  ? prods[0].category.name
                  : "Categoría desconocida";

              // limitar al máximo configurado
              const sliceProds = prods.slice(0, section.maxProducts);

              return (
                <div key={section.id}>
                  <ProductSection
                    title={title}
                    products={sliceProds}
                    onSeeMore={() =>
                      (window.location.href = `/productos/${title}`)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
