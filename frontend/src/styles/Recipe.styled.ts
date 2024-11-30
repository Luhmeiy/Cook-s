import styled from "styled-components";
import { flexContainer } from "@/GlobalStyles";

export const RecipeCategory = styled.div<{ $category?: boolean }>`
	background-color: ${({ $category }) =>
		$category ? "var(--primary)" : "#D3D3D3"};
	border-radius: 2px;
	font-weight: 600;
	padding: 0.25rem;
`;

export const RecipeTime = styled.div`
	${flexContainer({ $align: "center", $gap: 0.5 })}
`;
