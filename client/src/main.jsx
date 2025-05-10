import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./stylesheets/all.scss";
import "./App.css";
import App from "./App.jsx";
import { MessageProvider } from "./contexts/MessageContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MessageProvider>
    </BrowserRouter>
  </StrictMode>
);
