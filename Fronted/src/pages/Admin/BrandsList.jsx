import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBrands } from "../../api/brandsApi";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrands().then(setBrands);
  }, []);

  return (
    <div>
      <div>
        <h2>Marcas</h2>
        <button onClick={() => navigate("/admin/brands/new")}>
          Agregar Marca
        </button>
      </div>
      {brands.length === 0 ? (
        <p>No hay marcas disponibles.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/brands/edit/${brand.id}`)}
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
};

export default BrandsList;
