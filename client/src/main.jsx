import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./HomePage";
import AsyncApp from "./async/AsyncApp";

const root = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="async" element={<AsyncApp />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);