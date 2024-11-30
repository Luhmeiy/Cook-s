import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledHero = styled.div`
	${flexContainer({ $flex: 1, $gap: 2 })}
	height: 100%;
`;

export const CallToAction = styled.div`
	${flexContainer({
		$align: "start",
		$column: true,
		$flex: 1,
		$gap: 1.5,
		$justify: "center",
	})}

	& > div {
		& p {
			font-weight: 600;
		}

		& h2 {
			line-height: 3rem;
		}
	}
`;
