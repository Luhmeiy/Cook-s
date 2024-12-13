import { useParams } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { GoBackLink } from "@/styles/Form.styled";
import FloatingMessage from "@/components/FloatingMessage";
import RecipeForm from "@/components/RecipeForm";
import { ErrorType } from "@/interfaces/ErrorType";
import {
	useGetRecipeByIdQuery,
	useUpdateRecipeMutation,
} from "@/features/recipes/recipesApiSlice";

const EditRecipe = () => {
	const { id } = useParams();

	const [updateRecipe, { error, isError, isLoading: isLoadingUpdate }] =
		useUpdateRecipeMutation();
	const { data, isLoading } = useGetRecipeByIdQuery(id!);

	if (isLoading) return <p>Loading...</p>;

	const { recipe } = data!;

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

			<div>
				<GoBackLink to={`/recipe/${id}`}>
					<CaretLeft /> Go back
				</GoBackLink>

				{recipe && (
					<RecipeForm
						submitRecipe={updateRecipe}
						isLoadingSubmit={isLoadingUpdate}
						recipe={recipe}
					/>
				)}
			</div>
		</>
	);
};

export default EditRecipe;
