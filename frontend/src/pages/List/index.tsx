// packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import { RecipeContainerTitle, StyledRecipes } from "@/styles/Recipes.styled";
import { IngredientsContainer, NewIngredientButton } from "./List.styled";

// components / types / Redux
import Button from "@/components/Button";
import Ingredient from "@/components/Ingredient";
import NewIngredientForm from "@/components/NewIngredientForm";
import { IngredientType } from "@/interfaces/IngredientType";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";
import {
	useDeleteIngredientMutation,
	usePostIngredientMutation,
} from "@/features/lists/listsApiSlice";

const List = ({ listType }: { listType: "ingredient" | "shopping" }) => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [postIngredient] = usePostIngredientMutation();
	const [deleteIngredient] = useDeleteIngredientMutation();

	const [open, setOpen] = useState(false);

	const handleAddIngredients = async (ingredient?: IngredientType) => {
		let list;

		if (ingredient) {
			list = [ingredient];
		} else {
			list = user?.shoppingList.filter((ingredient) => ingredient.bought);
		}

		try {
			await postIngredient({
				id: user?._id,
				list: list?.map((ingredient) => delete ingredient._id),
				listType: listType === "ingredient" ? "shopping" : "ingredient",
			});

			list?.map(
				async ({ _id }) =>
					await deleteIngredient({
						userId: user?._id,
						ingredient: _id,
					})
			);
		} catch (error) {
			console.log(error);
		}
	};

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
							handleAddIngredients={handleAddIngredients}
							key={ingredient._id}
						/>
					))
				) : (
					<p>No ingredients available.</p>
				)}
			</IngredientsContainer>

			{listType === "shopping" && (
				<div>
					<Button onClick={() => handleAddIngredients()}>
						Add Bought Ingredients to Ingredients List{" "}
						<Plus size={20} weight="light" />
					</Button>
				</div>
			)}
		</StyledRecipes>
	);
};

export default List;
