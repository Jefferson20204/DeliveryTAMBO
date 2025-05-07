// Importa la función para obtener el token JWT desde el almacenamiento local o cookies
import { getToken } from "../utils/jwt-helper";

// URL base del backend (API REST desarrollada con Spring Boot)
export const API_BASE_URL = "http://localhost:9090";

// Función para obtener los encabezados HTTP con autorización JWT
// Se usa para realizar peticiones autenticadas al backend
export const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`, // Añade el token JWT al header Authorization
  };
};
