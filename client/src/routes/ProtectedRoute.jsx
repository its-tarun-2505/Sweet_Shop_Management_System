import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/sweets" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
