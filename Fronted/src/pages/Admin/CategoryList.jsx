import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/categoryApi";
import "./Css/CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h2 className="category-title">Categorías</h2>
        <Link to="/admin/categories/new" className="new-category-button">Nueva categoría</Link>
      </div>
      {categories.length === 0 ? (
        <p className="no-categories-text">No hay categorías disponibles.</p>
      ) : (
        <table className="category-table" border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td>{cat.code}</td>
                <td>{cat.description}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/categories/edit/${cat.id}`)}
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

export default CategoryList;
