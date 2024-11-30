import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledNotFound = styled.div`
	${flexContainer({
		$align: "center",
		$column: true,
		$flex: 1,
		$justify: "center",
	})}
	padding-bottom: 10%;
	text-align: center;
`;
