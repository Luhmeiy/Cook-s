// packages
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogo } from "@phosphor-icons/react";
import { useGoogleLogin } from "@react-oauth/google";

// styles
import {
	LayoutInfo,
	OrDivider,
	StyledForm,
	StyledLink,
} from "@/styles/Auth.styled";
import { InputContainer } from "@/styles/Form.styled";

// components / Redux
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import { useLoginMutation } from "@/features/auth/authApiSlice";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [login, { isLoading }] = useLoginMutation();

	const handleGoogleSignIn = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				const response = await fetch(
					"https://www.googleapis.com/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${tokenResponse.access_token}`,
						},
					}
				);

				const userInfo = await response.json();

				const { error } = await login({
					email: userInfo.email,
					isGoogle: true,
				});

				if (!error) {
					setEmail("");
					setPassword("");

					navigate("/");
				}
			} catch (error) {
				console.error(error);
			}
		},
		onError: () => {
			console.error("Login Failed");
		},
	});

	const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = await login({
				email,
				password,
			});

			if (!error) {
				setEmail("");
				setPassword("");

				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<img
				src="https://images.unsplash.com/photo-1452251889946-8ff5ea7b27ab?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Cooking"
			/>

			<LayoutInfo>
				<div>
					<h2>Welcome back!</h2>
					<p>Your recipes await you.</p>
				</div>

				<Button
					$variant="alternate"
					onClick={() => handleGoogleSignIn()}
				>
					<GoogleLogo size={20} /> Sign in with Google
				</Button>

				<OrDivider>
					<hr />
					or
					<hr />
				</OrDivider>

				<StyledForm onSubmit={handleSignIn}>
					<InputContainer>
						Email
						<input
							type="email"
							placeholder="Email"
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</InputContainer>

					<InputContainer>
						Password
						<PasswordInput
							password={password}
							setPassword={setPassword}
						/>
					</InputContainer>

					<StyledLink to="/auth/forgot-password">
						Forgot Password?
					</StyledLink>

					<Button>Log in</Button>
				</StyledForm>

				<p>
					Don't have an account yet?{" "}
					<StyledLink to="/auth/register" $underline>
						Register
					</StyledLink>
				</p>
			</LayoutInfo>
		</>
	);
};

export default Login;
