import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "@/styles/Form.styled";
import { StyledPasswordForm } from "@/styles/Password.styled";
import { PasswordTitle } from "./ChangePassword.styled";
import Button from "@/components/Button";
import FloatingMessage from "@/components/FloatingMessage";
import PasswordInput from "@/components/PasswordInput";
import { useChangePasswordMutation } from "@/features/auth/authApiSlice";
import {
	selectAuthLoading,
	selectCurrentUserId,
} from "@/features/auth/authSlice";

const ChangePassword = () => {
	const navigate = useNavigate();
	const userId = useSelector(selectCurrentUserId);
	const isLoading = useSelector(selectAuthLoading);

	const [changePassword, { isError }] = useChangePasswordMutation();

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await changePassword({
			userId,
			currentPassword,
			newPassword,
		});

		if (!error) navigate("/auth/login");
	};

	useEffect(() => {
		if (!isLoading && !userId) {
			navigate("/");
		}
	}, [isLoading, userId, navigate]);

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message="Failed to change password."
				/>
			)}

			<StyledPasswordForm onSubmit={handleSubmit}>
				<PasswordTitle>
					<h2>Change Password</h2>

					<p>
						You will be disconnected and redirected to the login
						page after password change.
					</p>
				</PasswordTitle>

				<InputContainer>
					Current Password
					<PasswordInput
						password={currentPassword}
						setPassword={setCurrentPassword}
					/>
				</InputContainer>

				<InputContainer>
					New Password
					<PasswordInput
						password={newPassword}
						setPassword={setNewPassword}
					/>
				</InputContainer>

				<Button>Change Password</Button>
			</StyledPasswordForm>
		</>
	);
};

export default ChangePassword;
