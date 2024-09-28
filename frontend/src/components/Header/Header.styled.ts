import { Link } from "react-router-dom";
import styled from "styled-components";

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
