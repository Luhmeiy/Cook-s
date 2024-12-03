import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MagnifyingGlass, SignOut, UserCircle } from "@phosphor-icons/react";

import {
	HeaderPopover,
	SearchBar,
	SearchBarContainer,
	StyledHeader,
	UserArea,
} from "./Header.styled";
import UserButton from "../UserButton";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";

const Header = () => {
	const user = useSelector(selectCurrentUser);
	const [logout, { isLoading }] = useSendLogoutMutation();

	const [userEl, setUserEl] = useState<HTMLButtonElement | null>(null);
	const [listEl, setListEl] = useState<HTMLButtonElement | null>(null);

	const openUser = Boolean(userEl);
	const openList = Boolean(listEl);

	const userId = openUser ? "simple-popover" : undefined;
	const listId = openList ? "simple-popover" : undefined;

	const handleLogout = async () => {
		await logout(null);
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<StyledHeader>
			<Link to="/">
				<h1>Cook's</h1>
			</Link>

			<div>
				<SearchBarContainer>
					<SearchBar>
						<input
							type="text"
							placeholder="Find your next favorite recipe!"
						/>
						<MagnifyingGlass size={24} weight="bold" />
					</SearchBar>
				</SearchBarContainer>

				<Link to="/recipes">Community Recipes</Link>

				{user ? (
					<>
						<UserButton
							aria-describedby={listId}
							onClick={(e) => setListEl(e.currentTarget)}
						>
							My Lists
						</UserButton>

						<HeaderPopover
							id={listId}
							open={openList}
							anchorEl={listEl}
							onClose={() => setListEl(null)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
						>
							<Link
								to="/ingredients"
								onClick={() => setListEl(null)}
							>
								Available Ingredients
							</Link>

							<Link
								to="/shopping"
								onClick={() => setListEl(null)}
							>
								Shopping List
							</Link>
						</HeaderPopover>

						<UserButton
							aria-describedby={userId}
							onClick={(e) => setUserEl(e.currentTarget)}
						>
							<UserCircle size={24} weight="bold" />
							{user.username}
						</UserButton>

						<HeaderPopover
							id={userId}
							open={openUser}
							anchorEl={userEl}
							onClose={() => setUserEl(null)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
						>
							<Link
								to={`/user/${user._id}`}
								onClick={() => setUserEl(null)}
							>
								Your profile
							</Link>

							<button onClick={handleLogout}>
								<SignOut size={20} weight="light" /> Logout
							</button>
						</HeaderPopover>
					</>
				) : (
					<UserArea to="/auth/login">
						<UserCircle size={24} weight="bold" />
						<p>Register</p>
					</UserArea>
				)}
			</div>
		</StyledHeader>
	);
};

export default Header;
