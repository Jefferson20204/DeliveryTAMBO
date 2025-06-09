import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDiscountById,
  createDiscount,
  updateDiscount,
} from "../../api/discountApi";
import { getAllProducts } from "../../api/productApi";
import "./Css/DiscountForm.css";

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
    <div className="discount-form-container">
      <h2 className="discount-form-title">{isEdit ? "Editar descuento" : "Agregar nuevo descuento"}</h2>
      <form onSubmit={handleSubmit} className="discount-form">
        <input
          className="discount-input"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="discount-input"
          name="percentage"
          type="number"
          step="0.01"
          placeholder="Porcentaje"
          value={formData.percentage}
          onChange={handleChange}
          required
        />
        <label className="discount-label">Fecha inicio</label>
        <input
          className="discount-input"
          name="startDate"
          type="datetime-local"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <label className="discount-label">Fecha fin</label>
        <input
          className="discount-input"
          name="endDate"
          type="datetime-local"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <label className="discount-checkbox">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />{" "}
          Activo
        </label>
        <label className="discount-label">Productos</label>
        <select
          className="discount-select"
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
        <button type="submit" className="discount-submit-button">Guardar</button>
      </form>
    </div>
  );
}
