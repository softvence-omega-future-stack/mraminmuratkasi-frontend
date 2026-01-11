import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
// import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ClientDashboard from "@/pages/Dashboard/ClientDashboard";
import RoleSelection from "@/pages/RoleSelection";
import ClientSignIn from "@/pages/auth/client/ClientSignIn";
import ClientSignUp from "@/pages/auth/client/ClientSignUp";
import ForgotPasswordEmail from "@/pages/auth/forgot-password/ForgotPasswordEmail";
import ForgotPasswordOTP from "@/pages/auth/forgot-password/ForgotPasswordOTP";
import ResetPassword from "@/pages/auth/forgot-password/ResetPassword";
import AdminSignIn from "@/pages/auth/admin/AdminSignIn";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      {
        path: "/",
        element: <RoleSelection />,
      },
      {
        path: "/admin/signin",
        element: <AdminSignIn />,
      },
      {
        path: "/client/signin",
        element: <ClientSignIn />,
      },
      {
        path: "/client/signup",
        element: <ClientSignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordEmail />,
      },
      {
        path: "/forgot-password/verify",
        element: <ForgotPasswordOTP />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
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
