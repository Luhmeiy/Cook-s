import styled from "styled-components";
import { X } from "@phosphor-icons/react";

export const StyledNewIngredientForm = styled.form`
	background-color: var(--background);
	border-radius: 0.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	left: 50%;
	padding: 2rem;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);

	& h3 {
		margin-bottom: 0.5rem;
	}

	& div {
		display: flex;
		gap: 0.5rem;
	}
`;

export const CloseButton = styled(X)`
	cursor: pointer;
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
`;
