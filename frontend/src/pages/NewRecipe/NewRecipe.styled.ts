import { Link } from "react-router-dom";
import styled from "styled-components";

export const GoBackLink = styled(Link)`
	align-items: center;
	display: flex;
	gap: 0.5rem;
	margin-top: 1.25rem;
	margin-bottom: 1rem;
`;

export const NewRecipeForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	& > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&:nth-of-type(2) {
			gap: 0.25rem;
		}
	}

	& h2 {
		margin-bottom: -0.5rem;
	}

	& b {
		font-weight: 600;
	}
`;

export const InputContainer = styled.label`
	display: flex;
	flex: 1;
	flex-direction: column;
	font-weight: 600;
	gap: 0.25rem;

	& div {
		font-weight: inherit;
	}

	& input,
	& textarea {
		background-color: var(--second-background);
		border: none;
		border-radius: 4px;
		padding: 0.75rem;

		&::placeholder {
			color: var(--muted-text);
			font-size: 0.75rem;
		}

		&:focus {
			outline: 2px solid var(--primary);
		}
	}

	& textarea {
		height: 6rem;
		resize: none;
	}
`;

export const InformationContainer = styled.div`
	display: flex;
	gap: 0.75rem;
`;

export const PublicContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	& label {
		display: flex;
		gap: 0.25rem !important;
	}
`;

export const IngredientsForm = styled.div`
	align-items: start;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const IngredientsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	& div {
		display: flex;
		gap: 0.75rem;

		& label {
			max-width: 10rem;
		}
	}
`;
