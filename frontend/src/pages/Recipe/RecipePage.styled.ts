import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledRecipePage = styled.div`
	display: flex;
	gap: 2rem;
	margin-top: 1.25rem;

	& > div {
		display: flex;
		flex-direction: column;
		flex: 1;

		&:first-of-type {
			gap: 2rem;
		}

		&:nth-of-type(2) {
			align-items: start;
			gap: 1rem;
		}
	}
`;

export const RecipeInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	& > div:nth-of-type(2) {
		align-items: center;
		display: flex;
		gap: 1rem;

		& span {
			font-weight: 700;
		}
	}
`;

export const Description = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const UserLink = styled(Link)`
	align-items: center;
	background-color: transparent;
	border: none;
	color: inherit;
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	font-weight: 600;
	gap: 0.25rem;
	transition: 0.5s;

	&:hover {
		color: var(--primary);
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 0.5rem;

	& button:nth-of-type(2) {
		background-color: #ff5733;
	}
`;
