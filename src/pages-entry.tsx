import { createRoot } from "react-dom/client";

import { Keepsake } from "./routes/index";
import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Pages root element is missing.");
}

createRoot(root).render(<Keepsake />);
