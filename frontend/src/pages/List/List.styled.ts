import styled from "styled-components";

export const IngredientsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const NewIngredientButton = styled.button`
	background-color: var(--primary);
	border: none;
	border-radius: 0.25rem;
	color: inherit;
	cursor: pointer;
	display: flex;
	font-size: inherit;
	gap: 0.75rem;
	padding: 0.5rem 0.75rem;
`;
