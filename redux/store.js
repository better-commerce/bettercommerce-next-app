import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "@redux/root.reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authApi, rolesApi, } from "@services/index";
import { useDispatch, useSelector } from "react-redux";

const middleware = [
  thunk,
  authApi.middleware,
  rolesApi.middleware,
];

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const store = () => createStore(rootReducer, bindMiddleware(middleware));
//export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch();
export const useTypedSelector = useSelector;
export const wrapper = createWrapper(store);
