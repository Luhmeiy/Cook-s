import styled from "styled-components";

export const RecipeCategory = styled.div<{ category?: string }>`
	background-color: ${({ category }) =>
		category === "true" ? "var(--primary)" : "#D3D3D3"};
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
