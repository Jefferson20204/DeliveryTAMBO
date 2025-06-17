import axios from "axios";
<<<<<<< HEAD
import { getHeaders } from "./constant";

const CATEGORY_BASE_URL = "http://localhost:9090/api/category";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_BASE_URL, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
=======
import { API_BASE_URL, getHeaders } from "./constant";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/category`, {
      headers: getHeaders(),
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías", error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
<<<<<<< HEAD
    const response = await axios.get(`${CATEGORY_BASE_URL}/${id}`, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
=======
    const response = await axios.get(`${API_BASE_URL}/api/category/${id}`, {
      headers: getHeaders(),
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
<<<<<<< HEAD
    const response = await axios.post(CATEGORY_BASE_URL, category, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
=======
    const response = await axios.post(
      `${API_BASE_URL}/api/category`,
      category,
      {
        headers: getHeaders(),
      }
    );
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
<<<<<<< HEAD
    const response = await axios.put(`${CATEGORY_BASE_URL}/${id}`, category, {
      headers: getHeaders(), // Añadir los encabezados con el token JWT
    });
=======
    const response = await axios.put(
      `${API_BASE_URL}/api/category/${id}`,
      category,
      {
        headers: getHeaders(),
      }
    );
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};
