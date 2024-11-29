import { apiSlice } from "@/app/api/apiSlice";
import { logout } from "../auth/authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserById: builder.query({
			query: (id) => `/user/${id}`,
			keepUnusedDataFor: 0,
		}),
		deleteUser: builder.mutation({
			query: ({ id, password }) => ({
				url: `/user/${id}/${password}`,
				method: "DELETE",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logout());
					dispatch(apiSlice.util.resetApiState());
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useGetUserByIdQuery, useDeleteUserMutation } = usersApiSlice;
