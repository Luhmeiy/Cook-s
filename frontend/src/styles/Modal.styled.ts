import styled from "styled-components";
import { X } from "@phosphor-icons/react";

export const StyledModalForm = styled.form<{ variant?: string }>`
	background-color: var(--background);
	border-radius: 0.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	left: 50%;
	outline: none;
	padding: 2rem;
	position: absolute;
	text-align: center;
	top: 50%;
	transform: translate(-50%, -50%);

	& h3 {
		margin-bottom: 0.5rem;
	}

	& div {
		display: flex;
		gap: 0.5rem;
	}

	& button {
		background-color: ${({ variant }) =>
			variant === "true" && "var(--red)"};
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
