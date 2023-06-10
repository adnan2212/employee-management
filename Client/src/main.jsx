import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersistLogin from "./components/PersistLogin";
import { ChakraProvider } from "@chakra-ui/react";
import Unauthorized from "./pages/Unauthorized";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ChakraProvider>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/*" element={<App />} />
              <Route path="login" element={<Login />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </ChakraProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
