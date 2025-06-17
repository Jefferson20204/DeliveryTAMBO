import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBrands } from "../../api/brandsApi";
import "./Css/BrandsList.css";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrands().then(setBrands);
  }, []);

  return (
    <div className="brands-container">
      <div className="brands-header">
        <h2 className="brands-title">Marcas</h2>
        <button className="brands-add-button" onClick={() => navigate("/admin/brands/new")}>
          Agregar Marca
        </button>
      </div>
      {brands.length === 0 ? (
        <p className="no-brands-msg">No hay marcas disponibles.</p>
      ) : (
        <table className="brands-table">
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
