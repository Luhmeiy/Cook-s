import { FormEvent, useState } from "react";
import { InputContainer } from "@/styles/Form.styled";
import { StyledPasswordForm } from "@/styles/Password.styled";
import Button from "@/components/Button";
import FloatingMessage from "@/components/FloatingMessage";
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";

const ForgotPassword = () => {
	const [forgotPassword, { isError, isSuccess }] =
		useForgotPasswordMutation();

	const [email, setEmail] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await forgotPassword({ email });
	};

	return (
		<>
			{isError && (
				<FloatingMessage type="error" message="Failed to send email." />
			)}
			{isSuccess && (
				<FloatingMessage type="success" message="Email sent." />
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

				<Button>Send Email</Button>
			</StyledPasswordForm>
		</>
	);
};

export default ForgotPassword;
