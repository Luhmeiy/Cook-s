import { Link } from "react-router-dom";
import styled from "styled-components";

export const LayoutInfo = styled.div`
	align-items: center;
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	gap: 2.625rem;
	text-align: center;
	max-width: 25rem;

	& button {
		width: 100%;
	}
`;

export const OrDivider = styled.div`
	align-items: center;
	color: var(--muted-text);
	display: flex;
	font-weight: 600;
	gap: 0.75rem;

	& hr {
		border: 1px solid var(--muted-text);
		width: 2rem;
	}
`;

export const StyledForm = styled.form`
	align-items: end;
	display: flex;
	flex-direction: column;
	justify-content: end;
	gap: 0.75rem;
	width: 100%;

	& div {
		align-items: center;
		background-color: var(--second-background);
		border-radius: 4px;
		display: flex;
		width: 100%;

		& svg {
			margin-inline: 0.75rem;
		}
	}

	& input {
		background-color: var(--second-background);
		border: none;
		border-radius: 4px;
		padding: 0.75rem;
		width: 100%;

		&::placeholder {
			color: var(--muted-text);
			font-size: 0.75rem;
		}

		&:focus {
			outline: 2px solid var(--primary);
		}
	}

	& input[type="password"] {
		flex: 1;
	}

	& button {
		margin-top: 1.875rem;
	}
`;

export const StyledLink = styled(Link)<{ underline?: boolean }>`
	color: var(--primary);
	font-weight: 600;
	text-decoration: ${({ underline }) => underline && "underline"};

	&:hover {
		filter: brightness(85%);
	}

	&:active {
		filter: brightness(115%);
	}
`;
