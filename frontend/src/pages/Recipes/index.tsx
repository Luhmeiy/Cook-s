import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecipesContainer } from "./Recipes.styled";
import RecipeItem from "@/components/RecipeItem";
import { useGetPublicRecipesMutation } from "@/features/recipes/recipesApiSlice";
import {
	selectCurrentRecipes,
	setRecipes,
} from "@/features/recipes/recipesSlice";

const Recipes = () => {
	const dispatch = useDispatch();
	const [getPublicRecipes, { isLoading }] = useGetPublicRecipesMutation();

	const recipes = useSelector(selectCurrentRecipes);

	useEffect(() => {
		const getRecipes = async () => {
			const { recipes } = await getPublicRecipes(null).unwrap();

			if (recipes) {
				dispatch(setRecipes({ recipes }));
			} else {
				console.log("No recipes found.");
			}
		};

		getRecipes();
	}, [dispatch, getPublicRecipes]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<RecipesContainer>
			<h2>Community Recipes</h2>

			<div>
				{recipes?.length ? (
					recipes.map((recipe) => (
						<RecipeItem recipe={recipe} key={recipe._id} />
					))
				) : (
					<p>No recipes found.</p>
				)}
			</div>
		</RecipesContainer>
	);
};

export default Recipes;
