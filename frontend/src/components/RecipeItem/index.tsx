import { Timer } from "@phosphor-icons/react";
import { Recipe } from "@/interfaces/Recipe";
import { RecipeCategory, RecipeTime } from "@/styles/Recipe.styled";
import { RecipeInfo, StyledRecipeItem } from "./RecipeItem.styled";
import RecipeTitle from "../RecipeTitle";

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
	return (
		<StyledRecipeItem>
			<RecipeInfo>
				<RecipeTitle recipe={recipe} />

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
