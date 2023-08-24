import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%; 
        background-color: rgba(51, 51, 51, 1);
        
    }
    * {
        font-family: 'Lato', sans-serif !important;
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
    @media (max-width: 365px) {
        html, body, #root, *{
            font-size: 16px; /* Set font size for mobile */
            width: 375px; /* Set max width for mobile */
            margin: auto; /* Center content horizontally */
            display: flex;
            flex-direction: column;
        }
    }
`;

export default GlobalStyle;
