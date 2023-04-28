import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import {
    AUTHORIZATION_HEADER,    
    RTK_API_BASE_URL,    
} from "@utils/constants";

export const rolesApi = createApi({
    reducerPath: "rolesApi",
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
    tagTypes: ["Roles"],
    endpoints: (builder) => ({
        getAllRoles: builder.query({
            query: () => ({
                url: `role`,
            }),
            providesTags: [{ type: "Roles" }],
        }),
    }),
});

export const {
    useGetAllRolesQuery,
} = rolesApi;