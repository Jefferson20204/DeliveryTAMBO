import axios from "axios";
import { getHeaders } from "./constant";

const CATEGORY_BASE_URL = "http://localhost:9090/api/category";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_BASE_URL, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías", error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${CATEGORY_BASE_URL}/${id}`, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(CATEGORY_BASE_URL, category, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${CATEGORY_BASE_URL}/${id}`, category, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};
