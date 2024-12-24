import styled from "styled-components";
import { flexContainer, media } from "@/GlobalStyles";

export const PasswordTitle = styled.div`
	${flexContainer({
		$align: "center",
		$column: true,
	})}
	margin-bottom: 1rem;

	${media.xs`
		& h2 {
			line-height: 2.5rem;
		}
	`}

	& p {
		max-width: 20rem;
	}
`;
