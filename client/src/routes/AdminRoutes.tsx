import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoute;
