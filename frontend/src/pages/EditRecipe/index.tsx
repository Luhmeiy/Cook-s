import { useParams } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { GoBackLink } from "@/styles/Form.styled";
import FloatingMessage from "@/components/FloatingMessage";
import RecipeForm from "@/components/RecipeForm";
import {
	useGetRecipeByIdQuery,
	usePatchRecipeMutation,
} from "@/features/recipes/recipesApiSlice";

const EditRecipe = () => {
	const { id } = useParams();

	const [patchRecipe, { isError }] = usePatchRecipeMutation();
	const { data, isLoading } = useGetRecipeByIdQuery(id!);

	if (isLoading) return <p>Loading...</p>;

	const { recipe } = data!;

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message="Failed to edit recipe."
				/>
			)}

			<div>
				<GoBackLink to={`/recipe/${id}`}>
					<CaretLeft /> Go back
				</GoBackLink>

				{recipe && (
					<RecipeForm submitRecipe={patchRecipe} recipe={recipe} />
				)}
			</div>
		</>
	);
};

export default EditRecipe;
