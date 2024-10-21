import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import GlobalStyles from "@/GlobalStyles";
import Header from "./Header";
import { useRefreshMutation } from "@/features/auth/authApiSlice";
import { setCredentials } from "@/features/auth/authSlice";

const Layout = () => {
	const dispatch = useDispatch();

	const [refresh] = useRefreshMutation();

	useEffect(() => {
		const restoreSession = async () => {
			const { user, accessToken } = await refresh(null).unwrap();

			if (user && accessToken) {
				dispatch(setCredentials({ user, accessToken }));
			} else {
				console.log("User needs to log in.");
			}
		};

		restoreSession();
	}, [dispatch, refresh]);

	return (
		<>
			<GlobalStyles />
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
