import styled from "styled-components";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import { flexContainer, media } from "@/GlobalStyles";

export const StyledHeader = styled.header`
	${flexContainer({ $align: "center", $gap: 2.5, $justify: "space-between" })}
	padding-block: 1.25rem;

	${media.lg`
		gap: 2rem;

		& h1 {
			font-size: 3rem
		}
	`}

	${media.sm`
		gap: 1.25rem;

		& h1 {
			font-size: 2.5rem
		}
	`}

	${media.xs`
		display: grid;
		gap: 0.25rem;
		grid-template-columns: auto auto;
	`}
`;

export const NavigationButtonContainer = styled.div`
	display: none;

	${media.md`
		display: flex;
		justify-content: end;
	`}
`;

export const NavigationPopover = styled(Popover)`
	display: none;
	width: 75%;

	${media.md`
		display: flex;
	`}

	& > div {
		${flexContainer({ $column: true, $gap: 1 })}
		border-radius: 0;
		margin-top: 0.25rem;
		padding: 1rem;
		width: max-content;

		& > div {
			${flexContainer({ $column: true, $gap: 0.25 })}

			& div {
				${flexContainer({ $align: "center", $gap: 0.25 })}

				& p {
					font-weight: 600;
				}
			}
		}

		& button {
			${flexContainer({ $align: "center", $gap: 0.5 })}
			padding: 0;

			&:hover {
				color: var(--primary);
			}
		}
	}
`;

export const Navigation = styled.div`
	${flexContainer({ $align: "center", $gap: 1 })}

	${media.lg`
		gap: 0.5rem
	`}

	${media.md`
		display: none;
	`}

	& a {
		font-weight: 600;
	}

	& a,
	& button {
		width: max-content;
	}
`;

export const SearchBarContainer = styled.div`
	${flexContainer({ $flex: 1, $justify: "center" })}

	${media.xs`
		grid-column: 1 / -1;
		order: 3;
	`}
`;

export const SearchBar = styled.form`
	${flexContainer({ $align: "center", $justify: "space-between" })}
	border-color: var(--text);
	border-style: solid;
	border-width: 2px;
	max-width: 37.5rem;
	padding: 0.5rem 0.75rem;
	width: 100%;

	& input[type="text"] {
		background-color: transparent;
		padding: 0;

		&:focus {
			outline: none;
		}
	}

	& svg {
		cursor: pointer;
	}
`;

export const UserArea = styled(Link)`
	${flexContainer({ $align: "center", $gap: 0.25 })}

	& p {
		font-weight: 600;
	}
`;
