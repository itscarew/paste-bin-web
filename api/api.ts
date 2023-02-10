import axios from "axios";

export const PasteApi = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
  },
});

PasteApi.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
