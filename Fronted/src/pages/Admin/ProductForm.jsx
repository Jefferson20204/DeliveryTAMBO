import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const emptyVariant = { color: "", size: "", stockQuantity: 0 };
  const emptyResource = { name: "", url: "", type: "image", isPrimary: false };

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    rating: 0,
    isNewArrival: false,
    isActive: true,
    categoryId: "",
    typeId: "",
    productVariants: [],
    resources: [],
    discountIds: [],
  });

  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllCategories();
      setCategories(cats);

      if (isEdit) {
        const p = await getProductById(id);

        // Procesar variantes: solo incluir si alguna tiene datos válidos
        const mappedVariants = p.productVariants.map((v) => ({
          color: v.color,
          size: v.size,
          stockQuantity: v.stockQuantity,
        }));

        const hasValidVariants = mappedVariants.some(
          (v) => v.color.trim() && v.size.trim() && v.stockQuantity > 0
        );

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
          brand: p.brand,
          rating: p.rating || 0,
          isNewArrival: p.isNewArrival,
          isActive: p.isActive,
          categoryId: p.category.id,
          typeId: p.categoryType?.id || "",
          productVariants: hasValidVariants ? mappedVariants : [],
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

  const handleVariantChange = (idx, e) => {
    const updated = [...formData.productVariants];
    const { name, value } = e.target;
    updated[idx][name] = name === "stockQuantity" ? Number(value) : value;
    setFormData({ ...formData, productVariants: updated });
  };

  const removeVariant = (idx) => {
    const updated = formData.productVariants.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      productVariants: updated,
    });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      productVariants: [...formData.productVariants, emptyVariant],
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
      productVariants: formData.productVariants,
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
    <div>
      <h2>{isEdit ? "Editar producto" : "Agregar nuevo producto"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <input
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <input
          name="brand"
          placeholder="Marca"
          value={formData.brand}
          onChange={handleChange}
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          max={5}
          placeholder="Valoración"
          value={formData.rating}
          onChange={handleChange}
        />

        {/* Categorías */}
        <label>Categoría</label>
        <select
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

        <label>Sub categoría</label>
        <select name="typeId" value={formData.typeId} onChange={handleChange}>
          <option value="">Selecciona un tipo</option>
          {categoryTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Flags */}
        <label>
          <input
            type="checkbox"
            name="isNewArrival"
            checked={formData.isNewArrival}
            onChange={handleChange}
          />{" "}
          ¿Es nuevo?
        </label>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />{" "}
          Activo
        </label>

        {/* Variantes */}
        <h3>Variantes</h3>
        {formData.productVariants.map((v, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <input
              name="color"
              placeholder="Color"
              value={v.color}
              onChange={(e) => handleVariantChange(idx, e)}
              required
            />
            <input
              name="size"
              placeholder="Tamaño"
              value={v.size}
              onChange={(e) => handleVariantChange(idx, e)}
              required
            />
            <input
              name="stockQuantity"
              type="number"
              placeholder="Stock"
              value={v.stockQuantity}
              onChange={(e) => handleVariantChange(idx, e)}
              required
            />
            <button type="button" onClick={() => removeVariant(idx)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={addVariant}>
          Agregar variante
        </button>

        {/* Recursos */}
        <h3>Recursos</h3>
        {formData.resources.map((r, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <input
              name="name"
              placeholder="Nombre recurso"
              value={r.name}
              onChange={(e) => handleResourceChange(idx, e)}
            />
            <input
              name="url"
              placeholder="URL recurso"
              value={r.url}
              onChange={(e) => handleResourceChange(idx, e)}
            />
            <label>
              <input
                type="checkbox"
                name="isPrimary"
                checked={r.isPrimary}
                onChange={(e) => handleResourceChange(idx, e)}
              />
              Principal
            </label>
            <button type="button" onClick={() => removeResource(idx)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={addResource}>
          Agregar recurso
        </button>

        {/* Submit */}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
