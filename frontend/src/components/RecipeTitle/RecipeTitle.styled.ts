import styled from "styled-components";

export const StyledRecipeTitle = styled.div<{ $alternate?: string }>`
	align-items: center;
	display: flex;
	gap: ${({ $alternate }) => ($alternate ? "2rem" : "1rem")};
	justify-content: ${({ $alternate }) => !$alternate && "space-between"};
	width: 100%;

	& a {
		font-size: 1rem;
		font-weight: 700;
	}

	& svg {
		cursor: pointer;
	}
`;
