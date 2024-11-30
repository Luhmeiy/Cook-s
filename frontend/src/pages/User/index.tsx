// packages
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSimple, X } from "@phosphor-icons/react";

// styles
import { RecipesContainer } from "@/styles/Recipes.styled";
import { StyledNotFound } from "../NotFound/NotFound.styled";
import { StyledUser, UserInfo } from "./User.styled";

// components / Redux
import Button from "@/components/Button";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import RecipeItem from "@/components/RecipeItem";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";
import {
	useDeleteUserMutation,
	useGetUserByIdQuery,
} from "@/features/users/usersApiSlice";

const User = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useGetUserByIdQuery(id);
	const { data, isLoading: isLoadingRecipes } = useGetUserRecipesQuery(id!);

	const [deleteUser] = useDeleteUserMutation();

	const [password, setPassword] = useState("");
	const [open, setOpen] = useState(false);

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

	const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = await deleteUser({ id, password });

			if (!error) {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<StyledUser>
			<UserInfo>
				<div>
					<h2>{user?.username}</h2>
					<p>{user?.description || "No description provided."}</p>
				</div>

				<div>
					<Button>
						Edit User <PencilSimple weight="light" />
					</Button>

					<Button $variant="red" onClick={() => setOpen(true)}>
						Delete User <X weight="light" />
					</Button>

					<ConfirmDeleteModal
						title="your account"
						open={open}
						setOpen={setOpen}
						deleteFunction={handleDeleteUser}
					>
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
					</ConfirmDeleteModal>
				</div>
			</UserInfo>

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
