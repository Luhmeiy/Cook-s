import { useParams } from "react-router-dom";
import { StyledNotFound } from "../NotFound/NotFound.styled";
import { RecipesContainer } from "@/styles/Recipes.styled";
import { StyledUser } from "./User.styled";
import Button from "@/components/Button";
import RecipeItem from "@/components/RecipeItem";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";
import { useGetUserByIdQuery } from "@/features/users/usersApiSlice";

const User = () => {
	const { id } = useParams();

	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useGetUserByIdQuery(id);
	const { data, isLoading: isLoadingRecipes } = useGetUserRecipesQuery(id!);

	if (isLoadingUser || isLoadingRecipes) return <p>Loading...</p>;
	if (error) {
		return (
			<StyledNotFound>
				<h2>User Not Found</h2>
				<Button to="/">Go Back</Button>
			</StyledNotFound>
		);
	}

	const recipes = data?.recipes || [];

	return (
		<StyledUser>
			<div>
				<h2>{user?.username}</h2>
				<p>{user?.description || "No description provided."}</p>
			</div>

			<div>
				<h3>Recipes</h3>
				<RecipesContainer>
					{recipes?.length ? (
						recipes.map((recipe) => (
							<RecipeItem recipe={recipe} key={recipe._id} />
						))
					) : (
						<p>No recipes found.</p>
					)}
				</RecipesContainer>
			</div>
		</StyledUser>
	);
};

export default User;
