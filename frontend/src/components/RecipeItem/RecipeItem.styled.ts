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

export const RecipeTitle = styled.div`
	align-items: center;
	display: flex;
	gap: 1rem;
	justify-content: space-between;
	width: 100%;

	& a {
		font-size: 1rem;
		font-weight: 700;
	}
`;

export const RecipeCategory = styled.div<{ category?: boolean }>`
	background-color: ${({ category }) =>
		category ? "var(--primary)" : "#D3D3D3"};
	border-radius: 2px;
	display: flex;
	font-weight: 700;
	padding: 0.25rem;
`;

export const RecipeTime = styled.div`
	display: flex;
	gap: 0.5rem;
`;
