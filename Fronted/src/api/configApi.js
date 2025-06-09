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
};

export const createProductSection = async (section) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/config/product-sections/new`,
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
      `${API_BASE_URL}/api/admin/config/product-sections/update/${id}`,
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
  await axios.delete(
    `${API_BASE_URL}/api/admin/config/product-sections/delete/${id}`,
    {
      headers: getHeaders(),
    }
  );
};
