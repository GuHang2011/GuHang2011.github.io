import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WorkflowBoard } from "./App";

createRoot(document.getElementById("workflow-app")!).render(
  <StrictMode>
    <WorkflowBoard />
  </StrictMode>,
);
