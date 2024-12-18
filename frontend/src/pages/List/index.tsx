// packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

// styles
import { RecipeContainerTitle, StyledRecipes } from "@/styles/Recipes.styled";
import { IngredientsContainer } from "./List.styled";

// components / types / Redux
import Button from "@/components/Button";
import FloatingMessage from "@/components/FloatingMessage";
import Ingredient from "@/components/Ingredient";
import NewIngredientForm from "@/components/NewIngredientForm";
import SortMenu from "@/components/SortMenu";
import { ErrorType } from "@/interfaces/ErrorType";
import { IngredientTypeWithId } from "@/interfaces/IngredientType";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "@/features/auth/authSlice";
import {
	useDeleteIngredientMutation,
	usePostIngredientMutation,
} from "@/features/lists/listsApiSlice";

const List = ({ listType }: { listType: "ingredient" | "shopping" }) => {
	const sendToList = listType === "ingredient" ? "shopping" : "ingredient";

	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	const [
		postIngredient,
		{ isError: isPostError, isLoading: isLoadingIngredient, isSuccess },
	] = usePostIngredientMutation();
	const [deleteIngredient, { error, isError: isDeleteError }] =
		useDeleteIngredientMutation();

	const isError = isPostError || isDeleteError;

	const [open, setOpen] = useState(false);
	const [ingredients, setIngredients] = useState<IngredientTypeWithId[]>();
	const [sortedIngredients, setSortedIngredients] =
		useState<IngredientTypeWithId[]>();

	const handleAddIngredients = async (ingredient?: IngredientTypeWithId) => {
		let list;

		if (ingredient) {
			list = [ingredient];
		} else {
			list = user?.shoppingList.filter((ingredient) => ingredient.bought);
		}

		const { error } = await postIngredient({
			id: user?._id,
			list: list?.map(({ _id, ...rest }) => rest),
			listType: sendToList,
		});

		if (!error) {
			list?.map(
				async ({ _id }) =>
					await deleteIngredient({
						userId: user?._id,
						ingredient: _id,
					})
			);
		}
	};

	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}

		if (!isLoading && user) {
			setIngredients(user[`${listType}List`]);
		}
	}, [isLoading, listType, navigate, user]);

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={
						(error as ErrorType).data.message ||
						"Failed to move ingredient to another list."
					}
				/>
			)}
			{isSuccess && (
				<FloatingMessage
					type="success"
					message={`Ingredient moved to ${sendToList} list.`}
				/>
			)}

			<StyledRecipes>
				<RecipeContainerTitle>
					<h2>
						{listType === "ingredient"
							? "Available Ingredients"
							: "Shopping List"}
					</h2>

					<div>
						<SortMenu
							properties={["ingredient"]}
							list={ingredients!}
							setList={setSortedIngredients}
						/>

						<Button onClick={() => setOpen(true)}>
							Add New Ingredient <Plus size={20} weight="light" />
						</Button>
					</div>

					<NewIngredientForm
						open={open}
						setOpen={setOpen}
						listType={listType}
					/>
				</RecipeContainerTitle>

				<IngredientsContainer>
					{sortedIngredients?.length ? (
						sortedIngredients.map((ingredient) => (
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
						<Button
							onClick={() => handleAddIngredients()}
							disabled={isLoadingIngredient}
						>
							Add Bought Ingredients to Ingredients List{" "}
							<Plus size={20} weight="light" />
						</Button>
					</div>
				)}
			</StyledRecipes>
		</>
	);
};

export default List;
