import api from "./api";

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });

  const token = res.data?.token || null;

  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
  }

  return { ...res.data, token }; // tetap kembalikan token walau null
};
