import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { Recipe } from "@/interfaces/Recipe";

interface InitialState {
	recipes: Recipe[] | null;
	userRecipes: Recipe[] | null;
}

const initialState: InitialState = {
	recipes: null,
	userRecipes: null,
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		setRecipes: (state, action) => {
			const { recipes } = action.payload;
			state.recipes = recipes;
		},
		setUserRecipes: (state, action) => {
			const { recipes } = action.payload;
			state.userRecipes = recipes;
		},
		clearUserRecipes: (state) => {
			state.userRecipes = null;
		},
	},
});

export const selectCurrentRecipes = (state: RootState) => state.recipes.recipes;
export const selectCurrentUserRecipes = (state: RootState) =>
	state.recipes.userRecipes;

export const { setRecipes, setUserRecipes, clearUserRecipes } =
	recipesSlice.actions;
export default recipesSlice.reducer;
