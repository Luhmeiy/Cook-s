import styled from "styled-components";
import { flexContainer, media } from "@/GlobalStyles";

export const StyledHomeHeroImage = styled.div`
	${flexContainer({ $align: "center" })}
	width: 50%;

	${media.sm`
		width: 75%
	`}

	& svg {
		height: 100%;
		width: 100%;
	}
`;
