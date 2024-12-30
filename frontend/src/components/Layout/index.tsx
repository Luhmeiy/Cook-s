import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "../Header";
import Footer from "../Footer";
import { selectCurrentUserId } from "@/features/auth/authSlice";

const Layout = () => {
	const userId = useSelector(selectCurrentUserId);
	const isHome = location.pathname === "/";

	const showFooter = !isHome || (userId && isHome);

	return (
		<>
			<GlobalStyles />
			<Header />
			<Outlet />
			{showFooter && <Footer />}
		</>
	);
};

export default Layout;
