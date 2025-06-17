import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/category`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías", error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/category/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/category`,
      category,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/category/${id}`,
      category,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};
