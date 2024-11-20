import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { GoBackLink } from "@/components/RecipeForm/RecipeForm.styled";
import RecipeForm from "@/components/RecipeForm";
import { Recipe } from "@/interfaces/Recipe";
import {
	useGetRecipeByIdMutation,
	usePatchRecipeMutation,
} from "@/features/recipes/recipesApiSlice";

const EditRecipe = () => {
	const { id } = useParams();

	const [patchRecipe, { isLoading: isLoadingPostRecipe }] =
		usePatchRecipeMutation();
	const [getRecipeById, { isLoading: isLoadingGetRecipeById }] =
		useGetRecipeByIdMutation();

	const [recipe, setRecipe] = useState<Recipe>();

	useEffect(() => {
		const getRecipe = async () => {
			const { recipe } = await getRecipeById(id).unwrap();

			if (recipe) {
				setRecipe(recipe);
			} else {
				console.log("No recipe found.");
			}
		};

		getRecipe();
	}, [getRecipeById, id]);

	if (isLoadingPostRecipe || isLoadingGetRecipeById) return <p>Loading...</p>;

	return (
		<div>
			<GoBackLink to="/">
				<CaretLeft /> Go back
			</GoBackLink>

			{recipe && (
				<RecipeForm submitRecipe={patchRecipe} recipe={recipe} />
			)}
		</div>
	);
};

export default EditRecipe;
