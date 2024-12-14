import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRefreshQuery } from "./features/auth/authApiSlice";

// Layouts
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

// Pages
import UserRecipes from "./pages/UserRecipes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import User from "./pages/User";
import Settings from "./pages/Settings";
import Recipes from "./pages/Recipes";
import List from "./pages/List";
import NewRecipe from "./pages/NewRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipePage from "./pages/Recipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
	const location = useLocation();

	const isChangePasswordRoute = location.pathname === "/auth/change-password";

	const { data: user, isLoading } = useRefreshQuery(null);

	if (isLoading) return <p>Loading...</p>;

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={user ? <UserRecipes /> : <Home />} />
				<Route path="*" element={<NotFound />} />
				<Route path="search/:search" element={<Search />} />
				<Route path="user/:id" element={<User />} />
				<Route path="settings" element={<Settings />} />
				<Route path="recipes" element={<Recipes />} />
				<Route
					path="ingredients"
					element={<List listType="ingredient" />}
				/>
				<Route path="shopping" element={<List listType="shopping" />} />
				<Route path="new-recipe" element={<NewRecipe />} />
				<Route path="edit-recipe/:id" element={<EditRecipe />} />
				<Route path="recipe/:id" element={<RecipePage />} />
			</Route>

			<Route
				path="auth"
				element={
					(!isLoading && !user) || isChangePasswordRoute ? (
						<AuthLayout />
					) : (
						<Navigate to="/" replace />
					)
				}
			>
				<Route index element={<NotFound />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="confirm-email/:token" element={<ConfirmEmail />} />
				<Route path="change-password" element={<ChangePassword />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
				<Route
					path="reset-password/:token"
					element={<ResetPassword />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
