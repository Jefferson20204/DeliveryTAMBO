import axios from "axios";
import { API_BASE_URL } from "../../api/constant";

const ExportButtons = () => {
  const handleExport = async ({ type, urlApi }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/export/${urlApi}/${type}`,
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
        `Reporte.${type === "excel" ? "xlsx" : type === "pdf" ? "pdf" : "text"}`
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
      <button
        onClick={() => handleExport({ type: "excel", urlApi: "all-orders" })}
      >
        Exportar todos los pedidos en Excel
      </button>
      <button
        onClick={() => handleExport({ type: "excel", urlApi: "all-products" })}
      >
        Exportar todos los productos en Excel
      </button>
    </div>
  );
};

export default ExportButtons;
