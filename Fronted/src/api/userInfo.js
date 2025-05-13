import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

/**
 * Obtiene los detalles del perfil del usuario desde la API.
 * Utiliza Axios para hacer una petición GET al endpoint correspondiente.
 *
 * @returns {Promise<Object>} Los datos del perfil del usuario.
 * @throws {Error} Lanza un error si la petición falla.
 */
export const fetchUserDetails = async () => {
  // Construye la URL del endpoint de perfil de usuario
  const url = API_BASE_URL + "/api/user/profile";

  try {
    // Realiza la solicitud GET usando Axios con los headers configurados
    const response = await axios(url, {
      method: "GET",
      headers: getHeaders(), // Función que retorna los encabezados necesarios (como token de autenticación)
    });

    // Retorna los datos contenidos en la respuesta
    return response?.data;
  } catch (err) {
    // Lanza un error personalizado si ocurre una excepción durante la solicitud
    throw new Error(err);
  }
};
