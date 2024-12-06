import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledPasswordForm = styled.form`
	${flexContainer({
		$align: "center",
		$column: true,
		$flex: 1,
		$gap: 0.75,
		$justify: "center",
	})}
	padding-bottom: 10%;
	text-align: center;

	& label {
		max-width: 22.5rem;
		width: 100%;
	}
`;
