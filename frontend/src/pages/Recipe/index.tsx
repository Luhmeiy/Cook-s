// packages
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PencilSimple, Plus, Timer, UserCircle } from "@phosphor-icons/react";

// styles
import { RecipeCategory, RecipeTime } from "@/styles/Recipe.styled";
import {
	Description,
	ListContainer,
	RecipeInfo,
	StyledRecipePage,
	UserLink,
} from "./RecipePage.styled";

// components / interfaces / Redux
import Button from "@/components/Button";
import RecipeTitle from "@/components/RecipeTitle";
import Step from "@/components/Step";
import { Recipe } from "@/interfaces/Recipe";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useGetRecipeByIdMutation } from "@/features/recipes/recipesApiSlice";

const RecipePage = () => {
	const { id } = useParams();

	const user = useSelector(selectCurrentUser);

	const [getRecipeById, { isLoading }] = useGetRecipeByIdMutation();
	const [recipe, setRecipe] = useState<Recipe>();

	useEffect(() => {
		const getRecipe = async () => {
			const { recipe } = await getRecipeById(id).unwrap();

			if (recipe) {
				setRecipe(recipe);
			} else {
				console.log("No recipe found.");
			}
		};

		getRecipe();
	}, [getRecipeById, id]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<StyledRecipePage>
			<div>
				<RecipeInfo>
					{recipe && <RecipeTitle recipe={recipe} alternate="true" />}

					<div>
						<RecipeCategory
							category={recipe?.category ? true : false}
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
					{recipe?.ingredients.map((ingredient, index) => (
						<Step step={ingredient} index={index} key={index} />
					))}

					<Button variant="gray">
						Add remaining ingredients to shopping list <Plus />
					</Button>
				</ListContainer>

				<ListContainer>
					<h3>Instructions</h3>
					{recipe?.instructions.map((instruction, index) => (
						<Step step={instruction} index={index} key={index} />
					))}
				</ListContainer>
			</div>

			<div>
				{recipe?.createdBy.username ? (
					<div>
						<p>Created by</p>
						<UserLink to={`/user/${recipe?.createdBy._id}`}>
							<UserCircle size={24} weight="bold" />
							{recipe?.createdBy.username}
						</UserLink>
					</div>
				) : (
					<p>User not found.</p>
				)}

				{recipe?.createdBy.username === user?.username && (
					<Button to={`/edit-recipe/${id}`}>
						Edit Recipe <PencilSimple weight="light" />
					</Button>
				)}
			</div>
		</StyledRecipePage>
	);
};

export default RecipePage;
