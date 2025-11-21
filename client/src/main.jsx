import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CatchHomePage from "./CatchHomePage";
import HomePage from "./HomePage";
import AsyncApp from "./async/AsyncApp";
import SyncDesktopApp from "./sync/src/SyncDesktopApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/async",
    element: <AsyncApp />,
  },
  {
    path: "/sync",
    element: <SyncDesktopApp />,
  },
  {
    path: "*",
    element: <CatchHomePage />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);