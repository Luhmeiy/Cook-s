import RecipesContainer from "@/components/RecipesContainer";
import { useGetPublicRecipesQuery } from "@/features/recipes/recipesApiSlice";

const Recipes = () => {
	const { data, isLoading } = useGetPublicRecipesQuery(null);

	if (isLoading) return <p>Loading...</p>;

	const recipes = data?.recipes || [];

	return (
		<RecipesContainer recipes={recipes}>
			<h2>Community Recipes</h2>
		</RecipesContainer>
	);
};

export default Recipes;
