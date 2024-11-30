import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledRecipes = styled.div`
	${flexContainer({ $column: true, $gap: 1 })}
	margin-top: 1.25rem;
`;

export const RecipeContainerTitle = styled.div`
	${flexContainer({ $align: "center", $justify: "space-between" })}
`;

export const RecipesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(23.25rem, 1fr));
	gap: 1.5rem;
	justify-content: space-between;
`;
