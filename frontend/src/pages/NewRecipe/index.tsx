import { CaretLeft } from "@phosphor-icons/react";
import FloatingMessage from "@/components/FloatingMessage";
import { GoBackLink } from "@/styles/Form.styled";
import RecipeForm from "@/components/RecipeForm";
import { usePostRecipeMutation } from "@/features/recipes/recipesApiSlice";

const NewRecipe = () => {
	const [postRecipe, { isError }] = usePostRecipeMutation();

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message="Failed to save recipe."
				/>
			)}

			<div>
				<GoBackLink to="/">
					<CaretLeft /> Go back
				</GoBackLink>

				<RecipeForm submitRecipe={postRecipe} />
			</div>
		</>
	);
};

export default NewRecipe;
