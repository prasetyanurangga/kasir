import {
  add,
  getAll,
  getById,
  remove,
  update,
} from "../../Factory/FoodFactory";
import {
  CREATE_FOOD_MENU,
  DELETE_FOOD_MENU,
  GET_DETAIL_FOOD_MENU,
  GET_FOOD_MENU,
  INIT,
  UPDATE_FOOD_MENU,
} from "../types";

export const getFoodMenu = () => (dispatch) => {
  dispatch({ type: INIT });
  getAll()
    .then((ress) => {
      const { data: response } = ress;
      dispatch({
        type: GET_FOOD_MENU,
        payload: {
          status: {
            success: true,
            message: "Data Food Menu Berhasil Diambil",
          },
          data: response || [],
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_FOOD_MENU,
        payload: {
          status: {
            success: false,
            message: "Data Food Menu Gagal Diambil",
          },
          data: [],
        },
      });
    });
};

export const getFoodMenuById = (id) => (dispatch) => {
  dispatch({ type: INIT });
  getById(id)
    .then((ress) => {
      const { data: response } = ress;
      dispatch({
        type: GET_DETAIL_FOOD_MENU,
        payload: {
          status: {
            success: true,
            message: "Data Food Menu Berhasil Diambil",
          },
          data: response || [],
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_DETAIL_FOOD_MENU,
        payload: {
          status: {
            success: false,
            message: "Data Food Menu Gagal Diambil",
          },
          data: [],
        },
      });
    });
};

export const removeFoodMenuById = (id) => (dispatch) => {
  dispatch({ type: INIT });
  remove(id)
    .then((ress) => {
      const { data: response } = ress;
      dispatch({
        type: DELETE_FOOD_MENU,
        payload: {
          status: {
            success: true,
            message: "Data Food Menu Berhasil Dihapus",
          },
          data: response || [],
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_FOOD_MENU,
        payload: {
          status: {
            success: false,
            message: "Data Food Menu Gagal Dihapus",
          },
          data: [],
        },
      });
    });
};

export const addFoodMenu = (body) => (dispatch) => {
  dispatch({ type: INIT });
  add(body, true)
    .then((_) => {
      dispatch({
        type: CREATE_FOOD_MENU,
        payload: {
          status: {
            success: true,
            message: "Data Food Menu Berhasil Ditambah",
          },
          loading: false,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_FOOD_MENU,
        payload: {
          status: {
            success: false,
            message: "Data Food Menu Gagal Ditambah",
          },
          loading: false,
        },
      });
    });
};

export const updateFoodMenu = (index, body) => (dispatch) => {
  dispatch({ type: INIT });
  update(index, body, true)
    .then((_) => {
      dispatch({
        type: UPDATE_FOOD_MENU,
        payload: {
          status: {
            success: true,
            message: "Data Food Menu Berhasil Diubah",
          },
          loading: false,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_FOOD_MENU,
        payload: {
          status: {
            success: false,
            message: "Data Food Menu Gagal Diubah",
          },
          loading: false,
        },
      });
    });
};
