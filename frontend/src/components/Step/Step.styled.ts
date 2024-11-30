import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledStep = styled.div`
	${flexContainer({ $align: "center", $gap: 0.5 })}
`;

export const Circle = styled.div<{ $isAvailable?: boolean }>`
	${flexContainer({ $align: "center", $justify: "center" })}
	background-color: ${({ $isAvailable }) =>
		$isAvailable ? "var(--green)" : "var(--primary)"};
	border-radius: 50%;
	height: 2rem;
	width: 2rem;
`;
