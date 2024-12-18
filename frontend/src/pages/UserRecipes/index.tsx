// packages
import { useSelector } from "react-redux";
import { Plus } from "@phosphor-icons/react";

// components / Redux
import Button from "@/components/Button";
import RecipesContainer from "@/components/RecipesContainer";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";

const UserRecipes = () => {
	const userId = useSelector(selectCurrentUserId);
	const { data, isLoading } = useGetUserRecipesQuery(userId!);

	if (isLoading) return <p>Loading...</p>;

	const recipes = data?.recipes || [];

	const button = (
		<Button to="/new-recipe">
			Add New Recipe <Plus size={20} weight="light" />
		</Button>
	);

	return (
		<RecipesContainer recipes={recipes} button={button}>
			<h2>Recipes</h2>
		</RecipesContainer>
	);
};

export default UserRecipes;
