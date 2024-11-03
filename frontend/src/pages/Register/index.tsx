// packages
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, GoogleLogo } from "@phosphor-icons/react";

// styles
import {
	LayoutInfo,
	OrDivider,
	StyledForm,
	StyledLink,
} from "@/styles/Auth.styled";

// components / Redux
import Button from "@/components/Button";
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
			const response = await register({ username, email, password });

			if (!response.error) {
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

					<div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>

						<Eye color="#6C6C6C" size={20} weight="light" />
					</div>

					<Button>Sign up</Button>
				</StyledForm>

				<p>
					Already have an account?{" "}
					<StyledLink to="/auth/login" underline={true}>
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
