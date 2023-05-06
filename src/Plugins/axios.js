import axios from "axios";
import { BASE_URL } from "../Config";

axios.interceptors.request.use(
  async (config) => {
    config.baseURL = BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    const code = response.data.code || 0;

    return response;
  },
  async (error) => {
    console.log(JSON.stringify(error));

    const resp = error.response ?? {};
    const respData = resp.data ?? {};

    const dataError = {
      code: false,
      data: null,
      message: respData.message ?? "Terjadi Kesalahan pada sistem",
    };

    if (respData.errors) {
      dataError.errors = respData.errors;
    }

    if (respData.bodyString) {
      dataError.bodyString = respData.bodyString;
    }
    return Promise.reject(dataError);
  }
);

export async function get(url, config) {
  return await axios
    .get(url, {
      ...config,
    })
    .then((response) => response.data);
}

export async function post(url, formData, config = {}) {
  return await axios
    .post(url, formData, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axios
    .delete(url, { ...config })
    .then((response) => response.data);
}

export async function put(url, formData, config = {}) {
  return await axios
    .put(url, formData, { ...config })
    .then((response) => response.data);
}
