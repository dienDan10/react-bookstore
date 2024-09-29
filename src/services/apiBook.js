import axios from "../utils/axios-customize";

export async function getBooks({
  current,
  pageSize,
  title,
  author,
  category,
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

  if (title.trim()) {
    query += `&mainText=/${title}/i`;
  }

  if (author.trim()) {
    query += `&author=/${author}/i`;
  }

  if (category.trim()) {
    query += `&category=/${category}/i`;
  }

  if (sort) {
    query += `&sort=${direction === "ascend" ? "" : "-"}${sort}`;
  }
  const res = await axios.get(`/api/v1/book?${query}`);
  return res;
}

export async function getCategories() {
  const res = await axios.get("/api/v1/database/category");
  return res;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("fileImg", file);
  const res = await axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });

  return res;
}

export async function createBook({
  thumbnail,
  slider,
  title,
  author,
  price,
  sold,
  quantity,
  category,
}) {
  const res = await axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText: title,
    author,
    price,
    sold,
    quantity,
    category,
  });
  return res;
}

export async function updateBook({
  thumbnail,
  slider,
  title,
  author,
  price,
  sold,
  quantity,
  category,
  id,
}) {
  const res = await axios.put(`/api/v1/book/${id}`, {
    thumbnail,
    slider,
    mainText: title,
    author,
    price,
    sold,
    quantity,
    category,
  });
  return res;
}

export async function deleteBook(id) {
  const res = await axios.delete("/api/v1/book/" + id);
  return res;
}
