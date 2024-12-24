import { createGlobalStyle, css } from "styled-components";

interface FlexContainerProps {
	$align?: "center" | "start" | "end";
	$column?: boolean;
	$flex?: number;
	$gap?: number;
	$justify?: "space-between" | "center";
}

type MediaFunction = {
	[Key in Breakpoints]: (
		styles: TemplateStringsArray
	) => ReturnType<typeof css>;
};

const breakpoints = {
	xs: "480px",
	sm: "576px",
	md: "768px",
	xl: "1200px",
};

type Breakpoints = keyof typeof breakpoints;

export const media: MediaFunction = Object.keys(breakpoints).reduce(
	(acc, label) => {
		const key = label as Breakpoints;
		acc[key] = (styles) => css`
			@media (max-width: ${breakpoints[key]}) {
				${styles}
			}
		`;
		return acc;
	},
	{} as MediaFunction
);

export const flexContainer = ({
	$align,
	$column,
	$gap,
	$flex,
	$justify,
}: FlexContainerProps) => css`
	align-items: ${$align};
	display: flex;
	flex: ${$flex};
	flex-direction: ${$column && "column"};
	gap: ${$gap}rem;
	justify-content: ${$justify};
`;

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #F9F6F2;
        --second-background: #EAE0D5;
        --primary: #F5A623;
        --green: #8bc34a;
        --red: #ff5733;
        --text: #333333;
        --muted-text: #6C6C6C;
    }

    * {
        box-sizing: border-box;
        font-family: Montserrat;
        font-weight: 300;
        margin: 0;
    }

    body {
        background-color: var(--background);
        color: var(--text);
        min-height: 100dvh;
        margin: 0 7.5rem;

        ${media.xl`
            margin: 0 .75rem;
        `}

        & a {
            color: inherit;
            text-decoration: none;
            transition: .5s;

            &:hover {
                color: var(--primary);
            }
        }

        & b {
		    font-weight: 600;
        }

        & > div {
            ${flexContainer({ $column: true })}
            min-height: 100dvh;
        }

        & h1 {
            color: var(--primary);
            font-family: Poppins;
            font-weight: 900;
            font-size: 3.75rem;
        }

        & h2, & h3 {
            font-family: Poppins;
            font-weight: 700;
        }

        & h2 {
            font-size: 2.5rem;
        }

        & h3 {
            font-size: 1.5rem;
        }

        & input:not([type="radio"], [type="checkbox"]),
        & textarea {
            background-color: var(--second-background);
            border: none;
            border-radius: 4px;
            padding: 0.75rem;
            width: 100%;

            &::placeholder {
                color: var(--muted-text);
                font-size: 0.75rem;
            }

            &:focus {
                outline: 2px solid var(--primary);
            }
        }

        & button {
			background-color: transparent;
	        border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: 0.5s;
        }
    }
`;

export default GlobalStyles;
