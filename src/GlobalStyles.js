import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --maxWidth: 500px;
        --fontSizeBig: 1.6rem;
        --fontSizeMed: 1.4rem;
        --fontSizeSm: 1.2rem;
    }
    * {
        margin: 0;
    }

    .input{
        width: 100%;
        height: 50px;
        max-width: var(--maxWidth);
        margin: 10px auto;
        input {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
`