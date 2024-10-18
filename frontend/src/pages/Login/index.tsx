import { Eye, GoogleLogo } from "@phosphor-icons/react";
import {
	LayoutInfo,
	OrDivider,
	StyledForm,
	StyledLink,
} from "@/styles/Auth.styled";
import Button from "@/components/Button";

const Login = () => {
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

				<Button alternate="true">
					<GoogleLogo size={20} /> Log in with Google
				</Button>

				<OrDivider>
					<hr />
					or
					<hr />
				</OrDivider>

				<StyledForm>
					<input type="email" placeholder="Email" />

					<div>
						<input type="password" placeholder="Password" />
						<Eye color="#6C6C6C" size={20} weight="light" />
					</div>

					<StyledLink to="/">Forgot Password?</StyledLink>

					<Button>Log in</Button>
				</StyledForm>

				<p>
					Don't have an account yet?{" "}
					<StyledLink to="/auth/register" underline={true}>
						Register
					</StyledLink>
				</p>
			</LayoutInfo>
		</>
	);
};

export default Login;
