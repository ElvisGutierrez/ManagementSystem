import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoutes;
