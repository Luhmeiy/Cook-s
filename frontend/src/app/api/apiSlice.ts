import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BACKEND_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;

			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}

			return headers;
		},
		credentials: "include",
	}),
	tagTypes: ["User", "Recipes"],
	endpoints: () => ({}),
});
