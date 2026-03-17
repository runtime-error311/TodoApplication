import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/userContextProvider";
import { BrowserRouter } from "react-router-dom";
import ErrorWrapper from "./components/ErrorWrapper";


const rootElement = document.getElementById("root");
if(!rootElement) throw new Error("Dom element with id root is not present!");
createRoot(rootElement).render(
  <StrictMode>
    <ErrorWrapper >
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
    </ErrorWrapper>


  </StrictMode>,
);
