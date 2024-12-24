import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexContainer, media } from "@/GlobalStyles";

export const StyledHeading = styled(Link)`
	margin-block: 1.25rem;

	${media.xl`
		margin-block: 0.5rem;
	`}
`;

export const StyledAuthLayout = styled.div`
	${flexContainer({ $align: "center", $gap: 4 })}
	height: calc(100vh - 15.125rem);
	margin-bottom: 7rem;

	${media.xl`
		height: calc(100vh - 7.375rem);
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	`}

	${media.sm`
		justify-content: center;
	`}

	& > img {
		border-radius: 0.5rem;
		flex-grow: 2;
		height: 100%;
		object-fit: cover;
		width: auto;

		${media.xl`
			width: 50%;
		`}

		${media.sm`
			display: none;
		`}
	}
`;
