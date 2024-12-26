import styled from "styled-components";
import { X } from "@phosphor-icons/react";
import { flexContainer, media } from "@/GlobalStyles";

export const StyledModalForm = styled.form`
	${flexContainer({ $column: true, $gap: 0.5 })}
	background-color: var(--background);
	border-radius: 0.25rem;
	left: 50%;
	padding: 2rem;
	position: absolute;
	text-align: center;
	top: 50%;
	transform: translate(-50%, -50%);

	${media.md`
		width: 75%;
	`}

	& > h3 {
		margin-bottom: 0.5rem;
	}

	& > div {
		${flexContainer({ $gap: 0.5 })}

		${media.xs`
			flex-direction: column;

			& label {
				align-items: start;
			}
		`}
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
