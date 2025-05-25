import { useEffect, useState } from "react";
import { getAllProductsAdmin } from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductsAdmin().then(setProducts);
  }, []);

  return (
    <div className="m-1">
      <div>
        <h2>Lista de productos</h2>
        <Link to="/admin/products/new">Agregar producto</Link>
      </div>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
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
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                  >
                    Editar
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
