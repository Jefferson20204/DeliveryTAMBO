import React from "react";
import Slider from "../../components/common/Slider/MainSlider";
import ProductSection from "../../components/common/Section/ProductSection";

const productList = [
  {
    id: 1,
    name: "Pack (2 Huevo Pardo La Calera x 15 Und)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/pdkmxQL2QvJnLvk2J-2400-x.webp",
    price: 23.8,
    discountPercentage: 0,
    description: "Este producto está limitado a 2 unidades por compra.",
    stock: 10,
  },
  {
    id: 2,
    name: "Pack 2 Macaroni & Cheese Jappy Macs Original 226 Gr",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/8KeFbfjHXrNT3BXHq-1000-x.webp",
    price: 9.98,
    discountPercentage: 20,
    description: "",
    stock: 10,
  },
  {
    id: 3,
    name: "Pack (2 Sopa Oriental Shin Ramyun x 120 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/H7NvWpDxfFY3YyL2B-2400-x.webp",
    price: 15,
    discountPercentage: 0,
    description: "Este producto está limitado a 2 unidades por compra.",
    stock: 10,
  },
  {
    id: 4,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 10,
  },
  {
    id: 5,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 10,
  },
  {
    id: 6,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 19,
  },
  {
    id: 7,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 6,
  },
  {
    id: 8,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 5,
  },
  {
    id: 9,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 13,
  },
  {
    id: 10,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 15,
  },
  {
    id: 11,
    name: "Pack (4 Conserva Trozos De Atún Campomar x 150 Gr)",
    imageUrl:
      "https://tofuu.getjusto.com/orioneat-local/resized2/654TTG4hdmSRH8bZt-2400-x.webp",
    price: 24.4,
    discountPercentage: 18,
    description: "",
    stock: 20,
  },
];

const productCategories = ["Cervezas", "Licores", "Comidas", "Descuentos"];

const Home = () => {
  return (
    <>
      <Slider />
      {productCategories.map((category) => (
        <div key={category}>
          <ProductSection
            title={category}
            products={productList}
            onSeeMore={() => (window.location.href = `/productos/${category}`)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
