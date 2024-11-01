import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledRecipes = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1.25rem;
`;

export const RecipesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(23.25rem, 1fr));
	gap: 1.5rem;
	justify-content: space-between;
`;

export const RecipeContainerTitle = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`;

export const NewRecipeButton = styled(Link)`
	background-color: var(--primary);
	border-radius: 0.25rem;
	display: flex;
	font-weight: 700;
	gap: 0.75rem;
	padding: 0.5rem 0.75rem;

	&:hover {
		color: inherit;
	}
`;
