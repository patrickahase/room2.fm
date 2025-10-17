import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SyncDesktopApp from "./sync/src/DesktopApp";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SyncDesktopApp />} />
    </Routes>
  </BrowserRouter>
);
