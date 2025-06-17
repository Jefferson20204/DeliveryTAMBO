import axios from "axios";
<<<<<<< HEAD
import { API_BASE_URL } from "../../api/constant";

const ExportButtons = () => {
  const handleExport = async (type) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/export/all-orders/${type}`,
        {
          responseType: "blob", // Importante para descargar archivos
=======
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
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
        }
      );

      // Crear enlace temporal para descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
<<<<<<< HEAD
        `Reporte de pedidos.${
          type === "excel" ? "xlsx" : type === "pdf" ? "pdf" : "text"
        }`
=======
        `Reporte.${type === "excel" ? "xlsx" : type === "pdf" ? "pdf" : "text"}`
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
    <div>
      <button onClick={() => handleExport("excel")}>
        Exportar todos los pedidos en Excel
      </button>
    </div>
=======
    <a
      className={className}
      onClick={() => handleExport({ type: type, urlApi: urlApi })}
    >
      Exportar en {type}
    </a>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
  );
};

export default ExportButtons;
