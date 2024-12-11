import { apiSlice } from "@/app/api/apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		refresh: builder.query({
			query: () => "/auth/refresh",
			providesTags: ["User"],
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "/auth",
				method: "POST",
				body: { ...credentials },
			}),
			invalidatesTags: ["User"],
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/register",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		verifyEmail: builder.mutation({
			query: (credentials) => ({
				url: "/auth/verify-email",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		changePassword: builder.mutation({
			query: (credentials) => ({
				url: "/auth/change-password",
				method: "POST",
				body: { ...credentials },
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
		forgotPassword: builder.mutation({
			query: (credentials) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		resetPassword: builder.mutation({
			query: (credentials) => ({
				url: "/auth/reset-password",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
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
	useRefreshQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyEmailMutation,
	useChangePasswordMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useSendLogoutMutation,
} = authApiSlice;
