import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DoorApp from './DoorApp';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import ErrorPage from "./components/errorPage";

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/desktop",
    element: <DesktopApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/desktop/:shaderID",
    element: <DesktopApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mobile",
    element: <DoorApp />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);