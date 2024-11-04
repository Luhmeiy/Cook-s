import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

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
}

const initialState: InitialState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.token = accessToken;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserId = (state: RootState) => state.auth.user!._id;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
