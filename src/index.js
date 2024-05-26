import React from "react";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDom from "react-dom/client";
import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from "./redux/store";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);
