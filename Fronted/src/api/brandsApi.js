import axios from "axios";
<<<<<<< HEAD
import { getHeaders } from "./constant";

const BRAND_BASE_URL = "http://localhost:9090/api/brands";
=======
import { API_BASE_URL, getHeaders } from "./constant";
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

// Obtener todas las marcas
export const getAllBrands = async () => {
  try {
<<<<<<< HEAD
    const response = await axios.get(BRAND_BASE_URL, {
=======
    const response = await axios.get(`${API_BASE_URL}/api/brands`, {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
    const response = await axios.get(`${BRAND_BASE_URL}/${id}`, {
=======
    const response = await axios.get(`${API_BASE_URL}/api/brands/${id}`, {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
    const response = await axios.post(BRAND_BASE_URL, brand, {
=======
    const response = await axios.post(`${API_BASE_URL}/api/brands`, brand, {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
    const response = await axios.put(`${BRAND_BASE_URL}/${id}`, brand, {
      headers: getHeaders(),
    });
=======
    const response = await axios.put(
      `${API_BASE_URL}/api/brands/${id}`,
      brand,
      {
        headers: getHeaders(),
      }
    );
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la marca", error);
    throw error;
  }
};

// Eliminar una marca
export const deleteBrand = async (id) => {
  try {
<<<<<<< HEAD
    const response = await axios.delete(`${BRAND_BASE_URL}/${id}`, {
=======
    const response = await axios.delete(`${API_BASE_URL}/api/brands/${id}`, {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la marca", error);
    throw error;
  }
};
