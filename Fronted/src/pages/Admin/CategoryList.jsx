import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/categoryApi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <div>
      <div>
        <h2>Categorías</h2>
        <Link to="/admin/categories/new">Nueva categoría</Link>
      </div>
      {categories.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
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
