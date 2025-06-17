import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBrandById, createBrand, updateBrand } from "../../api/brandsApi";
<<<<<<< HEAD
=======
import "./Css/BrandForm.css";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

const BrandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isEdit) {
      getBrandById(id).then((brand) => {
        setFormData({
          name: brand.name,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    const result = isEdit
      ? await updateBrand(id, payload)
      : await createBrand(payload);

    if (result) {
      navigate("/admin/brands");
    } else {
      alert(`Error al ${isEdit ? "actualizar" : "crear"} marca`);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>{isEdit ? "Editar marca" : "Agregar nueva marca"}</h2>
      <form onSubmit={handleSubmit}>
        <input
=======
    <div className="brand-form-container">
      <h2 className="brand-form-title">
        {isEdit ? "Editar marca" : "Agregar nueva marca"}
      </h2>
      <form className="brand-form" onSubmit={handleSubmit}>
        <input
          className="brand-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="name"
          placeholder="Nombre de la marca"
          value={formData.name}
          onChange={handleChange}
          required
        />
<<<<<<< HEAD
        <button type="submit">Guardar</button>
=======
        <button className="brand-submit-btn" type="submit">
          {isEdit ? "Actualizar" : "Guardar"}
        </button>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </form>
    </div>
  );
};

export default BrandForm;
