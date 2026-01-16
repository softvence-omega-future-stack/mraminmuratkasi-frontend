import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = useAppSelector(selectToken) || localStorage.getItem("token");
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!token) {
    // If not logged in, redirect to respective signin page based on path or just role selection
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/signin" state={{ from: location }} replace />;
    }
    return <Navigate to="/client/signin" state={{ from: location }} replace />;
  }

  if (role && user && user.role !== role) {
    // If user doesn't have the required role, redirect to role selection or a safe page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
