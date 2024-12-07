import styled, { keyframes } from "styled-components";

export const StyledFloatingMessage = styled.div<{ $type: "success" | "error" }>`
	background-color: var(--second-background);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.25rem -0.75rem rgba(0, 0, 0, 0.35);
	font-weight: 600;
	left: 50%;
	max-width: 25rem;
	padding-block: 1.25rem;
	padding-inline: 1.25rem;
	position: absolute;
	text-align: start;
	top: 1.25rem;
	transform: translateX(-50%);
	width: 50%;
	z-index: 5000;

	${({ $type }) => {
		switch ($type) {
			case "success":
				return "border: 2px solid var(--green); color: var(--green);";
			case "error":
				return "border: 2px solid var(--red); color: var(--red)";
		}
	}};
`;

const progressAnimation = keyframes`
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
`;

export const StyledProgressBar = styled.div<{
	$type: "success" | "error";
	$duration: number;
}>`
	animation: ${({ $duration }) => `${$duration}ms linear forwards`};
	animation-name: ${progressAnimation};
	background-color: ${({ $type }) => {
		switch ($type) {
			case "success":
				return "var(--green)";
			case "error":
				return "var(--red)";
		}
	}};
	bottom: 0;
	height: 0.25rem;
	left: 0;
	position: absolute;
`;
