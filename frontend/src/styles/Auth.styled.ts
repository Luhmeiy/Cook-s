import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexContainer } from "@/GlobalStyles";

export const LayoutInfo = styled.div`
	${flexContainer({ $align: "center", $column: true, $gap: 2 })}
	flex-grow: 1;
	text-align: center;
	max-width: 25rem;

	& button {
		width: 100%;
	}
`;

export const OrDivider = styled.div`
	${flexContainer({ $align: "center", $gap: 0.75 })}
	color: var(--muted-text);
	font-weight: 600;

	& hr {
		border: 1px solid var(--muted-text);
		width: 2rem;
	}
`;

export const StyledForm = styled.form`
	${flexContainer({ $column: true, $gap: 0.75 })}
	text-align: start;
	width: 100%;

	& button {
		margin-top: 1.875rem;
	}
`;

export const StyledLink = styled(Link)<{
	$underline?: boolean;
	$startText?: boolean;
}>`
	color: var(--primary);
	font-weight: 600;
	text-align: ${({ $startText }) => ($startText ? "start" : "end")};
	text-decoration: ${({ $underline }) => $underline && "underline"};

	&:hover {
		filter: brightness(85%);
	}

	&:active {
		filter: brightness(115%);
	}
`;
