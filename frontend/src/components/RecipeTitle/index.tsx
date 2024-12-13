import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilePlus, Star } from "@phosphor-icons/react";
import { StyledRecipeTitle } from "./RecipeTitle.styled";
import FloatingMessage from "../FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { Recipe } from "@/interfaces/Recipe";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import {
	usePostRecipeMutation,
	useUpdateRecipeMutation,
} from "@/features/recipes/recipesApiSlice";

const RecipeTitle = ({
	recipe,
	alternate,
}: {
	recipe: Recipe;
	alternate?: boolean;
}) => {
	const id = useSelector(selectCurrentUserId);

	const [favorite, setFavorite] = useState(recipe.favorite || false);

	const [updateRecipe, { isError: isUpdateError }] =
		useUpdateRecipeMutation();
	const [postRecipe, { error: postError, isError: isPostError }] =
		usePostRecipeMutation();

	const isError = isUpdateError || isPostError;

	const handleFavorite = async () => {
		setFavorite(!favorite);

		await updateRecipe({
			id: recipe._id,
			data: { data: { ...recipe, favorite: !favorite } },
		});
	};

	const handleSaveRecipe = async () => {
		await postRecipe({
			data: {
				data: { ...recipe, _id: null, public: false, userId: id },
			},
		});
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={
						(postError as ErrorType).data.message ||
						"Failed to add recipe to favorites."
					}
				/>
			)}

			<StyledRecipeTitle $alternate={alternate}>
				{alternate ? (
					<h2>{recipe.name}</h2>
				) : (
					<Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
				)}

				{id &&
					(recipe.userId === id ? (
						<Star
							size={20}
							color={favorite ? "var(--primary)" : "var(--text)"}
							weight={
								favorite
									? "fill"
									: alternate
									? "bold"
									: "regular"
							}
							onClick={handleFavorite}
						/>
					) : (
						<FilePlus
							size={20}
							weight={alternate ? "bold" : "regular"}
							onClick={handleSaveRecipe}
						/>
					))}
			</StyledRecipeTitle>
		</>
	);
};

export default RecipeTitle;
