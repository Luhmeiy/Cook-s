import { Link } from "react-router-dom";
import { MagnifyingGlass, UserCircle } from "@phosphor-icons/react";
import {
	SearchBar,
	SearchBarContainer,
	StyledHeader,
	UserArea,
} from "./Header.styled";

const Header = () => {
	return (
		<StyledHeader>
			<Link to="/">Cook's</Link>

			<SearchBarContainer>
				<SearchBar>
					<input placeholder="Find your next favorite recipe!" />
					<MagnifyingGlass size={24} weight="bold" />
				</SearchBar>
			</SearchBarContainer>

			<Link to="/">Community Recipes</Link>

			<UserArea to="/auth/login">
				<UserCircle size={24} weight="bold" />
				<p>Register</p>
			</UserArea>
		</StyledHeader>
	);
};

export default Header;
