import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        text-decoration: none;
        border: none;
    }

    body{
        font-family: 'Raleway', sans-serif;
        /*font-family: 'Saira Stencil One', cursive;*/
        background-color: #8C11BE;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;