import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "../../api/categoryApi";
<<<<<<< HEAD
=======
import "./Css/CategoryForm.css";

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    code: "",
    description: "",
    categoryTypes: [],
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (index, field, value) => {
    const updatedTypes = [...category.categoryTypes];
    updatedTypes[index][field] = value;
    setCategory({ ...category, categoryTypes: updatedTypes });
  };

  const addType = () => {
    setCategory({
      ...category,
      categoryTypes: [
        ...category.categoryTypes,
        { name: "", code: "", description: "" },
      ],
    });
  };

  const removeType = (index) => {
    const updatedTypes = [...category.categoryTypes];
    updatedTypes.splice(index, 1);
    setCategory({ ...category, categoryTypes: updatedTypes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateCategory(id, category);
      } else {
        await createCategory(category);
      }
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error al guardar la categoría", error);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryById(id).then(setCategory).catch(console.error);
    }
  }, [id]);

  return (
<<<<<<< HEAD
    <div>
=======
    <div className="category-form-container">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      <h2>{id ? "Editar Categoría" : "Crear Categoría"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={category.name}
          onChange={handleChange}
          required
        />
        <input
          name="code"
          placeholder="Código"
          value={category.code}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={category.description}
          onChange={handleChange}
          required
        />

        <h3>Tipos de categoría</h3>
        {category.categoryTypes.map((type, index) => (
<<<<<<< HEAD
          <div key={index}>
=======
          <div key={index} className="category-type-item">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
            <input
              placeholder="Nombre"
              value={type.name}
              onChange={(e) => handleTypeChange(index, "name", e.target.value)}
              required
            />
            <input
              placeholder="Código"
              value={type.code}
              onChange={(e) => handleTypeChange(index, "code", e.target.value)}
              required
            />
            <textarea
              placeholder="Descripción"
              value={type.description}
              onChange={(e) =>
                handleTypeChange(index, "description", e.target.value)
              }
              required
            />
            <button type="button" onClick={() => removeType(index)}>
              Eliminar tipo
            </button>
          </div>
        ))}

<<<<<<< HEAD
        <button type="button" onClick={addType}>
          Agregar tipo
        </button>

        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
=======
        <button type="button" className="add-type-button" onClick={addType}>
          Agregar tipo
        </button>

        <button type="submit" className="submit-button">{id ? "Actualizar" : "Crear"}</button>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </form>
    </div>
  );
};

export default CategoryForm;
