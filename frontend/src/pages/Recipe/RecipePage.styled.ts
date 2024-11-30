import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledRecipePage = styled.div`
	${flexContainer({ $gap: 2 })}
	margin-top: 1.25rem;

	& > div {
		${flexContainer({ $column: true, $flex: 1, $gap: 2 })}

		&:nth-of-type(2) {
			align-items: start;
			gap: 1rem;
		}
	}
`;

export const RecipeInfo = styled.div`
	${flexContainer({ $column: true, $gap: 0.5 })}

	& > div:nth-of-type(2) {
		${flexContainer({ $align: "center", $gap: 1 })}

		& span {
			font-weight: 600;
		}
	}
`;

export const Description = styled.div`
	${flexContainer({ $column: true, $gap: 0.25 })}
`;

export const ListContainer = styled.div`
	${flexContainer({ $align: "start", $column: true, $gap: 0.5 })}

	& button {
		margin-top: 0.25rem;
	}
`;

export const ButtonContainer = styled.div`
	${flexContainer({ $gap: 0.5 })}
`;
