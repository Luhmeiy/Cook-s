import { Outlet } from "react-router-dom";
import Header from "./Header";
import GlobalStyles from "../GlobalStyles";

const Layout = () => {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
