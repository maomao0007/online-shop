import API from "./api";

export const register = (email, password) =>
  API.post("/register", { email, password });

export const login = (email, password) =>
  API.post("/login", { email, password });

export const getCurrentUser = () => API.get("/me");

export const getProfile = () => API.get("/profile");

export const logout = () => API.post("/logout");
