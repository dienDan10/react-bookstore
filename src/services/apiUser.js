import axios from "../utils/axios-customize";

export async function getUsers({
  current,
  pageSize,
  fullName,
  email,
  phone,
  sort,
  direction,
}) {
  let query = "";
  if (current) {
    query += `current=${current}`;
  }

  if (pageSize) {
    query += `&pageSize=${pageSize}`;
  }

  if (fullName.trim()) {
    query += `&fullName=/${fullName}/i`;
  }

  if (email.trim()) {
    query += `&email=/${email}/i`;
  }

  if (phone.trim()) {
    query += `&phone=/${phone}/i`;
  }

  if (sort) {
    query += `&sort=${direction === "ascend" ? "" : "-"}${sort}`;
  }
  const res = await axios.get(`/api/v1/user?${query}`);
  return res;
}

export async function addUser({ fullName, password, email, phone }) {
  const res = await axios.post("/api/v1/user", {
    fullName,
    password,
    email,
    phone,
  });
  return res;
}

export async function addUserBulk(data) {
  const res = await axios.post("/api/v1/user/bulk-create", data);
  return res;
}

export async function updateUser({ _id, fullName, phone, email }) {
  const res = await axios.put("/api/v1/user", { _id, fullName, phone, email });
  return res;
}

export async function deleteUser(id) {
  const res = await axios.delete("api/v1/user/" + id);
  return res;
}
