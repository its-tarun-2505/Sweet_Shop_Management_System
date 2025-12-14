import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ allowedRoles }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to="/" replace />;
  return <Outlet/>
};

export default PublicRoute;
