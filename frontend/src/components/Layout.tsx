import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "./Header";

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
