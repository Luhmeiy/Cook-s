// packages
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GearSix } from "@phosphor-icons/react";

// styles
import { StyledNotFound } from "../NotFound/NotFound.styled";
import { StyledUser, UserInfo } from "./User.styled";

// components / Redux
import Button from "@/components/Button";
import RecipesContainer from "@/components/RecipesContainer";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";
import { useGetUserByIdQuery } from "@/features/users/usersApiSlice";

const User = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const userId = useSelector(selectCurrentUserId);

	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useGetUserByIdQuery({ id, userId });
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
			<UserInfo>
				<div>
					<h2>{user?.username}</h2>
					<p>{user?.description || "No description provided."}</p>
				</div>

				{id === userId && (
					<GearSix
						size={32}
						weight="bold"
						onClick={() => navigate("/settings")}
					/>
				)}
			</UserInfo>

			<RecipesContainer recipes={recipes}>
				<h3>Recipes</h3>
			</RecipesContainer>
		</StyledUser>
	);
};

export default User;
