import { jwtDecode } from "jwt-decode";

// Verifica si el token es válido y no está expirado
export const isTokenValid = () => {
  const token = localStorage.getItem("authToken"); // Obtiene el token almacenado
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // Decodifica el token
    const currentTime = Date.now() / 1000; // Hora actual en segundos

    // Comprueba si la expiración del token (exp) es mayor que el tiempo actual
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token", error); // En caso de error de decodificación
    return false;
  }
};

// Guarda el token en localStorage
export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Elimina el token (logout)
export const logOut = () => {
  localStorage.removeItem("authToken");
};

// Devuelve el token almacenado en localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};
