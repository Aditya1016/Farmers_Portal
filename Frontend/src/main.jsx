import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SoilClassificatio from "./pages/SoilClassificatio.jsx";
import Emandi from "./pages/Emandi.jsx";
import PlantDiseaseDetection from "./pages/PlantDiseaseDetection.jsx";
import BioWasteManagement from "./pages/BioWasteManagement.jsx";
import { Provider } from "react-redux";
import store from "./lib/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: '/soil-classification',
        element: <SoilClassificatio />
      },
      {
        path: '/e-mandi',
        element: <Emandi />
      },
      {
        path: '/plant-disease-detection',
        element: <PlantDiseaseDetection />
      },
      {
        path: '/biowaste-management',
        element: <BioWasteManagement />
      }
      // {
      //   path: "/livetracking",
      //   element: <LiveTracking />
      // }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
