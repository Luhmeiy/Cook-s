import styled from "styled-components";

export const StyledStep = styled.div`
	align-items: center;
	display: flex;
	gap: 0.5rem;
`;

export const Circle = styled.div<{ $isAvailable?: string }>`
	align-items: center;
	background-color: ${({ $isAvailable }) =>
		$isAvailable === "true" ? "var(--green)" : "var(--primary)"};
	border-radius: 50%;
	display: flex;
	height: 2rem;
	justify-content: center;
	width: 2rem;
`;
