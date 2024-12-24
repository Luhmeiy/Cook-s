import styled from "styled-components";
import { flexContainer, media } from "@/GlobalStyles";

export const StyledSettings = styled.div`
	${flexContainer({ $column: true, $flex: 2, $gap: 1 })}
	height: 100%;
	margin-top: 1.25rem;

	& > div {
		${flexContainer({ $flex: 2 })}
		background-color: var(--second-background);
		border-radius: 0.25rem;
		padding: 1.25rem;
	}
`;

export const UserPanel = styled.div`
	${flexContainer({ $align: "start", $column: true, $gap: 0.5 })}
	width: 12.5rem;

	${media.sm`
		width: 10.5rem
	`}
`;

export const UserPanelButton = styled.button<{ $isActive: boolean }>`
	background-color: var(--background);
	border-radius: 0.25rem;
	padding-block: 0.75rem;
	padding-inline: 0.5rem;
	text-align: left;
	transition: 0.5s;

	${({ $isActive }) =>
		$isActive &&
		"border-bottom-right-radius: 0; border-top-right-radius: 0; font-weight: 600; width: 100%;"}
`;

export const UserPanelContent = styled.div`
	${flexContainer({ $align: "start", $flex: 1 })}
	background-color: var(--background);
	border-radius: 0.25rem;
	border-top-left-radius: 0;
	padding-block: 0.75rem;
	padding-inline: 1rem;

	& > div {
		${flexContainer({ $column: true, $gap: 1 })}
	}
`;
