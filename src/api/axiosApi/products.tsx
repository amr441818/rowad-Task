import axios from "axios";

const Api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

Api.interceptors.request.use((req) => {
  return req;
});

export const fetcfAllProducts = () => Api.get(`/products`);
