import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledButton = styled(Link)`
	background-color: var(--primary);
	border: none;
	border-radius: 0.25rem;
	font-family: Montserrat;
	padding: 0.75rem;

	&:hover {
		color: var(--text);
		filter: brightness(85%);
	}

	&:active {
		filter: brightness(115%);
	}
`;
