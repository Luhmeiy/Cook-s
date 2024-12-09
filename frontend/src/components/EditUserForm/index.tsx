// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

// styles
import { InputContainer, PublicContainer } from "@/styles/Form.styled";
import { StyledEditUserForm } from "./EditUserForm.styled";

// components / Redux
import Button from "../Button";
import FloatingMessage from "../FloatingMessage";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { usePatchUserMutation } from "@/features/users/usersApiSlice";

const EditUserForm = () => {
	const user = useSelector(selectCurrentUser);
	const [patchUser, { isError, isSuccess }] = usePatchUserMutation();

	const [username, setUsername] = useState(user?.username);
	const [description, setDescription] = useState(user?.description);
	const [isPublic, setIsPublic] = useState(user?.public);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await patchUser({
			id: user?._id,
			data: {
				data: { username, description, public: isPublic },
			},
		});
	};

	return (
		<>
			{isError && (
				<FloatingMessage type="error" message="Failed to edit user." />
			)}
			{isSuccess && (
				<FloatingMessage type="success" message="User edited." />
			)}

			<StyledEditUserForm onSubmit={handleSubmit}>
				<h3>Edit User</h3>

				<InputContainer>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</InputContainer>

				<InputContainer>
					Description
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</InputContainer>

				<PublicContainer>
					<b>Do you want your profile to be public?</b>

					<div>
						<label>
							<input
								type="radio"
								name="public"
								value="true"
								checked={isPublic === true}
								onChange={() => setIsPublic(true)}
							/>
							Yes
						</label>

						<label>
							<input
								type="radio"
								name="public"
								value="false"
								checked={isPublic === false}
								onChange={() => setIsPublic(false)}
							/>
							No
						</label>
					</div>
				</PublicContainer>

				<Button>Save</Button>
			</StyledEditUserForm>
		</>
	);
};

export default EditUserForm;
