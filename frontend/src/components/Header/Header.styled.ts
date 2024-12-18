import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexContainer } from "@/GlobalStyles";

export const StyledHeader = styled.header`
	${flexContainer({ $align: "center", $gap: 2.5, $justify: "space-between" })}
	padding-block: 1.25rem;

	& > div {
		${flexContainer({ $align: "center", $flex: 1, $gap: 1.5 })}

		& a {
			font-weight: 600;
		}
	}
`;

export const SearchBarContainer = styled.div`
	${flexContainer({ $flex: 1, $justify: "center" })}
`;

export const SearchBar = styled.form`
	${flexContainer({ $align: "center", $justify: "space-between" })}
	border-color: var(--text);
	border-style: solid;
	border-width: 2px;
	max-width: 37.5rem;
	padding: 0.5rem 0.75rem;
	width: 100%;

	& input[type="text"] {
		background-color: transparent;
		padding: 0;

		&:focus {
			outline: none;
		}
	}

	& svg {
		cursor: pointer;
	}
`;

export const UserArea = styled(Link)`
	${flexContainer({ $align: "center", $gap: 0.25 })}

	& p {
		font-weight: 600;
	}
`;
