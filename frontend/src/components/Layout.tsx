import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import { useRefreshMutation } from "@/features/auth/authApiSlice";
import { selectAuthLoading } from "@/features/auth/authSlice";

const Layout = () => {
	const isLoading = useSelector(selectAuthLoading);

	const [refresh] = useRefreshMutation();

	useEffect(() => {
		const restoreSession = async () => {
			await refresh(null);
		};

		restoreSession();
	}, [refresh]);

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
