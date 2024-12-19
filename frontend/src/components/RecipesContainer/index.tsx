import { ReactNode, useState } from "react";
import { RecipeContainerTitle, StyledRecipes } from "@/styles/Recipes.styled";
import { StyledRecipesContainer } from "./RecipesContainer.styled";
import RecipeItem from "../RecipeItem";
import FilterMenu from "../FilterMenu";
import SortMenu from "../SortMenu";
import { Recipe } from "@/interfaces/Recipe";

const properties = ["name", "prepTime", "servings"];

const RecipesContainer = ({
	recipes,
	children,
	button,
}: {
	recipes: Recipe[];
	children: ReactNode;
	button?: ReactNode;
}) => {
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();
	const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>();

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				{children}

				<div>
					<FilterMenu list={recipes} setList={setFilteredRecipes} />

					<SortMenu
						properties={properties}
						list={filteredRecipes!}
						setList={setSortedRecipes}
					/>

					{button}
				</div>
			</RecipeContainerTitle>

			<StyledRecipesContainer>
				{sortedRecipes?.length ? (
					sortedRecipes.map((recipe) => (
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
