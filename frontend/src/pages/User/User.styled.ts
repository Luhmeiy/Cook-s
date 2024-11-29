import styled from "styled-components";

export const StyledUser = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1.25rem;

	& > div:nth-of-type(2) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	& p {
		font-size: 0.75rem;
	}
`;

export const UserInfo = styled.div`
	display: flex;
	justify-content: space-between;

	& div:nth-of-type(2) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		& button:nth-of-type(2) {
			background-color: var(--red);
		}
	}
`;

export const ConfirmPassword = styled.input`
	background-color: var(--second-background);
	border: none;
	border-radius: 4px;
	padding: 0.75rem;
	width: 100%;

	&::placeholder {
		color: var(--muted-text);
		font-size: 0.75rem;
	}

	&:focus {
		outline: 2px solid var(--primary);
	}
`;
