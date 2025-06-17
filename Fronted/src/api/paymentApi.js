import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const confirmPayPalPayment = async (orderId, paypalOrderId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/payment/paypal/confirm-payment`,
      { orderId, paypalOrderId },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al confirmar pago", error);
    return null;
  }
};
