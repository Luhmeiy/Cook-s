import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import { useRefreshQuery } from "@/features/auth/authApiSlice";

const Layout = () => {
	const { isLoading } = useRefreshQuery(null);

	if (isLoading) return <p>Loading...</p>;

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
