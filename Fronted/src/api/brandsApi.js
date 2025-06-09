import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

// Obtener todas las marcas
export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/brands`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener marcas", error);
    return [];
  }
};

// Obtener una marca por ID
export const getBrandById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/brands/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la marca", error);
    throw error;
  }
};

// Crear una nueva marca
export const createBrand = async (brand) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/brands`, brand, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la marca", error);
    throw error;
  }
};

// Actualizar una marca existente
export const updateBrand = async (id, brand) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/brands/${id}`,
      brand,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la marca", error);
    throw error;
  }
};

// Eliminar una marca
export const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/brands/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la marca", error);
    throw error;
  }
};
