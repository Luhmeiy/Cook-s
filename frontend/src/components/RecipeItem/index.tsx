import { Star, Timer } from "@phosphor-icons/react";
import { Recipe } from "@/interfaces/Recipe";
import {
	RecipeCategory,
	RecipeInfo,
	RecipeTime,
	RecipeTitle,
	StyledRecipeItem,
} from "./RecipeItem.styled";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
	return (
		<StyledRecipeItem>
			<RecipeInfo>
				<RecipeTitle>
					<Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>{" "}
					<Star size={20} />
				</RecipeTitle>

				<RecipeCategory category={recipe.category ? true : false}>
					{recipe.category || "Sem Categoria"}
				</RecipeCategory>

				<div>
					{recipe.prepTime && (
						<RecipeTime>
							<Timer size={16} weight="thin" />

							{recipe.prepTime}
						</RecipeTime>
					)}

					{recipe.servings && (
						<p>
							<span>Number of Servings:</span> {recipe.servings}
						</p>
					)}
				</div>
			</RecipeInfo>
		</StyledRecipeItem>
	);
};

export default RecipeItem;
