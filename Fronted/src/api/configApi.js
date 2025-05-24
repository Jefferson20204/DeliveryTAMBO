// src/api/configApi.js
import axios from "axios";
import { getHeaders } from "./constant";

const BASE_URL = "http://localhost:9090/api/admin/config";

export const getProductSectionsConfig = async () => {
  const { data } = await axios.get(`${BASE_URL}/product-sections`, {
    headers: getHeaders(),
  });
  return data; // [{ id, categoryId, maxProducts, position }]
};

export const createProductSection = async (section) => {
  try {
    const response = await axios.post(`${BASE_URL}/product-sections`, section, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría", error);
    throw error;
  }
};

export const updateProductSection = async (id, section) => {
  const { data } = await axios.put(
    `${BASE_URL}/product-sections/${id}`,
    section,
    { headers: getHeaders() }
  );
  return data;
};

export const deleteProductSection = async (id) => {
  await axios.delete(`${BASE_URL}/product-sections/${id}`, {
    headers: getHeaders(),
  });
};
