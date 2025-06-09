import axios from "axios";
import { getHeaders } from "./constant";

const BASE_URL = "http://localhost:9090/api/products";

// Obtener todos los productos
export const getAllProducts = async (categoryId, typeId) => {
  try {
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (typeId) params.typeId = typeId;

    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    return [];
  }
};

// Obtener producto por slug
export const getProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto por slug", error);
    return null;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    console.log(productData);
    const response = await axios.post(BASE_URL, productData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear producto", error);
    return null;
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return null;
  }
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, productData, {
      headers: getHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error al actualizar producto:",
      error.response?.data || error
    );
    return null;
  }
};

//Admin
export const getAllProductsAdmin = async (categoryId, typeId) => {
  try {
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (typeId) params.typeId = typeId;

    const response = await axios.get("http://localhost:9090/admin/products", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    return [];
  }
};
