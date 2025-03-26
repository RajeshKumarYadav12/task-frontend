import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Ensure the styles are being applied

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
