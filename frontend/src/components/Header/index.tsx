import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MagnifyingGlass, SignOut, UserCircle } from "@phosphor-icons/react";

import {
	SearchBar,
	SearchBarContainer,
	StyledHeader,
	UserArea,
	UserPopover,
} from "./Header.styled";
import UserButton from "../UserButton";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";

const Header = () => {
	const user = useSelector(selectCurrentUser);
	const [logout, { isLoading }] = useSendLogoutMutation();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

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
						<Link to="/">My Recipes</Link>

						<UserButton
							aria-describedby={id}
							onClick={(e) => setAnchorEl(e.currentTarget)}
						>
							<UserCircle size={24} weight="bold" />
							{user.username}
						</UserButton>

						<UserPopover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={() => setAnchorEl(null)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
						>
							<Link to={`/user/${user._id}`}>Your profile</Link>

							<button onClick={handleLogout}>
								<SignOut size={20} weight="light" /> Logout
							</button>
						</UserPopover>
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
