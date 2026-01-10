import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ClientDashboard from "@/pages/Dashboard/ClientDashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: "client",
        element: <ClientDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
