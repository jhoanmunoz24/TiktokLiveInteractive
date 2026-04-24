import './assets/main.css'

import { createRoot } from 'react-dom/client'
import Home from './pages/Home'

import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}>
    <Home />
  </RouterProvider>
 
)
