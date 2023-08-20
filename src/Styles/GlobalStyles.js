import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%; 
        background-color: rgba(51, 51, 51, 1);

    }
    * {
        font-family: 'Passion One', cursive !important;
        font-style: normal !important;
        font-weight: 400 !important;
        user-select: none !important;
    }
    button {
        outline: none;
        border: none;
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

    *{
		box-sizing: border-box;
	}
`;

export default GlobalStyle;
