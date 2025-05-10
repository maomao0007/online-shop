import API from "./api";

export const getCart = () => API.get("/cart");

export const addToCart = ({ product_id, quantity }) =>
  API.post("/cart", { product_id, quantity });

export const updateCartItem = (cartItemId, newQuantity) =>
  API.put(`/cart/${cartItemId}`, { quantity: newQuantity });

export const deleteCartItem = (cartItemId) =>
  API.delete(`/cart/${cartItemId}`);

export const clearCart = () => API.delete("/cart/clear");
