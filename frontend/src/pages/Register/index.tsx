import { Eye, GoogleLogo } from "@phosphor-icons/react";
import {
	LayoutInfo,
	OrDivider,
	StyledForm,
	StyledLink,
} from "../../styles/Auth.styled";
import Button from "../../components/Button";

const Register = () => {
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

				<Button alternate="true">
					<GoogleLogo size={20} /> Sign up with Google
				</Button>

				<OrDivider>
					<hr />
					or
					<hr />
				</OrDivider>

				<StyledForm>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />

					<div>
						<input type="password" placeholder="Password" />
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
