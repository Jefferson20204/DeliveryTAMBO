import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const fetchUserDetails = async () => {
  const url = API_BASE_URL + "/api/user/profile";

  try {
    const response = await axios(url, {
      method: "GET",
      headers: getHeaders(),
    });

    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (user) => {
  const url = API_BASE_URL + "/api/user/update";

  try {
    const response = await axios.put(url, user, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la marca", error);
    throw error;
  }
};

export const fetchUserAddress = async () => {
  const url = API_BASE_URL + "/api/user/getMyAddressses";

  try {
    const response = await axios(url, {
      method: "GET",
      headers: getHeaders(),
    });

    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addAddressAPI = async (data) => {
  const url = API_BASE_URL + "/api/address";
  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteAddressAPI = async (id) => {
  const url = API_BASE_URL + `/api/address/${id}`;
  try {
    const response = await axios(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchOrderAPI = async () => {
  const url = API_BASE_URL + `/api/order/user`;
  try {
    const response = await axios(url, {
      method: "GET",
      headers: getHeaders(),
    });
    return response?.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const cancellingOrderAPI = async (orderId) => {
  const url = API_BASE_URL + "/api/user/cancelMyOrder";
  try {
    const response = await axios(url, {
      method: "POST",
      data: orderId.toString(), // Asegúrate de convertirlo a string
      headers: {
        ...getHeaders(),
        "Content-Type": "text/plain", // Especifica que envías texto plano
      },
    });
    return response?.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Error al cancelar el pedido"
    );
  }
};
