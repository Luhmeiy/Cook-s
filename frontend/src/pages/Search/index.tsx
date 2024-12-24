import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledSearch } from "./Search.styled";
import RecipesContainer from "@/components/RecipesContainer";
import { Recipe } from "@/interfaces/Recipe";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	useGetPublicRecipesQuery,
	useGetUserRecipesQuery,
} from "@/features/recipes/recipesApiSlice";

const Search = () => {
	const { search } = useParams();
	const loweredSearch = search!.toLowerCase();

	const userId = useSelector(selectCurrentUserId);

	const filterRecipes = (
		data: { recipes: Recipe[] } | undefined,
		community?: boolean
	) => {
		return (
			data?.recipes.filter((recipe) => {
				if (
					recipe.name.toLowerCase().includes(loweredSearch) ||
					recipe.category.toLowerCase().includes(loweredSearch) ||
					recipe.ingredients.some(({ ingredient }) =>
						ingredient.toLowerCase().includes(loweredSearch)
					)
				) {
					if (community && recipe.userId === userId) return;
					return recipe;
				}
			}) || []
		);
	};

	const { data: communityData, isLoading: isLoadingCommunityData } =
		useGetPublicRecipesQuery(null);
	const { data: userData, isLoading: isLoadingUserData } =
		useGetUserRecipesQuery(userId!);

	const communityRecipes = filterRecipes(communityData, true);
	const userRecipes = filterRecipes(userData);

	if (
		isLoadingCommunityData ||
		isLoadingUserData ||
		!communityRecipes ||
		!userRecipes
	)
		return <p>Loading...</p>;

	return (
		<StyledSearch>
			<h2>Search Results</h2>

			<RecipesContainer recipes={communityRecipes}>
				<h3>Community Recipes</h3>
			</RecipesContainer>

			{userId && (
				<RecipesContainer recipes={userRecipes}>
					<h3>Your Recipes</h3>
				</RecipesContainer>
			)}
		</StyledSearch>
	);
};

export default Search;
