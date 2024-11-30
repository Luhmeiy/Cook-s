import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledUserButton = styled.button`
	${flexContainer({ $align: "center", $gap: 0.25 })}
	color: inherit;
	font-weight: 600;

	&:hover {
		color: var(--primary);
	}
`;
