import axios from "../utils/axios-customize";

export async function register({ fullName, email, password, phone }) {
  const res = await axios.post(`/api/v1/user/register`, {
    fullName,
    email,
    password,
    phone,
  });

  return res;
}

export async function login({ username, password }) {
  const res = await axios.post("/api/v1/auth/login", { username, password });
  return res;
}

export async function logout() {
  const res = await axios.post("api/v1/auth/logout");
  return res;
}

export async function getAccount() {
  const res = await axios.get("/api/v1/auth/account");
  return res;
}
