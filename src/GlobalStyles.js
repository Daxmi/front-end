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
`