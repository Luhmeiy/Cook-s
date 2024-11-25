import styled from "styled-components";

export const StyledIngredient = styled.div`
	align-items: end;
	display: flex;
	gap: 0.75rem;

	& div {
		display: flex;

		&:first-of-type {
			gap: 0.5rem;
		}

		&:nth-of-type(2) {
			gap: 0.25rem;

			& svg {
				border-radius: 2px;
				cursor: pointer;
				padding: 2px;

				&:first-of-type {
					background-color: var(--primary);
				}

				&:nth-of-type(2) {
					background-color: var(--red);
				}

				&:nth-of-type(3) {
					background-color: var(--green);
				}
			}
		}
	}
`;

export const IngredientTitle = styled.p<{ bought?: string }>`
	text-decoration: ${({ bought }) => bought === "true" && "line-through"};
`;

export const IngredientForm = styled.form`
	align-items: end;
	display: flex;
	gap: 1rem;
`;
