import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledIngredient = styled.div`
	${flexContainer({ $align: "end", $gap: 0.75 })}

	& div {
		${flexContainer({ $gap: 0.5 })}

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

export const IngredientTitle = styled.p<{ $bought?: boolean }>`
	text-decoration: ${({ $bought }) => $bought && "line-through"};
`;

export const IngredientForm = styled.form`
	${flexContainer({ $align: "end", $gap: 1 })}
`;
