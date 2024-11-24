// packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import { RecipeContainerTitle, StyledRecipes } from "@/styles/Recipes.styled";
import { IngredientsContainer, NewIngredientButton } from "./List.styled";

// components / Redux
import Ingredient from "@/components/Ingredient";
import NewIngredientForm from "@/components/NewIngredientForm";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";

const List = ({ listType }: { listType: "ingredient" | "shopping" }) => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}
	}, [isLoading, user, navigate]);

	return (
		<StyledRecipes>
			<RecipeContainerTitle>
				<h2>
					{listType === "ingredient"
						? "Available Ingredients"
						: "Shopping List"}
				</h2>

				<NewIngredientButton onClick={() => setOpen(true)}>
					Add New Ingredient <Plus size={20} weight="light" />
				</NewIngredientButton>

				<NewIngredientForm
					open={open}
					setOpen={setOpen}
					listType={listType}
				/>
			</RecipeContainerTitle>

			<IngredientsContainer>
				{user && user[`${listType}List`].length ? (
					user[`${listType}List`].map((ingredient) => (
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

export default List;
