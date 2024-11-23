import { Routes, Route, Navigate } from "react-router-dom";
import { useRefreshQuery } from "./features/auth/authApiSlice";

// Layouts
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

// Pages
import UserRecipes from "./pages/UserRecipes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Recipes from "./pages/Recipes";
import IngredientsList from "./pages/IngredientsList";
import ShoppingList from "./pages/ShoppingList";
import NewRecipe from "./pages/NewRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipePage from "./pages/Recipe";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	const { data: user, isLoading } = useRefreshQuery(null);

	if (isLoading) return <p>Loading...</p>;

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={user ? <UserRecipes /> : <Home />} />
				<Route path="*" element={<NotFound />} />
				<Route path="recipes" element={<Recipes />} />
				<Route path="ingredients" element={<IngredientsList />} />
				<Route path="shopping" element={<ShoppingList />} />
				<Route path="new-recipe" element={<NewRecipe />} />
				<Route path="edit-recipe/:id" element={<EditRecipe />} />
				<Route path="recipe/:id" element={<RecipePage />} />
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
				<Route index element={<NotFound />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;
