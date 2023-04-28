import { combineReducers } from "redux";
import authReducer from "./auth";

import { authApi, rolesApi, } from "@services/index";

const rootReducer = combineReducers({  
  [authApi.reducerPath]: authApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  auth: authReducer,
});

export default rootReducer;
