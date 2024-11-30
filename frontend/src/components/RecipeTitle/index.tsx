import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilePlus, Star } from "@phosphor-icons/react";
import { Recipe } from "@/interfaces/Recipe";
import { StyledRecipeTitle } from "./RecipeTitle.styled";
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

	const [updateRecipe] = usePatchRecipeMutation();
	const [postRecipe] = usePostRecipeMutation();

	const handleFavorite = async () => {
		setFavorite(!favorite);

		try {
			await updateRecipe({
				id: recipe._id,
				data: { data: { ...recipe, favorite: !favorite } },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSaveRecipe = async () => {
		try {
			await postRecipe({
				data: {
					data: { ...recipe, _id: null, public: false, userId: id },
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
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
							favorite ? "fill" : alternate ? "bold" : "regular"
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
	);
};

export default RecipeTitle;
