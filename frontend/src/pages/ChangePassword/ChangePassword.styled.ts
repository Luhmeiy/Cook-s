import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const PasswordTitle = styled.div`
	${flexContainer({
		$align: "center",
		$column: true,
	})}
	margin-bottom: 1rem;

	& p {
		max-width: 20rem;
	}
`;
