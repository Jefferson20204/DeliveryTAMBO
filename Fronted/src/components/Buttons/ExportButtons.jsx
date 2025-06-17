import axios from "axios";
import { API_BASE_URL, getHeaders } from "../../api/constant";

const ExportButtons = ({ className, type = "excel", urlApi = "" }) => {
  const handleExport = async ({ type, urlApi }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/export/${urlApi}/${type}`,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            ...getHeaders(),
          },
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
    <a
      className={className}
      onClick={() => handleExport({ type: type, urlApi: urlApi })}
    >
      Exportar en {type}
    </a>
  );
};

export default ExportButtons;
