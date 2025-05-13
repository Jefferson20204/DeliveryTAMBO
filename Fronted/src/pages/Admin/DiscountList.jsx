import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDiscounts } from "../../api/discountApi";

export default function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const data = await getAllDiscounts();
      setDiscounts(data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  return (
    <div>
      <h2>Listado de Descuentos</h2>
      <button onClick={() => navigate("/admin/discounts/new")}>
        Agregar Descuento
      </button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Porcentaje</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Activo</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.percentage.toFixed(2)}%</td>
              <td>{new Date(d.startDate).toLocaleDateString()}</td>
              <td>{new Date(d.endDate).toLocaleDateString()}</td>
              <td>{d.isActive ? "Sí" : "No"}</td>
              <td>{d.products.length}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/discounts/edit/${d.id}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
