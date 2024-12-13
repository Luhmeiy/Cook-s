import { CaretLeft } from "@phosphor-icons/react";
import FloatingMessage from "@/components/FloatingMessage";
import { GoBackLink } from "@/styles/Form.styled";
import RecipeForm from "@/components/RecipeForm";
import { ErrorType } from "@/interfaces/ErrorType";
import { usePostRecipeMutation } from "@/features/recipes/recipesApiSlice";

const NewRecipe = () => {
	const [postRecipe, { error, isError, isLoading }] = usePostRecipeMutation();

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

			<div>
				<GoBackLink to="/">
					<CaretLeft /> Go back
				</GoBackLink>

				<RecipeForm
					submitRecipe={postRecipe}
					isLoadingSubmit={isLoading}
				/>
			</div>
		</>
	);
};

export default NewRecipe;
