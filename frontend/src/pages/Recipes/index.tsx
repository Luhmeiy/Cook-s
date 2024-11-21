import { RecipesContainer, StyledRecipes } from "@/styles/Recipes.styled";
import RecipeItem from "@/components/RecipeItem";
import { useGetPublicRecipesQuery } from "@/features/recipes/recipesApiSlice";

const Recipes = () => {
	const { data, isLoading } = useGetPublicRecipesQuery(null);

	if (isLoading) return <p>Loading...</p>;

	const recipes = data?.recipes || [];

	return (
		<StyledRecipes>
			<h2>Community Recipes</h2>

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

export default Recipes;
