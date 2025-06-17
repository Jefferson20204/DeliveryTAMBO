import { getHeaders } from "./constant";

const BASE_URL = "http://localhost:9090/api/discounts";

// Obtener todos los descuentos
export const getAllDiscounts = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
<<<<<<< HEAD
=======
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    });

    if (!response.ok) throw new Error("Error al obtener descuentos");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener descuentos:", error);
    return [];
  }
};

// Obtener un descuento por ID
export const getDiscountById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
<<<<<<< HEAD
=======
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    });

    if (!response.ok)
      throw new Error(`Error al obtener descuento con id ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener descuento con id ${id}:`, error);
    return null;
  }
};

// Crear un nuevo descuento
export const createDiscount = async (discount) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify(discount),
    });

    if (!response.ok) throw new Error("Error al crear descuento");
    return await response.json();
  } catch (error) {
    console.error("Error al crear descuento:", error);
    return null;
  }
};

// Actualizar un descuento existente
export const updateDiscount = async (id, discount) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify(discount),
    });

    if (!response.ok) throw new Error("Error al actualizar descuento");
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar descuento:", error);
    return null;
  }
};

// Eliminar un descuento
export const deleteDiscount = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) throw new Error("Error al eliminar descuento");
    return true;
  } catch (error) {
    console.error("Error al eliminar descuento:", error);
    return false;
  }
};
