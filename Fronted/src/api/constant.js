import { getToken } from "../utils/jwt-helper";

// URL del backend
export const API_BASE_URL = "http://localhost:9090";

// Devuelve los encabezados necesarios para la autenticación
export const getHeaders = () => {
  const token = getToken();
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};
