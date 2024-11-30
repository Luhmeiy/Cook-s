import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexContainer } from "@/GlobalStyles";

export const GoBackLink = styled(Link)`
	${flexContainer({ $align: "center", $gap: 0.5 })}
	margin-bottom: 1rem;
	margin-top: 1.25rem;
`;

export const InputContainer = styled.label`
	${flexContainer({ $column: true, $flex: 1, $gap: 0.25 })}
	font-weight: 600;

	& div {
		font-weight: inherit;
	}

	& textarea {
		height: 6rem;
		resize: none;
	}
`;
