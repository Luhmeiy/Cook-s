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
import { InputContainer, PublicContainer } from "@/styles/Form.styled";

// components / Redux
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import { useRegisterMutation } from "@/features/auth/authApiSlice";

const Register = () => {
	const navigate = useNavigate();

	const [isGoogle, setIsGoogle] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [step, setStep] = useState(0);

	const [register, { isLoading }] = useRegisterMutation();

	const handleNextStep = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setStep(1);
	};

	const handleGoogleSignUp = useGoogleLogin({
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

				setIsGoogle(true);

				setUsername(userInfo.name);
				setEmail(userInfo.email);

				setStep(1);
			} catch (error) {
				console.error(error);
			}
		},
		onError: () => {
			console.error("Login Failed");
		},
	});

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = await register({
				username,
				email,
				password,
				description,
				isPublic,
			});

			if (!error) {
				setIsGoogle(false);
				setUsername("");
				setEmail("");
				setPassword("");
				setDescription("");
				setIsPublic(false);

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

				{step === 0 ? (
					<>
						<Button
							$variant="alternate"
							onClick={() => handleGoogleSignUp()}
						>
							<GoogleLogo size={20} /> Sign up with Google
						</Button>

						<OrDivider>
							<hr />
							or
							<hr />
						</OrDivider>

						<StyledForm onSubmit={handleNextStep}>
							<InputContainer>
								Name
								<input
									type="text"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									placeholder="Name"
									required
								/>
							</InputContainer>

							<InputContainer>
								Email
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email"
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

							<Button>Continue</Button>
						</StyledForm>
					</>
				) : (
					<>
						<OrDivider>
							<hr />
						</OrDivider>

						<StyledForm onSubmit={handleRegister}>
							{isGoogle && (
								<InputContainer>
									Password
									<PasswordInput
										password={password}
										setPassword={setPassword}
									/>
								</InputContainer>
							)}

							<InputContainer>
								Description (Optional)
								<input
									type="text"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									placeholder="Description"
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

							<Button>Sign up</Button>
						</StyledForm>
					</>
				)}

				<p>
					Already have an account?{" "}
					<StyledLink to="/auth/login" $underline>
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
