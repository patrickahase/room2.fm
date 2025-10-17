import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DoorApp from './DoorApp';
import ProjectorApp from './ProjectorApp';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import ErrorPage from "./components/errorPage";

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DoorApp />,
    errorElement: <ErrorPage />,
  },
  /* {
    path: "/desktop",
    element: <DesktopApp />,
    errorElement: <ErrorPage />,
  }, */
  {
    path: "/Projector",
    element: <ProjectorApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mobile",
    element: <MobileApp />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);