import styled from "styled-components";

export const StyledHero = styled.div`
	display: flex;
	flex: 1;
	gap: 2rem;
	height: 100%;
`;

export const CallToAction = styled.div`
	align-items: start;
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 1.5rem;
	justify-content: center;

	& > div {
		& p {
			font-weight: 600;
		}

		& h2 {
			line-height: 3rem;
		}
	}

	& p {
		font-weight: 300;
	}
`;
