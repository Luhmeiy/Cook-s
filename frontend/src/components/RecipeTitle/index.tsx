import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "@phosphor-icons/react";
import { Recipe } from "@/interfaces/Recipe";
import { StyledRecipeTitle } from "./RecipeTitle.styled";
import { usePatchRecipeMutation } from "@/features/recipes/recipesApiSlice";

const RecipeTitle = ({
	recipe,
	alternate,
}: {
	recipe: Recipe;
	alternate?: string;
}) => {
	const [favorite, setFavorite] = useState(recipe.favorite || false);

	const [updateRecipe] = usePatchRecipeMutation();

	const handleFavorite = async () => {
		setFavorite(!favorite);

		try {
			await updateRecipe({
				id: recipe._id,
				data: { ...recipe, favorite: !favorite },
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<StyledRecipeTitle alternate={alternate}>
			{alternate ? (
				<h2>{recipe.name}</h2>
			) : (
				<Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
			)}

			<Star
				size={20}
				color={favorite ? "var(--primary)" : "var(--text)"}
				weight={favorite ? "fill" : alternate ? "bold" : "regular"}
				onClick={handleFavorite}
			/>
		</StyledRecipeTitle>
	);
};

export default RecipeTitle;
