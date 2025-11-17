import api from "./api";

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
