import styled from "styled-components";
import { X } from "@phosphor-icons/react";
import { flexContainer } from "@/GlobalStyles";

export const StyledModalForm = styled.form<{ $gap?: number }>`
	${flexContainer({ $column: true })}
	background-color: var(--background);
	border-radius: 0.25rem;
	gap: ${({ $gap }) => ($gap ? `${$gap}rem` : "0.5rem")};
	left: 50%;
	padding: 2rem;
	position: absolute;
	text-align: center;
	top: 50%;
	transform: translate(-50%, -50%);

	& > h3 {
		margin-bottom: ${({ $gap }) => !$gap && "0.5rem"};
	}

	& > div {
		${flexContainer({ $gap: 0.5 })}
	}
`;

export const CloseButton = styled(X)`
	cursor: pointer;
	height: 1.25rem;
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	width: 1.25rem;
`;
