import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
