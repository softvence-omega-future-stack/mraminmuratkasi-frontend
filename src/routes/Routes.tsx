import ChangePasswordPage from "@/common/ChangePasswordPage";
import EditProfilePage from "@/common/EditProfilePage";
import AdminDashboardLayout from "@/Layout/AdminDashboardLayout";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import AdminSignIn from "@/pages/auth/admin/AdminSignIn";
import ClientSignIn from "@/pages/auth/client/ClientSignIn";
import ClientSignUp from "@/pages/auth/client/ClientSignUp";
import ForgotPasswordEmail from "@/pages/auth/forgot-password/ForgotPasswordEmail";
import ForgotPasswordOTP from "@/pages/auth/forgot-password/ForgotPasswordOTP";
import ResetPassword from "@/pages/auth/forgot-password/ResetPassword";
import ClientCaseDetails from "@/pages/clientDashboard/CaseDetails";
import ClientCasesPage from "@/pages/clientDashboard/ClientCasesPage";
import ClientChatPage from "@/pages/clientDashboard/ClientChatPage";
import ClientDashboard from "@/pages/Dashboard/ClientDashboard";

import AdminCaseDetails from "@/components/admin/case/AdminCaseDetails";
import AdminCasesPage from "@/components/admin/case/AdminCasesPage";
import AdminChatPage from "@/components/admin/chat/AdminChatPage";
import AllClients from "@/components/admin/client/AllClients";
import ChangePasswordPageForAdmin from "@/components/admin/profile/ChangePasswordPageForAdmin";
import EditProfilePageForAdmin from "@/components/admin/profile/EditProfilePageForAdmin";
import HomePage from "@/pages/adminDashboard/CommonHeader";
import Login from "@/pages/Login";
import RoleSelection from "@/pages/RoleSelection";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";

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
        element: <AdminDashboardLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },

          {
            path: "cases",
            element: <AdminCasesPage />,
          },
          {
            path: "cases/:id",
            element: <AdminCaseDetails />,
          },
          {
            path: "client",
            element: <AllClients />,
          },

          {
            path: "chat",
            element: <AdminChatPage />,
          },
          {
            path: "edit-profile",
            element: <EditProfilePageForAdmin />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPageForAdmin />,
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
