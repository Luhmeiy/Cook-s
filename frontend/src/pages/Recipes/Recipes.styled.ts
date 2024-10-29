import styled from "styled-components";

export const RecipesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1.25rem;

	& > div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(23.25rem, 1fr));
		gap: 1.5rem;
		justify-content: space-between;
	}
`;
