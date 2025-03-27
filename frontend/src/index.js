// React & Third-Party Libraries Imports
import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Project Utilities & API Helpers Imports
import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider } from "@context/ThemeContext";

// Components Imports
import App from "@src/App";

// Component Styles Imports
import "@styles/font.scss";
import "@src/index.scss";
import "@styles/form.scss";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter basename={"fullstack-todo-app"}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
