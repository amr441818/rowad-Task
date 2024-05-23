"use server";

import { fetcfAllProducts } from "../api/axiosApi/products";

export async function fetchProductsServerAction() {
  const data = await fetcfAllProducts();
  return data;
}
