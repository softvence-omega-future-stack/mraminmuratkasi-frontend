import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";

const AdminRoute = () => {
  const user = useAppSelector(selectUser);

  // Check if the user is logged in and is an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
