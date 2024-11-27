import styled from "styled-components";

export const StyledFooter = styled.div<{ $is404?: string }>`
	align-items: end;
	display: flex;
	flex: ${({ $is404 }) => ($is404 === "true" ? 0 : 1)};
	justify-content: center;
	padding-block: 1.25rem;
`;
