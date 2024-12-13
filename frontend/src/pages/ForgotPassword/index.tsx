import { FormEvent, useState } from "react";
import { InputContainer } from "@/styles/Form.styled";
import { StyledPasswordForm } from "@/styles/Password.styled";
import Button from "@/components/Button";
import FloatingMessage from "@/components/FloatingMessage";
import { ErrorType } from "@/interfaces/ErrorType";
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";

const ForgotPassword = () => {
	const [forgotPassword, { data, error, isError, isLoading, isSuccess }] =
		useForgotPasswordMutation();

	const [email, setEmail] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await forgotPassword({ email });
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message={(error as ErrorType).data.message}
				/>
			)}
			{isSuccess && (
				<FloatingMessage type="success" message={data.message} />
			)}

			<StyledPasswordForm onSubmit={handleSubmit}>
				<h2>Forgot Your Password?</h2>

				<InputContainer>
					Type your email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</InputContainer>

				<Button disabled={isLoading}>Send Email</Button>
			</StyledPasswordForm>
		</>
	);
};

export default ForgotPassword;
