import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    list-style: none;

    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
`;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>,
);
