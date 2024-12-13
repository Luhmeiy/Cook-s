// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	PencilSimple,
	Plus,
	Timer,
	UserCircle,
	X,
} from "@phosphor-icons/react";

// styles
import { RecipeCategory, RecipeTime } from "@/styles/Recipe.styled";
import { StyledNotFound } from "../NotFound/NotFound.styled";
import {
	ButtonContainer,
	Description,
	ListContainer,
	RecipeInfo,
	StyledRecipePage,
} from "./RecipePage.styled";

// components / types / Redux
import Button from "@/components/Button";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import FloatingMessage from "@/components/FloatingMessage";
import RecipeTitle from "@/components/RecipeTitle";
import Step from "@/components/Step";
import UserButton from "@/components/UserButton";
import { ErrorType } from "@/interfaces/ErrorType";
import { IngredientType } from "@/interfaces/IngredientType";
import { selectCurrentUser } from "@/features/auth/authSlice";
import {
	useDeleteRecipeMutation,
	useGetRecipeByIdQuery,
} from "@/features/recipes/recipesApiSlice";
import { usePostIngredientMutation } from "@/features/lists/listsApiSlice";

const RecipePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const user = useSelector(selectCurrentUser);

	const [
		postIngredient,
		{ error: postError, isError: isPostError, isLoading: isLoadingPost },
	] = usePostIngredientMutation();
	const [
		deleteRecipe,
		{
			error: deleteError,
			isError: isDeleteError,
			isLoading: isLoadingDelete,
		},
	] = useDeleteRecipeMutation();

	const isError = isPostError || isDeleteError;
	const error = postError || deleteError;

	const {
		data,
		error: recipeError,
		isLoading,
	} = useGetRecipeByIdQuery(id!, {
		refetchOnMountOrArgChange: true,
	});

	const [open, setOpen] = useState(false);

	const verifyIngredientAvailability = (
		ingredient: Omit<IngredientType, "_id">
	) => {
		return user?.ingredientList.some(
			(e) =>
				e.ingredient.toLowerCase() ===
					ingredient.ingredient.toLowerCase() &&
				e.unit.toLowerCase() === ingredient.unit.toLowerCase() &&
				e.quantity >= ingredient.quantity
		);
	};

	const handleAddIngredients = async () => {
		const list = recipe.ingredients.filter(
			(ingredient) => !verifyIngredientAvailability(ingredient)
		);

		await postIngredient({
			id: user?._id,
			list: list.map((ingredient) => delete ingredient._id),
			listType: "shopping",
		});
	};

	const handleDeleteRecipe = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await deleteRecipe({ id });

		if (!error) navigate("/");
	};

	if (isLoading) return <p>Loading...</p>;

	if (recipeError) {
		return (
			<StyledNotFound>
				<h2>Recipe Not Found</h2>
				<Button to="/">Go Back</Button>
			</StyledNotFound>
		);
	}

	const { recipe } = data!;

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}

			<StyledRecipePage>
				<div>
					<RecipeInfo>
						{recipe && (
							<RecipeTitle recipe={recipe} alternate={true} />
						)}

						<div>
							<RecipeCategory
								$category={recipe?.category ? true : false}
							>
								{recipe?.category || "Sem Categoria"}
							</RecipeCategory>

							{recipe?.prepTime && (
								<RecipeTime>
									<Timer size={16} weight="thin" />

									{recipe.prepTime}
								</RecipeTime>
							)}

							{recipe?.servings && (
								<p>
									<span>Servings:</span> {recipe.servings}
								</p>
							)}
						</div>
					</RecipeInfo>

					<Description>
						<h3>Description</h3>
						{recipe?.description || "No description provided."}
					</Description>

					<ListContainer>
						<h3>Ingredients</h3>
						{recipe?.ingredients.map((ingredient, index) => {
							const isAvailable =
								verifyIngredientAvailability(ingredient);

							return (
								<Step
									step={ingredient}
									index={index}
									isAvailable={isAvailable}
									key={index}
								/>
							);
						})}

						{user && (
							<Button
								$variant="gray"
								onClick={handleAddIngredients}
								disabled={isLoadingPost}
							>
								Add remaining ingredients to shopping list{" "}
								<Plus />
							</Button>
						)}
					</ListContainer>

					<ListContainer>
						<h3>Instructions</h3>
						{recipe?.instructions
							.split("\n")
							.map((instruction, index) => (
								<Step
									step={instruction}
									index={index}
									key={index}
								/>
							))}
					</ListContainer>
				</div>

				<div>
					{recipe?.createdBy.username ? (
						<div>
							<p>Created by</p>
							<UserButton to={`/user/${recipe?.createdBy._id}`}>
								<UserCircle size={24} weight="bold" />
								{recipe?.createdBy.username}
							</UserButton>
						</div>
					) : (
						<p>User not found.</p>
					)}

					{recipe?.userId === user?._id && (
						<ButtonContainer>
							<Button to={`/edit-recipe/${id}`}>
								Edit Recipe <PencilSimple weight="light" />
							</Button>

							<Button
								$variant="red"
								onClick={() => setOpen(true)}
								disabled={isLoadingDelete}
							>
								Delete Recipe <X weight="light" />
							</Button>

							<ConfirmDeleteModal
								title={recipe.name}
								open={open}
								setOpen={setOpen}
								deleteFunction={handleDeleteRecipe}
								isLoadingDelete={isLoadingDelete}
							/>
						</ButtonContainer>
					)}
				</div>
			</StyledRecipePage>
		</>
	);
};

export default RecipePage;
