import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({ withCredentials: true, baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return config;
});

export default api;
