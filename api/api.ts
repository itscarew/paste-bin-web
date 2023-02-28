import axios from "axios";

export const PasteApi = axios.create({
  baseURL: "https://olas-paste-bin.onrender.com/pasteBin",
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
