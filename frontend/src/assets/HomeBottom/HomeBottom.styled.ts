import styled from "styled-components";
import { media } from "@/GlobalStyles";

export const StyledHomeBottom = styled.div`
	display: flex;
	margin-inline: -7.5rem;
	height: 8.25rem;

	${media.xl`
		margin-inline: -0.75rem;
    `}

	& svg {
		width: 100%;
	}
`;
