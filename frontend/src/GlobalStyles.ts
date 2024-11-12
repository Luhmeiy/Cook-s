import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #F9F6F2;
        --second-background: #EAE0D5;
        --primary: #F5A623;
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

        @media (max-width: 1100px) {
		    margin: 0 .75rem;
	    }

        & a {
            color: inherit;
            text-decoration: none;
            transition: .5s;

            &:hover {
                color: var(--primary);
            }
        }

        & > div {
            display: flex;
            flex-direction: column;
            min-height: 100dvh;
        }

        h2, h3 {
            font-family: Poppins;
            font-weight: 700;
        }

        h2 {
            font-size: 2.5rem;
        }

        h3 {
            font-size: 1.5rem;
        }
    }
`;

export default GlobalStyles;
