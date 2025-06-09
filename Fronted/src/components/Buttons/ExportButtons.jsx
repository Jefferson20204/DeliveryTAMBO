import axios from "axios";
import { API_BASE_URL } from "../../api/constant";

const ExportButtons = () => {
  const handleExport = async (type) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/export/all-orders/${type}`,
        {
          responseType: "blob", // Importante para descargar archivos
        }
      );

      // Crear enlace temporal para descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Reporte de pedidos.${
          type === "excel" ? "xlsx" : type === "pdf" ? "pdf" : "text"
        }`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Error al exportar");
    }
  };

  return (
    <div>
      <button onClick={() => handleExport("excel")}>
        Exportar todos los pedidos en Excel
      </button>
    </div>
  );
};

export default ExportButtons;
