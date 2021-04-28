import http from "../http-common";

const getAll = (pageNumber) => {
  return http.get("/users?page=" + pageNumber);
};

const get = id => {

  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/create", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/Products`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
