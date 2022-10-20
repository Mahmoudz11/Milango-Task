import { combineReducers } from "redux";
import filterReucer from "./filterReucer";
import getDataReducer from "./getDataReducer";
import themeReducer from "./themeReducer";

const reducer = combineReducers({
    getDataReducer : getDataReducer,
    filterReucer : filterReucer,
    themeReducer : themeReducer
  })

export default reducer