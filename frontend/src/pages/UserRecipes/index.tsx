// packages
import { useSelector } from "react-redux";
import { Plus } from "@phosphor-icons/react";

// styles
import {
	NewRecipeButton,
	RecipeContainerTitle,
	RecipesContainer,
	StyledRecipes,
} from "@/styles/Recipes.styled";

// components / Redux
import RecipeItem from "@/components/RecipeItem";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";

const UserRecipes = () => {
	const userId = useSelector(selectCurrentUserId);
	const { data, isLoading } = useGetUserRecipesQuery(userId);

	if (isLoading) return <p>Loading...</p>;

	const recipes = data?.recipes || [];

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				<h2>Recipes</h2>

				<NewRecipeButton to="/new-recipe">
					Add New Recipe <Plus size={20} weight="light" />
				</NewRecipeButton>
			</RecipeContainerTitle>

			<RecipesContainer>
				{recipes?.length ? (
					recipes.map((recipe) => (
						<RecipeItem recipe={recipe} key={recipe._id} />
					))
				) : (
					<p>No recipes found.</p>
				)}
			</RecipesContainer>
		</StyledRecipes>
	);
};

export default UserRecipes;
