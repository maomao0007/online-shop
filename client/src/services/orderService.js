import API from "./api";

export const getOrder = () => API.get("/orders");

export const addToOrder = (cart) => API.post("/orders", {cart});
