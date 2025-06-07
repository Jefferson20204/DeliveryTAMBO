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

// Actualizar datos del usuario
export const updateUser = async (user) => {
  const url = API_BASE_URL + "/api/user/update";

  try {
    const response = await axios.put(url, user, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la marca", error);
    throw error;
  }
};

export const fetchUserAddress = async () => {
  // Construye la URL del endpoint de perfil de usuario
  const url = API_BASE_URL + "/api/address";

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

export const addAddressAPI = async (data) => {
  const url = API_BASE_URL + "/api/address";
  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteAddressAPI = async (id) => {
  const url = API_BASE_URL + `/api/address/${id}`;
  try {
    const response = await axios(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};
