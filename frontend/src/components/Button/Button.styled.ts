import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledButton = styled.button<{
	$variant?: "alternate" | "gray" | "red";
}>`
	${flexContainer({ $align: "center", $gap: 0.5, $justify: "center" })}

	background-color: ${({ $variant }) => {
		if ($variant === "alternate") return "transparent";
		else if ($variant === "gray") return "#C3C3C3";
		else if ($variant === "red") return "var(--red)";
		else return "var(--primary)";
	}};

	border: ${({ $variant }) =>
		$variant === "alternate" && "2px solid var(--primary)"};
	border-radius: 0.25rem;
	padding: 0.75rem;

	&:hover {
		background: ${({ $variant }) =>
			$variant === "alternate" && "var(--primary)"};
		filter: ${({ $variant }) =>
			!($variant === "alternate") && "brightness(85%)"};
	}

	&:active {
		filter: brightness(115%);
	}
`;
