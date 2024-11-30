import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledPasswordInput = styled.div`
	${flexContainer({ $align: "center" })}
	background-color: var(--second-background);
	border-radius: 4px;
	width: 100%;

	& input[type="password"] {
		flex: 1;
	}

	& svg {
		margin-inline: 0.75rem;
	}
`;
