import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeading = styled(Link)`
	color: var(--primary);
	font-family: Poppins;
	font-weight: 900;
	font-size: 3.75rem;
	margin-block: 1.25rem;

	@media (max-width: 1100px) {
		margin-block: 0.5rem;
	}
`;

export const StyledAuthLayout = styled.div`
	align-items: center;
	display: flex;
	gap: 4rem;
	height: calc(100vh - 15.125rem);
	margin-bottom: 7rem;

	@media (max-width: 1100px) {
		height: calc(100vh - 7.375rem);
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	& > img {
		border-radius: 0.5rem;
		flex-grow: 2;
		height: 100%;
		object-fit: cover;
		width: auto;

		@media (max-width: 1100px) {
			width: 50%;
		}
	}
`;
