import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const StyledFooter = styled.div<{ $is404?: boolean }>`
	${flexContainer({ $align: "end", $justify: "center" })}
	flex: ${({ $is404 }) => ($is404 ? 0 : 1)};
	padding-block: 1.25rem;
`;
