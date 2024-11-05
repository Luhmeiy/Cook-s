import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { authApiSlice } from "./authApiSlice";

interface InitialState {
	user: {
		_id: string;
		email: string;
		username: string;
		ingredientList: [
			{
				ingredient: string;
				quantity: number;
				unit: string;
			}
		];
		shoppingList: [
			{
				ingredient: string;
				quantity: number;
				unit: string;
				bought: boolean;
			}
		];
	} | null;
	token: string | null;
	loading: boolean;
	error: string | undefined;
}

const initialState: InitialState = {
	user: null,
	token: null,
	loading: true,
	error: undefined,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				(action) =>
					authApiSlice.endpoints.login.matchPending(action) ||
					authApiSlice.endpoints.refresh.matchPending(action),
				(state) => {
					state.loading = true;
				}
			)
			.addMatcher(
				(action) =>
					authApiSlice.endpoints.login.matchFulfilled(action) ||
					authApiSlice.endpoints.refresh.matchFulfilled(action),
				(state, action) => {
					const { user, accessToken } = action.payload;

					state.user = user;
					state.token = accessToken;

					state.loading = false;
				}
			)
			.addMatcher(
				(action) =>
					authApiSlice.endpoints.login.matchRejected(action) ||
					authApiSlice.endpoints.refresh.matchRejected(action),
				(state, action) => {
					state.error = action.error.message;
					state.loading = false;
				}
			);
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserId = (state: RootState) => state.auth.user!._id;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
