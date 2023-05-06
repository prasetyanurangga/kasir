import { del, get, post, put } from "../Plugins/axios";

const getAll = () => get(`/food_menu`);

const getById = (id) => {
  return get(`/food_menu/${id}`);
};
const remove = (id) => del(`/food_menu/${id}`);

const add = (formData, isFormData = false) => {
  return post(`/food_menu`, formData, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

const update = (id, formData, isFormData = false) => {
  return put(`/food_menu/${id}`, formData, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

export { getAll, getById, remove, add, update };
