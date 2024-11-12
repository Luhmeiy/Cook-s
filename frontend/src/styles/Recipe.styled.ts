import styled from "styled-components";

export const RecipeTitle = styled.div<{ alternate?: string }>`
	align-items: center;
	display: flex;
	gap: ${({ alternate }) => (alternate ? "2rem" : "1rem")};
	justify-content: ${({ alternate }) => !alternate && "space-between"};
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
	align-items: center;
	display: flex;
	gap: 0.5rem;
`;
