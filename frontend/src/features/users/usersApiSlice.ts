import { apiSlice } from "@/app/api/apiSlice";
import { logout } from "../auth/authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserById: builder.query({
			query: ({ id, userId }) => `/user/${id}/${userId}`,
			keepUnusedDataFor: 0,
			providesTags: ["UserById"],
		}),
		patchUser: builder.mutation({
			query: ({ id, data }) => ({
				url: `/user/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["User", "UserById"],
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

export const {
	useGetUserByIdQuery,
	usePatchUserMutation,
	useDeleteUserMutation,
} = usersApiSlice;
