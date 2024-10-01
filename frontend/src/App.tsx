import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
			</Route>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;
