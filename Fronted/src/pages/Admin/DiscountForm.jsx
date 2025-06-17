import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDiscountById,
  createDiscount,
  updateDiscount,
} from "../../api/discountApi";
import { getAllProducts } from "../../api/productApi";
<<<<<<< HEAD
=======
import "./Css/DiscountForm.css";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

export default function DiscountForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    startDate: "",
    endDate: "",
    isActive: false,
    productIds: [],
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prods = await getAllProducts();
      setProducts(prods);
      if (isEdit) {
        const disc = await getDiscountById(id);
        setFormData({
          name: disc.name,
          percentage: disc.percentage,
          startDate: disc.startDate.slice(0, 16),
          endDate: disc.endDate.slice(0, 16),
          isActive: disc.isActive,
          productIds: disc.products.map((p) => p.id),
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData({ ...formData, productIds: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      percentage: parseFloat(formData.percentage),
    };
    const result = isEdit
      ? await updateDiscount(id, payload)
      : await createDiscount(payload);
    if (result) navigate("/admin/discounts");
    else alert(`Error al ${isEdit ? "actualizar" : "crear"} descuento`);
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>{isEdit ? "Editar descuento" : "Agregar nuevo descuento"}</h2>
      <form onSubmit={handleSubmit}>
        <input
=======
    <div className="discount-form-container">
      <h2 className="discount-form-title">{isEdit ? "Editar descuento" : "Agregar nuevo descuento"}</h2>
      <form onSubmit={handleSubmit} className="discount-form">
        <input
          className="discount-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
<<<<<<< HEAD
=======
          className="discount-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="percentage"
          type="number"
          step="0.01"
          placeholder="Porcentaje"
          value={formData.percentage}
          onChange={handleChange}
          required
        />
<<<<<<< HEAD
        <label>Fecha inicio</label>
        <input
=======
        <label className="discount-label">Fecha inicio</label>
        <input
          className="discount-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="startDate"
          type="datetime-local"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
<<<<<<< HEAD
        <label>Fecha fin</label>
        <input
=======
        <label className="discount-label">Fecha fin</label>
        <input
          className="discount-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="endDate"
          type="datetime-local"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
<<<<<<< HEAD
        <label>
=======
        <label className="discount-checkbox">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />{" "}
          Activo
        </label>
<<<<<<< HEAD
        <label>Productos</label>
        <select
=======
        <label className="discount-label">Productos</label>
        <select
          className="discount-select"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="productIds"
          multiple
          value={formData.productIds}
          onChange={handleChange}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ${p.price.toFixed(2)}
            </option>
          ))}
        </select>
<<<<<<< HEAD
        <button type="submit">Guardar</button>
=======
        <button type="submit" className="discount-submit-button">Guardar</button>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </form>
    </div>
  );
}
