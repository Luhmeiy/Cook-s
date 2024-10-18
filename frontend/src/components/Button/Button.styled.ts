import styled from "styled-components";

export const StyledButton = styled.button<{ alternate?: boolean }>`
	align-items: center;
	background-color: ${({ alternate }) =>
		alternate ? "transparent" : "var(--primary)"};
	border: ${({ alternate }) =>
		alternate ? "2px solid var(--primary)" : "none"};
	border-radius: 0.25rem;
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	gap: 0.5rem;
	justify-content: center;
	padding: 0.75rem;
	transition: 0.5s;

	&:hover {
		background: ${({ alternate }) => alternate && "var(--primary)"};
		filter: ${({ alternate }) => !alternate && "brightness(85%)"};
	}

	&:active {
		filter: brightness(115%);
	}
`;
