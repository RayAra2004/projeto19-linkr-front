import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Passion One', cursive !important;
        font-style: normal;
        font-weight: 400;
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

    body{
        background-color: #333333;
    }
`

export default GlobalStyle