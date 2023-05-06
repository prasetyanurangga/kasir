import { combineReducers } from "redux";
import foodMenuReducer from "./foodMenuReducers";

export default combineReducers({
  foodMenu: foodMenuReducer,
});
