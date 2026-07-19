import { createGlobalStyle } from "styled-components";

// Definimos los tipos para que TypeScript no se queje
type ThemeType = {
    body: string;
    text: string;
};

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        transition: all 0.25s linear;
    }
    * {
        box-sizing: border-box;
    }
`;