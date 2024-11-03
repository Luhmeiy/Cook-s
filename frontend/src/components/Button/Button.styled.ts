import styled from "styled-components";

export const StyledButton = styled.button<{ variant?: string }>`
	align-items: center;
	background-color: ${({ variant }) => {
		if (variant === "alternate") return "transparent";
		else if (variant === "gray") return "#C3C3C3";
		else return "var(--primary)";
	}};
	border: ${({ variant }) =>
		variant === "alternate" ? "2px solid var(--primary)" : "none"};
	border-radius: 0.25rem;
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	gap: 0.5rem;
	justify-content: center;
	padding: 0.75rem;
	transition: 0.5s;

	&:hover {
		background: ${({ variant }) =>
			variant === "alternate" && "var(--primary)"};
		filter: ${({ variant }) =>
			!(variant === "alternate") && "brightness(85%)"};
	}

	&:active {
		filter: brightness(115%);
	}
`;
