import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledHomeHeroImage = styled.div`
	${flexContainer({ $align: "center" })}
	width: 50%;

	& svg {
		height: 100%;
		width: 100%;
	}
`;
