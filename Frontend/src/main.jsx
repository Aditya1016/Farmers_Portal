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
import store from "./store/store.js";
import Protected from "./components/AuthLayout.jsx";

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
        element: (
          <Protected authentication={false}>
            <Signin />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Protected authentication>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: '/soil-classification',
        element: (
          <Protected authentication>
            <SoilClassificatio />
          </Protected>
        ),
      },
      {
        path: '/e-mandi',
        element: (
          <Protected authentication>
            <Emandi />
          </Protected>
        ),
      },
      {
        path: '/plant-disease-detection',
        element: (
          <Protected authentication>
            <PlantDiseaseDetection />
          </Protected>
        ),
      },
      {
        path: '/biowaste-management',
        element: (
          <Protected authentication>
            <BioWasteManagement />
          </Protected>
        )
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
