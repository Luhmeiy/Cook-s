// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSimple, X } from "@phosphor-icons/react";

// styles
import { StyledNotFound } from "../NotFound/NotFound.styled";
import { StyledUser, UserInfo } from "./User.styled";

// components / Redux
import Button from "@/components/Button";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import EditUserForm from "@/components/EditUserForm";
import PasswordInput from "@/components/PasswordInput";
import RecipesContainer from "@/components/RecipesContainer";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useGetUserRecipesQuery } from "@/features/recipes/recipesApiSlice";
import {
	useDeleteUserMutation,
	useGetUserByIdQuery,
} from "@/features/users/usersApiSlice";

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

	const [deleteUser] = useDeleteUserMutation();

	const [password, setPassword] = useState("");
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

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

				{id === userId && (
					<div>
						<Button onClick={() => setOpenEdit(true)}>
							Edit User <PencilSimple weight="light" />
						</Button>

						<EditUserForm open={openEdit} setOpen={setOpenEdit} />

						<Button
							$variant="red"
							onClick={() => setOpenDelete(true)}
						>
							Delete User <X weight="light" />
						</Button>

						<ConfirmDeleteModal
							title="your account"
							open={openDelete}
							setOpen={setOpenDelete}
							deleteFunction={handleDeleteUser}
						>
							<PasswordInput
								password={password}
								setPassword={setPassword}
							/>
						</ConfirmDeleteModal>
					</div>
				)}
			</UserInfo>

			<RecipesContainer recipes={recipes}>
				<h3>Recipes</h3>
			</RecipesContainer>
		</StyledUser>
	);
};

export default User;
