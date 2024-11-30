import { CaretLeft } from "@phosphor-icons/react";
import { GoBackLink } from "@/styles/Form.styled";
import RecipeForm from "@/components/RecipeForm";
import { usePostRecipeMutation } from "@/features/recipes/recipesApiSlice";

const NewRecipe = () => {
	const [postRecipe, { isLoading: isLoadingPostRecipe }] =
		usePostRecipeMutation();

	if (isLoadingPostRecipe) return <p>Loading...</p>;

	return (
		<div>
			<GoBackLink to="/">
				<CaretLeft /> Go back
			</GoBackLink>

			<RecipeForm submitRecipe={postRecipe} />
		</div>
	);
};

export default NewRecipe;
