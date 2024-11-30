import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import { StyledAuthLayout, StyledHeading } from "./AuthLayout.styled";

const AuthLayout = () => {
	return (
		<>
			<GlobalStyles />
			<StyledHeading to="/">
				<h1>Cook's</h1>
			</StyledHeading>
			<StyledAuthLayout>
				<Outlet />
			</StyledAuthLayout>
		</>
	);
};

export default AuthLayout;
