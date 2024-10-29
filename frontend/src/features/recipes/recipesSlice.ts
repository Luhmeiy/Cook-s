import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { Recipe } from "@/interfaces/Recipe";

interface InitialState {
	recipes: Recipe[] | null;
}

const initialState: InitialState = {
	recipes: null,
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		setRecipes: (state, action) => {
			const { recipes } = action.payload;
			state.recipes = recipes;
		},
	},
});

export const selectCurrentRecipes = (state: RootState) => state.recipes.recipes;

export const { setRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
