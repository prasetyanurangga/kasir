import {
  CREATE_FOOD_MENU,
  DELETE_FOOD_MENU,
  GET_DETAIL_FOOD_MENU,
  GET_FOOD_MENU,
  INIT,
  UPDATE_FOOD_MENU,
} from "../types";

const initialState = {
  type: "init",
  status: {
    success: false,
    message: null,
  },
  loading: false,
  data: [],
  detail: {},
};

const foodMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        loading: true,
      };
    case GET_FOOD_MENU:
      return {
        ...state,
        status: { ...state.status, ...action.payload.status },
        type: "get",
        data: action.payload.data,
        loading: action.payload.loading,
      };
    case GET_DETAIL_FOOD_MENU:
      return {
        ...state,
        status: { ...state.status, ...action.payload.status },
        type: "get_detail",
        detail: action.payload.data,
      };
    case CREATE_FOOD_MENU:
      return {
        ...state,
        status: { ...state.status, ...action.payload.status },
        type: "insert",
      };
    case UPDATE_FOOD_MENU:
      return {
        ...state,
        status: { ...state.status, ...action.payload.status },
        type: "update",
      };
    case DELETE_FOOD_MENU:
      return {
        ...state,
        status: { ...state.status, ...action.payload.status },
        type: "delete",
      };
    default:
      return state;
  }
};

export default foodMenuReducer;
