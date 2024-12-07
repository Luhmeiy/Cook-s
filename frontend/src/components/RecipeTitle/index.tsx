import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilePlus, Star } from "@phosphor-icons/react";
import { StyledRecipeTitle } from "./RecipeTitle.styled";
import FloatingMessage from "../FloatingMessage";
import { Recipe } from "@/interfaces/Recipe";
import {
	usePatchRecipeMutation,
	usePostRecipeMutation,
} from "@/features/recipes/recipesApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const RecipeTitle = ({
	recipe,
	alternate,
}: {
	recipe: Recipe;
	alternate?: boolean;
}) => {
	const id = useSelector(selectCurrentUserId);

	const [favorite, setFavorite] = useState(recipe.favorite || false);

	const [updateRecipe, { isError: isUpdateError }] = usePatchRecipeMutation();
	const [postRecipe, { isError: isPostError }] = usePostRecipeMutation();

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
			{isUpdateError && (
				<FloatingMessage
					type="error"
					message="Failed to add recipe to favorites."
				/>
			)}
			{isPostError && (
				<FloatingMessage
					type="error"
					message="Failed to save recipe."
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
