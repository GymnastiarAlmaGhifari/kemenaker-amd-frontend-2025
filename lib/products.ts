/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


export const fetchProducts = async () => {
  const res = await axios.get("/api/products");
  console.log("Products API response:", res.data);
  return res.data;
};
export const addProduct = async (data: any) => {
  const res = await axios.post("/api/products", data);
  return res.data;
};

export const updateProduct = async (id: number, data: any) => {
  const res = await axios.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`/api/products/${id}`);
  return res.data;
};
