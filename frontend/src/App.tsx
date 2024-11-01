import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { selectCurrentUser } from "./features/auth/authSlice";

// Layouts
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

// Pages
import UserRecipes from "./pages/UserRecipes";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	const user = useSelector(selectCurrentUser);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={user ? <UserRecipes /> : <Home />} />
				<Route path="recipes" element={<Recipes />} />
			</Route>

			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;
