// packages
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogo } from "@phosphor-icons/react";

// styles
import {
	LayoutInfo,
	OrDivider,
	StyledForm,
	StyledLink,
} from "@/styles/Auth.styled";

// components / Redux
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import { useRegisterMutation } from "@/features/auth/authApiSlice";

const Register = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [register, { isLoading }] = useRegisterMutation();

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = await register({ username, email, password });

			if (!error) {
				setUsername("");
				setEmail("");
				setPassword("");

				navigate("/auth/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<LayoutInfo>
				<div>
					<h2>Welcome!</h2>
					<p>
						Create an account and start organizing your recipes,
						ingredients and shopping list.
					</p>
				</div>

				<Button variant="alternate">
					<GoogleLogo size={20} /> Sign up with Google
				</Button>

				<OrDivider>
					<hr />
					or
					<hr />
				</OrDivider>

				<StyledForm onSubmit={handleRegister}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Name"
					/>

					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>

					<PasswordInput
						password={password}
						setPassword={setPassword}
					/>

					<Button>Sign up</Button>
				</StyledForm>

				<p>
					Already have an account?{" "}
					<StyledLink to="/auth/login" underline="true">
						Log in
					</StyledLink>
				</p>
			</LayoutInfo>

			<img
				src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=1040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Cooking"
			/>
		</>
	);
};

export default Register;
