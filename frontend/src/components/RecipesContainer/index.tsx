import { ReactNode } from "react";
import { StyledRecipes } from "@/styles/Recipes.styled";
import { StyledRecipesContainer } from "./RecipesContainer.styled";
import { Recipe } from "@/interfaces/Recipe";
import RecipeItem from "../RecipeItem";

const RecipesContainer = ({
	recipes,
	children,
}: {
	recipes: Recipe[];
	children: ReactNode;
}) => {
	return (
		<StyledRecipes>
			{children}

			<StyledRecipesContainer>
				{recipes?.length ? (
					recipes.map((recipe) => (
						<RecipeItem recipe={recipe} key={recipe._id} />
					))
				) : (
					<p>No recipes found.</p>
				)}
			</StyledRecipesContainer>
		</StyledRecipes>
	);
};

export default RecipesContainer;
