import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBrandById, createBrand, updateBrand } from "../../api/brandsApi";
import "./Css/BrandForm.css";

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
    <div className="brand-form-container">
      <h2 className="brand-form-title">
        {isEdit ? "Editar marca" : "Agregar nueva marca"}
      </h2>
      <form className="brand-form" onSubmit={handleSubmit}>
        <input
          className="brand-input"
          name="name"
          placeholder="Nombre de la marca"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button className="brand-submit-btn" type="submit">
          {isEdit ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
