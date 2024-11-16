// packages
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import {
	NewRecipeButton,
	RecipeContainerTitle,
	StyledRecipes,
} from "@/styles/Recipes.styled";
import { IngredientsContainer } from "@/styles/Ingredient.styled";

// Redux
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";
import Ingredient from "@/components/Ingredient";

const IngredientsList = () => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}
	}, [isLoading, user, navigate]);

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				<h2>Available Ingredients</h2>

				<NewRecipeButton to="/new-recipe">
					Add New Ingredient <Plus size={20} weight="light" />
				</NewRecipeButton>
			</RecipeContainerTitle>

			<IngredientsContainer>
				{user?.ingredientList.length ? (
					user.ingredientList.map((ingredient) => (
						<Ingredient
							ingredientProps={ingredient}
							key={ingredient._id}
						/>
					))
				) : (
					<p>No ingredients available.</p>
				)}
			</IngredientsContainer>
		</StyledRecipes>
	);
};

export default IngredientsList;
