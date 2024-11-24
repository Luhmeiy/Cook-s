import { apiSlice } from "@/app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserById: builder.query({
			query: (id) => `/user/${id}`,
			keepUnusedDataFor: 0,
		}),
	}),
});

export const { useGetUserByIdQuery } = usersApiSlice;
