import styled from "styled-components";

export const StyledRecipeItem = styled.div`
	background-color: var(--second-background);
	border-radius: 0.25rem;
	display: flex;
	gap: 1.25rem;
	padding: 1rem;
`;

export const RecipeInfo = styled.div`
	align-items: start;
	display: flex;
	flex: 1;
	flex-direction: column;
	font-size: 0.75rem;
	gap: 0.75rem;

	& span {
		font-weight: 600;
	}
`;
