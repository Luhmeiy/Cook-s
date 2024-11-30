import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledRecipeItem = styled.div`
	${flexContainer({ $gap: 1.25 })}
	background-color: var(--second-background);
	border-radius: 0.25rem;
	padding: 1rem;
`;

export const RecipeInfo = styled.div`
	${flexContainer({ $align: "start", $column: true, $flex: 1, $gap: 0.75 })}
	font-size: 0.75rem;

	& span {
		font-weight: 600;
	}
`;
