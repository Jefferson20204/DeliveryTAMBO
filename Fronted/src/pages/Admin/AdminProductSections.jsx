import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";
import {
  getProductSectionsConfig,
  createProductSection,
  updateProductSection,
  deleteProductSection,
} from "../../api/configApi";

const AdminProductSections = () => {
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({
    id: null,
    categoryId: "",
    maxProducts: 8,
    position: 0,
  });
  const [editing, setEditing] = useState(false);

  // Carga inicial
  useEffect(() => {
    (async () => {
      setCategories(await getAllCategories());
      setSections(await getProductSectionsConfig());
    })();
  }, []);

  // Handler de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Submit: crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateProductSection(form.id, form);
      console.log(form);
    } else {
      await createProductSection(form);
      console.log(form);
    }
    // refrescar lista
    const updated = await getProductSectionsConfig();
    setSections(updated);
    // reset
    setForm({ id: null, categoryId: "", maxProducts: 8, position: 0 });
    setEditing(false);
  };

  // Iniciar edición
  const startEdit = (sec) => {
    setForm({
      id: sec.id,
      categoryId: sec.categoryId,
      maxProducts: sec.maxProducts,
      position: sec.position,
    });
    setEditing(true);
    // console.log(sec);
  };

  // Borrar sección
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta sección?")) return;
    await deleteProductSection(id);
    setSections(await getProductSectionsConfig());
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Configuración: Secciones de Productos</h2>

      {/* Formulario Crear/Editar */}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: 12,
          marginBottom: 20,
          borderRadius: 4,
        }}
      >
        <h3>{editing ? "Editar sección" : "Nueva sección"}</h3>

        <div style={{ marginBottom: 8 }}>
          <label>Categoría:&nbsp;</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Máx. productos:&nbsp;</label>
          <input
            type="number"
            name="maxProducts"
            value={form.maxProducts}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Orden (posición):&nbsp;</label>
          <input
            type="number"
            name="position"
            value={form.position}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <button type="submit">
          {editing ? "Guardar cambios" : "Crear sección"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({
                id: null,
                categoryId: "",
                maxProducts: 8,
                position: 0,
              });
            }}
            style={{ marginLeft: 8 }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de secciones existentes */}
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Categoría</th>
            <th>Máx. Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sections
            .sort((a, b) => a.position - b.position)
            .map((sec) => {
              const cat = categories.find((c) => c.id === sec.categoryId);
              return (
                <tr key={sec.id}>
                  <td>{sec.position}</td>
                  <td>{cat ? cat.name : "(sin nombre)"}</td>
                  <td>{sec.maxProducts}</td>
                  <td>
                    <button onClick={() => startEdit(sec)}>✏️ Editar</button>
                    <button
                      onClick={() => handleDelete(sec.id)}
                      style={{ marginLeft: 8 }}
                    >
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductSections;
