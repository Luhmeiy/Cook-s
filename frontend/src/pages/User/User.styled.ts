import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledUser = styled.div`
	${flexContainer({ $column: true, $gap: 1.5 })}
	margin-top: 1.25rem;

	& > div:nth-of-type(2) {
		${flexContainer({ $column: true, $gap: 0.5 })}
	}
`;

export const UserInfo = styled.div`
	${flexContainer({ $justify: "space-between" })}

	& div:nth-of-type(2) {
		${flexContainer({ $column: true, $gap: 0.5 })}
	}
`;
