import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #F9F6F2;
        --primary: #F5A623;
        --text: #333333;
        --second-background: #FFF7D1;
    }

    * {
        font-family: Montserrat;
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

        h2 {
            font-family: Poppins;
            font-size: 2.5rem;
            font-weight: 700;
        }
    }
`;

export default GlobalStyles;
