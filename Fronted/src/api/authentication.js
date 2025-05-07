import axios from "axios";
import { API_BASE_URL } from "./constant";

/**
 * Iniciar sesión del usuario
 * @param {Object} body - Objeto con email y password
 * @returns {Object} - Datos de la respuesta (token, usuario, etc.)
 */
export const loginAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/login";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    return response?.data;
  } catch (err) {
    // Si el backend devuelve un mensaje de error, lo lanzamos
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      // Sino, lanzamos el error general
      throw err;
    }
  }
};

/**
 * Registrar un nuevo usuario
 * @param {Object} body - Objeto con datos de registro (nombre, email, password, etc.)
 * @returns {Object} - Datos de la respuesta
 */
export const registerAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/register";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

/**
 * Verificar código enviado al correo electrónico (registro o recuperación)
 * @param {Object} body - Objeto con email y código de verificación
 * @returns {Object} - Resultado de la verificación
 */
export const verifyAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/verify";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

/**
 * Enviar correo para restablecer contraseña
 * @param {string} email - Email del usuario que olvidó su contraseña
 * @returns {Object} - Mensaje de éxito o error
 */
export const sendResetPasswordEmailAPI = async (email) => {
  const url = API_BASE_URL + "/api/auth/forgot-password";
  try {
    const response = await axios(url, {
      method: "POST",
      data: { email },
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

/**
 * Restablecer contraseña con token recibido por correo
 * @param {string} token - Token de verificación recibido por email
 * @param {string} newPassword - Nueva contraseña elegida por el usuario
 * @returns {Object} - Resultado del restablecimiento
 */
export const resetPasswordAPI = async (token, newPassword) => {
  const url = API_BASE_URL + "/api/auth/reset-password";
  try {
    const response = await axios(url, {
      method: "POST",
      data: {
        token,
        newPassword,
      },
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};
