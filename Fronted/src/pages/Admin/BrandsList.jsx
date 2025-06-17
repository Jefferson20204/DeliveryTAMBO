import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBrands } from "../../api/brandsApi";
<<<<<<< HEAD
=======
import "./Css/BrandsList.css";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrands().then(setBrands);
  }, []);

  return (
<<<<<<< HEAD
    <div>
      <div>
        <h2>Marcas</h2>
        <button onClick={() => navigate("/admin/brands/new")}>
=======
    <div className="brands-container">
      <div className="brands-header">
        <h2 className="brands-title">Marcas</h2>
        <button className="brands-add-button" onClick={() => navigate("/admin/brands/new")}>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          Agregar Marca
        </button>
      </div>
      {brands.length === 0 ? (
<<<<<<< HEAD
        <p>No hay marcas disponibles.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
=======
        <p className="no-brands-msg">No hay marcas disponibles.</p>
      ) : (
        <table className="brands-table">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
