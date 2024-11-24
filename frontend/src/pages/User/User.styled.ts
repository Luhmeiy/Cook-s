import styled from "styled-components";

export const StyledUser = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1.25rem;

	& > div {
		display: flex;
		flex-direction: column;

		&:nth-of-type(2) {
			gap: 0.5rem;
		}

		& p {
			font-size: 0.75rem;
		}
	}
`;
