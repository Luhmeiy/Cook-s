import { flexContainer } from "@/GlobalStyles";
import styled from "styled-components";

export const StyledEditUserForm = styled.form`
	${flexContainer({ $column: true, $gap: 1 })}
	max-width: 25rem;

	& > div {
		${flexContainer({ $gap: 0.5 })}
	}
`;
