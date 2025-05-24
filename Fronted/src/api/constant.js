import { getToken } from "../utils/jwt-helper";

// URL base del backend (API REST desarrollada con Spring Boot)
export const API_BASE_URL = "http://localhost:9090";

// Devuelve los encabezados necesarios para la autenticación
export const getHeaders = () => {
  const token = getToken(); // Obtén el token del localStorage
  if (!token) {
    throw new Error("Token no encontrado. Usuario no autenticado.");
  }

  return {
    Authorization: `Bearer ${token}`, // Añade el token JWT al header Authorization
  };
};
