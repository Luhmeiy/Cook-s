import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

interface InitialState {
	user: {
		email: string;
		username: string;
		ingredientList: [
			{
				ingredient: string;
				quantity: number;
				quantityType: string;
			}
		];
		shoppingList: [
			{
				ingredient: string;
				quantity: number;
				quantityType: string;
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
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
