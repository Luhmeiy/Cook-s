import styled from "styled-components";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";

export const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	gap: 2.5rem;
	padding-block: 1.25rem;

	& > a:first-of-type {
		color: var(--primary);
		font-family: Poppins;
		font-weight: 900;
		font-size: 3.75rem;
	}

	& a {
		font-weight: 600;
	}
`;

export const SearchBarContainer = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
`;

export const SearchBar = styled.div`
	align-items: center;
	border-color: var(--text);
	border-style: solid;
	border-width: 2px;
	display: flex;
	justify-content: space-between;
	max-width: 37.5rem;
	padding: 0.5rem 0.75rem;
	width: 100%;

	& input {
		background-color: transparent;
		border: none;
		outline: none;
		width: 100%;

		&::placeholder {
			color: var(--muted-text);
			font-size: 0.875rem;
		}
	}
`;

export const UserArea = styled(Link)`
	align-items: center;
	display: flex;
	gap: 4px;

	& p {
		font-weight: 600;
	}
`;

export const UserButton = styled.button`
	align-items: center;
	background-color: transparent;
	border: none;
	color: inherit;
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	font-weight: 600;
	gap: 0.25rem;
	transition: 0.5s;

	&:hover {
		color: var(--primary);
	}
`;

export const UserPopover = styled(Popover)`
	& div {
		border-radius: 0;
		margin-top: 0.25rem;
		padding: 1rem 0.5rem;

		& button {
			align-items: center;
			background-color: transparent;
			border: none;
			color: inherit;
			cursor: pointer;
			display: flex;
			font-size: 1rem;
			gap: 0.5rem;
		}
	}
`;
