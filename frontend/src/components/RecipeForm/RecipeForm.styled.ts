import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledRecipeForm = styled.form`
	${flexContainer({ $column: true, $gap: 1.5 })}

	& > div {
		${flexContainer({ $column: true, $gap: 1 })}

		&:nth-of-type(2) {
			gap: 0.25rem;
		}
	}

	& h2 {
		margin-bottom: -0.5rem;
	}
`;

export const InformationContainer = styled.div`
	${flexContainer({ $gap: 0.75 })}
`;

export const PublicContainer = styled.div`
	${flexContainer({ $column: true, $gap: 0.25 })}

	& label {
		${flexContainer({ $gap: 0.25 })}
	}
`;

export const IngredientsForm = styled.div`
	${flexContainer({ $align: "start", $column: true, $gap: 1 })}
`;

export const IngredientsContainer = styled.div`
	${flexContainer({ $column: true, $gap: 0.75 })}

	& div {
		${flexContainer({ $gap: 0.75 })}

		& label {
			max-width: 10rem;
		}
	}
`;
