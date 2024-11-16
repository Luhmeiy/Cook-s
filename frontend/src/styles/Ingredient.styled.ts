import styled from "styled-components";

export const IngredientsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	& div,
	& form {
		align-items: end;
		display: flex;
		gap: 1rem;

		& div {
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
						background-color: #ff5733;
					}
				}
			}
		}
	}
`;
