import styled from "styled-components";
import { Popover } from "@mui/material";
import { flexContainer } from "@/GlobalStyles";

export const StyledPopover = styled(Popover)`
	& div {
		${flexContainer({ $column: true, $gap: 0.5 })}
		border-radius: 0;
		margin-top: 0.25rem;
		padding: 1rem;

		& button {
			${flexContainer({ $align: "center", $gap: 0.5 })}
			padding: 0;

			&:hover {
				color: var(--primary);
			}
		}
	}
`;
