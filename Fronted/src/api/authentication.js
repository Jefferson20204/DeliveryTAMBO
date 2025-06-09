import axios from "axios";
import { API_BASE_URL } from "./constant";

export const loginAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/login";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    console.log("response", response);

    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log("error", err.response.data);
      throw err.response.data;
    } else {
      console.log("err", err);
      throw err;
    }
  }
};

export const registerAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/register";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

export const verifyAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/verify";
  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

export const sendResetPasswordEmailAPI = async (email) => {
  const url = API_BASE_URL + "/api/auth/forgot-password";
  try {
    const response = await axios(url, {
      method: "POST",
      data: { email },
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

export const resetPasswordAPI = async (token, newPassword) => {
  const url = API_BASE_URL + "/api/auth/reset-password";
  try {
    const response = await axios(url, {
      method: "POST",
      data: {
        token,
        newPassword,
      },
    });
    return response?.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};
