import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
`

export default GlobalStyle