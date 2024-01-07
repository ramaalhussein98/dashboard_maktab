import axios from "axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const lang = i18next.language;

export const myAxios = axios.create({
  baseURL: "https://dashboard.maktab.sa/",
});

myAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  config.headers.apiKey = "3YMh-YqHw-x6xY-G1n4-UtsW-lFVm";
  config.headers.lang = lang;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default myAxios;
