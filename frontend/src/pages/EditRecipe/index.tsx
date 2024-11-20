import { useParams } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { GoBackLink } from "@/components/RecipeForm/RecipeForm.styled";
import RecipeForm from "@/components/RecipeForm";
import {
	useGetRecipeByIdQuery,
	usePatchRecipeMutation,
} from "@/features/recipes/recipesApiSlice";

const EditRecipe = () => {
	const { id } = useParams();

	const [patchRecipe, { isLoading: isLoadingPostRecipe }] =
		usePatchRecipeMutation();
	const { data, isLoading: isLoadingGetRecipeById } = useGetRecipeByIdQuery(
		id!
	);

	if (isLoadingPostRecipe || isLoadingGetRecipeById) return <p>Loading...</p>;

	const { recipe } = data!;

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
