import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ClientDashboard from "@/pages/Dashboard/ClientDashboard";
import RoleSelection from "@/pages/RoleSelection";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import AdminDashboardLayout from "@/Layout/AdminDashboardLayout";
import ClientSignIn from "@/pages/auth/client/ClientSignIn";
import ClientSignUp from "@/pages/auth/client/ClientSignUp";
import ForgotPasswordEmail from "@/pages/auth/forgot-password/ForgotPasswordEmail";
import ForgotPasswordOTP from "@/pages/auth/forgot-password/ForgotPasswordOTP";
import ResetPassword from "@/pages/auth/forgot-password/ResetPassword";
import AdminSignIn from "@/pages/auth/admin/AdminSignIn";
import ClientChatPage from "@/pages/clientDashboard/ClientChatPage";
import ClientCasesPage from "@/pages/clientDashboard/ClientCasesPage";
import ClientCaseDetails from "@/pages/clientDashboard/CaseDetails";
import ChangePasswordPage from "@/common/ChangePasswordPage";
import EditProfilePage from "@/common/EditProfilePage";

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
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/admin",
        // element: <AdminRoute />,
        children: [
          {
            path: "",
            element: (
              <AdminDashboardLayout>
                <AdminDashboard />
              </AdminDashboardLayout>
            ),
          },
        ],
      },
      {
        path: "client",
        children: [
          {
            path: "",
            element: (
              <ClientDashboardLayout>
                <ClientDashboard />
              </ClientDashboardLayout>
            ),
          },
          {
            path: "chat",
            element: (
              // <ClientDashboardLayout>
              <ClientChatPage />
              // </ClientDashboardLayout>
            ),
          },
          {
            path: "cases",
            element: (
              // <ClientDashboardLayout>
              <ClientCasesPage />
              // </ClientDashboardLayout>
            ),
          },
          {
            path: "case/:id",
            element: <ClientCaseDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
