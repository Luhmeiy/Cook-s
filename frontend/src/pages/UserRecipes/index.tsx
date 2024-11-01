// packages
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useGetUserRecipesMutation } from "@/features/recipes/recipesApiSlice";
import {
	selectCurrentUserRecipes,
	setUserRecipes,
} from "@/features/recipes/recipesSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const UserRecipes = () => {
	const dispatch = useDispatch();
	const [getUserRecipes, { isLoading }] = useGetUserRecipesMutation();

	const userId = useSelector(selectCurrentUserId);
	const recipes = useSelector(selectCurrentUserRecipes);

	useEffect(() => {
		const getRecipes = async () => {
			const { recipes } = await getUserRecipes(userId).unwrap();

			if (recipes) {
				dispatch(setUserRecipes({ recipes }));
			} else {
				console.log("No recipes found.");
			}
		};

		getRecipes();
	}, [dispatch, getUserRecipes, userId]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				<h2>Recipes</h2>

				<NewRecipeButton to="/new-recipe">
					Add New Recipe <Plus size={20} weight="bold" />
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
