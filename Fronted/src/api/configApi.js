<<<<<<< HEAD
// src/api/configApi.js
import axios from "axios";
import { getHeaders } from "./constant";

const BASE_URL = "http://localhost:9090/api/admin/config";

export const getProductSectionsConfig = async () => {
  const { data } = await axios.get(`${BASE_URL}/product-sections`, {
    headers: getHeaders(),
  });
  return data; // [{ id, categoryId, maxProducts, position }]
=======
import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const getProductSectionsConfig = async () => {
  const { data } = await axios.get(
    `${API_BASE_URL}/api/admin/config/product-sections`,
    {
      headers: getHeaders(),
    }
  );
  return data;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
};

export const createProductSection = async (section) => {
  try {
    const response = await axios.post(
<<<<<<< HEAD
      `${BASE_URL}/product-sections/new`,
=======
      `${API_BASE_URL}/api/admin/config/product-sections/new`,
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      section,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la sección de producto", error);
    throw error;
  }
};

export const updateProductSection = async (id, section) => {
  try {
    const response = await axios.put(
<<<<<<< HEAD
      `${BASE_URL}/product-sections/update/${id}`,
=======
      `${API_BASE_URL}/api/admin/config/product-sections/update/${id}`,
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      section,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar la sección de producto", error);
    throw error;
  }
};

export const deleteProductSection = async (id) => {
<<<<<<< HEAD
  await axios.delete(`${BASE_URL}/product-sections/delete/${id}`, {
    headers: getHeaders(),
  });
=======
  await axios.delete(
    `${API_BASE_URL}/api/admin/config/product-sections/delete/${id}`,
    {
      headers: getHeaders(),
    }
  );
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
};
