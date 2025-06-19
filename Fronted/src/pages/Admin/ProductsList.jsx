import { useEffect, useState } from "react";
import { getAllProductsAdmin, deleteProduct } from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";
import ExportButtons from "../../components/Buttons/ExportButtons";
import "./Css/ProductsList.css";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductsAdmin().then(setProducts);
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm("Estas seguro de eliminar este producto?")) {
      deleteProduct(productId)
        .then((response) => {
          console.log(response);
          getAllProductsAdmin().then(setProducts);
        })
        .catch((error) => {
          console.log("Eror al eliminar el producto: ", error);
        });
    }
  };

  return (
    <div className="products-list-container">
      <div className="products-list-header">
        <h2 className="products-list-title">Lista de productos</h2>
        <div className="products-list-buttons">
          <ExportButtons
            className={"products-list-add-btn"}
            type="excel"
            urlApi="all-products"
          />
          <Link className="products-list-add-btn" to="/admin/products/new">
            Agregar producto
          </Link>
        </div>
      </div>
      {products.length === 0 ? (
        <p className="products-empty-message">No hay productos disponibles.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Nuevo</th>
              <th>Activo</th>
              <th>Categoría</th>
              <th>Precio base</th>
              <th>Precio con descuento</th>
              <th>Porcentaje</th>
              <th>Stock</th>
              <th>Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.slug}</td>
                <td>{product.isNewArrival ? "Sí" : "No"}</td>
                <td>{product.isActive ? "Sí" : "No"}</td>
                <td>{product.category.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{product.discountedPrice.toFixed(2)}</td>
                <td>{product.discountPercentage + "%"}</td>
                <td>{product.stock}</td>
                <td>{product.brand.name}</td>
                <td>
                  <button
                    className="products-edit-btn"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="products-edit-btn"
                    onClick={() => {
                      handleDelete(product.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
