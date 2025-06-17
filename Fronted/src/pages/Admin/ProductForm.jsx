import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "../../api/productApi";
import { getAllBrands } from "../../api/brandsApi";
import { getAllCategories } from "../../api/categoryApi";
<<<<<<< HEAD
=======
import "./Css/ProductForm.css";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const emptyResource = { name: "", url: "", type: "image", isPrimary: false };

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    brandId: "",
    rating: 0,
    isNewArrival: false,
    isActive: true,
    categoryId: "",
    typeId: "",
    resources: [],
    discountIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllCategories();
      setCategories(cats);

      const b = await getAllBrands();
      setBrands(b);

      if (isEdit) {
        const p = await getProductById(id);

        // Procesar recursos normalmente
        const mappedResources = p.resources.map((r) => ({
          name: r.name,
          url: r.url,
          type: r.type,
          isPrimary: r.isPrimary,
        }));

        const hasValidResources = mappedResources.some(
          (r) => r.name.trim() && r.url.trim()
        );

        setFormData({
          slug: p.slug,
          name: p.name,
          description: p.description || "",
          price: p.price,
          stock: p.stock,
          brandId: p.brand?.id || "", // asignar solo el ID
          rating: p.rating || 0,
          isNewArrival: p.isNewArrival,
          isActive: p.isActive,
          categoryId: p.category.id,
          typeId: p.categoryType?.id || "",
          resources: hasValidResources ? mappedResources : [],
          discountIds: p.discounts.map((d) => d.id),
        });
        const selCat = cats.find((cat) => cat.id === p.category.id);
        setCategoryTypes(selCat?.categoryTypes || []);
      }
    };
    fetchData();
  }, [id]);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const sel = categories.find((cat) => cat.id === selectedId);
    setFormData({ ...formData, categoryId: selectedId, typeId: "" });
    setCategoryTypes(sel?.categoryTypes || []);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleResourceChange = (idx, e) => {
    const updated = [...formData.resources];
    const { name, value, type, checked } = e.target;
    updated[idx][name] = type === "checkbox" ? checked : value;
    setFormData({ ...formData, resources: updated });
  };

  const removeResource = (idx) => {
    const updated = formData.resources.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      resources: updated,
    });
  };

  const addResource = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, emptyResource],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      categoryId: formData.categoryId,
      categoryTypeId: formData.typeId,
      resources: formData.resources,
      discountIds: formData.discountIds,
    };

    const result = isEdit
      ? await updateProduct(id, payload)
      : await createProduct(payload);

    if (result) navigate("/admin/products");
    else alert(`Error al ${isEdit ? "actualizar" : "crear"} producto`);
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>{isEdit ? "Editar producto" : "Agregar nuevo producto"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <input
=======
    <div className="product-form-container">
      <h2 className="product-form-title">{isEdit ? "Editar producto" : "Agregar nuevo producto"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Campos básicos */}
        <input
          className="product-form-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
<<<<<<< HEAD
=======
          className="product-form-textarea"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <input
<<<<<<< HEAD
=======
          className="product-form-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="price"
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
<<<<<<< HEAD
=======
          className="product-form-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
        <input
<<<<<<< HEAD
=======
          className="product-form-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />
        {/* Marcas */}
<<<<<<< HEAD
        <label>Marca</label>
        <select
=======
        <label className="product-form-label">Marca</label>
        <select
          className="product-form-select"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="brandId"
          value={formData.brandId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una marca</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        {/* Valoracion */}
        <input
<<<<<<< HEAD
=======
          className="product-form-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="rating"
          type="number"
          step="0.1"
          max={5}
          placeholder="Valoración"
          value={formData.rating}
          onChange={handleChange}
        />
        {/* Categorías */}
<<<<<<< HEAD
        <label>Categoría</label>
        <select
=======
        <label className="product-form-label">Categoría</label>
        <select
          className="product-form-select"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          name="categoryId"
          value={formData.categoryId}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {/* Sub categorias */}
<<<<<<< HEAD
        <label>Sub categoría</label>
=======
        <label className="product-form-label">Sub categoría</label>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
        <select name="typeId" value={formData.typeId} onChange={handleChange}>
          <option value="">Selecciona un tipo</option>
          {categoryTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {/* Nuevo producto */}
<<<<<<< HEAD
        <label>
=======
        <label className="product-form-checkbox-label">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          <input
            type="checkbox"
            name="isNewArrival"
            checked={formData.isNewArrival}
            onChange={handleChange}
          />{" "}
          ¿Es nuevo?
        </label>
        {/* Producto Activo */}
<<<<<<< HEAD
        <label>
=======
        <label className="product-form-checkbox-label">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />{" "}
          Activo
        </label>
        {/* Recursos - Imagenes*/}
<<<<<<< HEAD
        <h3>Recursos</h3>
        {formData.resources.map((r, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <input
=======
        <h3 className="product-form-subtitle">Recursos</h3>
        {formData.resources.map((r, idx) => (
          <div key={idx} className="product-form-resource-row">
            <input
              className="product-form-input resource-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
              name="name"
              placeholder="Nombre recurso"
              value={r.name}
              onChange={(e) => handleResourceChange(idx, e)}
            />
            <input
<<<<<<< HEAD
=======
              className="product-form-input resource-input"
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
              name="url"
              placeholder="URL recurso"
              value={r.url}
              onChange={(e) => handleResourceChange(idx, e)}
            />
<<<<<<< HEAD
            <label>
=======
            <label className="product-form-checkbox-label">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
              <input
                type="checkbox"
                name="isPrimary"
                checked={r.isPrimary}
                onChange={(e) => handleResourceChange(idx, e)}
              />
              Principal
            </label>
<<<<<<< HEAD
            <button type="button" onClick={() => removeResource(idx)}>
=======
            <button
              type="button"
              className="product-form-remove-resource-btn"
              onClick={() => removeResource(idx)}
            >
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
              Eliminar
            </button>
          </div>
        ))}
<<<<<<< HEAD
        <button type="button" onClick={addResource}>
=======
        <button
          type="button"
          className="product-form-add-resource-btn"
          onClick={addResource}
        >
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
          Agregar recurso
        </button>

        {/* Submit */}
<<<<<<< HEAD
        <button type="submit">Guardar</button>
=======
        <button type="submit" className="product-form-submit-btn">Guardar</button>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </form>
    </div>
  );
}
