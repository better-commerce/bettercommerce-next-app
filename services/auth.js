import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { resetUser, setNavTree, setToken, setUser } from "@redux/auth";
import { AUTHORIZATION_HEADER, LOGIN_URL, METHOD_POST, NAV_TREE_URL, RTK_API_BASE_URL, VALIDATE_TOKEN_URL } from "@utils/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RTK_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set(AUTHORIZATION_HEADER, token);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload.api;
    }
  },
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ payload }) => ({
        url: LOGIN_URL,
        method: METHOD_POST,
        body: payload,
      }),
      async onQueryStarted(
        { onSuccessFn = () => { }, onErrorFn = () => { } },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          // removed after the api will throw 401 on wrong credentials
          if (data.apiToken) {
            dispatch(setToken(data.apiToken));
            onSuccessFn(data);
          }
        } catch (err) {
          onErrorFn();
        }
      },
    }),
    validateToken: builder.mutation({
      query: ({ payload }) => ({
        url: VALIDATE_TOKEN_URL,
        method: METHOD_POST,
        body: {
          token: payload,
        },
      }),
      async onQueryStarted(
        { onSuccessFn = () => { }, onErrorFn = () => { } },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
          onSuccessFn(data);
        } catch (err) {
          const { status } = err.error;
          if (status === 401) {
            dispatch(resetUser());
          }
          onErrorFn();
        }
      },
    }),
    navTree: builder.mutation({
      query: ({ payload }) => ({
        url: NAV_TREE_URL,
        method: METHOD_POST,
        body: payload,
      }),
      async onQueryStarted(
        { onSuccessFn = () => { }, onErrorFn = () => { } },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          // removed after the api will throw 401 on wrong credentials
          dispatch(setNavTree(data));
          onSuccessFn(data);
        } catch (err) {
          onErrorFn();
        }
      },
    }),
  }),
});

export const { useLoginMutation, useValidateTokenMutation, useNavTreeMutation } = authApi;
