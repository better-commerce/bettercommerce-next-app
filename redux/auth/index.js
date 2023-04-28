import { createSlice } from "@reduxjs/toolkit";
import getAuthToken from "@helpers/get-auth-token";
import getNavTree from "@helpers/get-nav-tree";
import getToken from "@helpers/get-token";
import getUser from "@helpers/get-user";
import { encrypt } from "@utils/cipher";
import { API_TOKEN, AUTH_TOKEN, NAV_TREE, TOKEN_INFO } from "@utils/constants";

const INITIAL_STATE = {
  user: getUser(),
  token: getToken(),
  authToken: getAuthToken(),
  navTree: getNavTree(),
  domainId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(API_TOKEN, encrypt(JSON.stringify(action.payload)));
      }
    },
    setTokens(state, action) {
      state.token = action.payload.apiToken;
      state.authToken = action.payload.authToken;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(API_TOKEN, encrypt(JSON.stringify(action.payload.apiToken)));
        localStorage.setItem(AUTH_TOKEN, encrypt(JSON.stringify(action.payload.authToken)));
      }
    },
    setUser(state, action) {
      state.user = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(TOKEN_INFO, encrypt(JSON.stringify(action.payload)));
      }
    },
    setNavTree(state, action) {
      state.navTree = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(NAV_TREE, encrypt(JSON.stringify(action.payload)));
      }
    },
    setDomainId(state, action) {
      state.domainId = action.payload;
    },
    resetUser(state) {
      state.token = null;
      state.authToken = null;
      state.user = null;
      state.domainId = null;
      localStorage.removeItem(API_TOKEN);
      localStorage.removeItem(AUTH_TOKEN);
    },
  },
});

const { actions, reducer } = authSlice;
export const { setToken, setTokens, setUser, setNavTree, setDomainId, resetUser } = actions;
export default reducer;