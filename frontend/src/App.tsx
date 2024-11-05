import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import {
	selectAuthLoading,
	selectCurrentUser,
} from "./features/auth/authSlice";

// Layouts
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

// Pages
import UserRecipes from "./pages/UserRecipes";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import NewRecipe from "./pages/NewRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	const user = useSelector(selectCurrentUser);
	const isLoading = useSelector(selectAuthLoading);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={user ? <UserRecipes /> : <Home />} />
				<Route path="recipes" element={<Recipes />} />
				<Route path="new-recipe" element={<NewRecipe />} />
			</Route>

			<Route
				path="auth"
				element={
					!isLoading && !user ? (
						<AuthLayout />
					) : (
						<Navigate to="/" replace />
					)
				}
			>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;
